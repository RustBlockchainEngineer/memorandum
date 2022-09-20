import * as anchor from '@project-serum/anchor'
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { bool, publicKey, struct, u32, u64, u8 } from '@project-serum/borsh'
import { Memorandum, IDL } from './types/memorandum'

export let memorandumProgram: anchor.Program<Memorandum> = null as unknown as anchor.Program<Memorandum>
export let memorandumProvider: anchor.AnchorProvider = null as unknown as anchor.AnchorProvider
export let memorandumProgramId: anchor.web3.PublicKey = null as unknown as anchor.web3.PublicKey

const GLOBAL_STATE_TAG = Buffer.from('GLOBAL_STATE_TAG');
const MEMORANDUM_MANAGER_TAG = Buffer.from('MEMORANDUM_MANAGER_TAG');
const MEMORANDUM_TAG = Buffer.from('MEMORANDUM_TAG');
const TITLE_LENGTH = 50;
const CONTENT_LENGTH = 500;
export const BPF_LOADER_UPGRADEABLE_PROGRAM_ID = new anchor.web3.PublicKey(
  "BPFLoaderUpgradeab1e11111111111111111111111",
);

export const systemProgram = anchor.web3.SystemProgram.programId
export const tokenProgram = TOKEN_PROGRAM_ID
export const rent = anchor.web3.SYSVAR_RENT_PUBKEY
export const clock = anchor.web3.SYSVAR_CLOCK_PUBKEY
export const defaults = {
systemProgram,
tokenProgram,
rent,
clock
}

export const initProgram = (
  wallet: anchor.Wallet,
  connection: anchor.web3.Connection,
  pid: anchor.web3.PublicKey
) => {
    memorandumProgramId = pid
  const provider = new anchor.AnchorProvider(connection, wallet, { skipPreflight: true })
  memorandumProvider = provider;
  memorandumProgram = new anchor.Program(IDL, memorandumProgramId, provider) as anchor.Program<Memorandum>
}
export const createGlobalState = async (
  signer: anchor.web3.PublicKey = memorandumProvider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  const globalState = await pda([GLOBAL_STATE_TAG], memorandumProgramId)
  const programData = await pda([memorandumProgramId.toBytes()], BPF_LOADER_UPGRADEABLE_PROGRAM_ID)
  const superOwner = signer

  const tx = await memorandumProgram.methods.createGlobalState()
    .accounts({
      superOwner,
      payer: superOwner,
      globalState,
      memorandumProgram: memorandumProgramId,
      programData,
      ...defaults
    })
    .signers(signers)
    .rpc()

  // eslint-disable-next-line no-console
  console.log('createGlobalState tx = ', tx)

}

export const createMemorandumManager = async (
  penaltyMint: anchor.web3.PublicKey,
  penaltyAmount: anchor.BN,
  signer: anchor.web3.PublicKey = memorandumProvider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  
  const memorandumManager = await pda([MEMORANDUM_MANAGER_TAG, penaltyMint.toBytes()], BPF_LOADER_UPGRADEABLE_PROGRAM_ID)
  const superOwner = signer

  const tx = await memorandumProgram.methods.createMemorandumManager(
    penaltyAmount
  )
    .accounts({
      superOwner,
      payer: superOwner,
      memorandumManager,
      penaltyMint,
      ...defaults
    })
    .signers(signers)
    .rpc()

  // eslint-disable-next-line no-console
  console.log('createMemorandumManager tx = ', tx)

}
export const createMemorandum = async (
  title: string,
  content: string,
  penaltyMint: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = memorandumProvider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  const globalState = await pda([GLOBAL_STATE_TAG], memorandumProgramId)
  const globalStateData = await memorandumProgram.account.globalState.fetch(globalState);
  const memorandumManager = await pda([MEMORANDUM_MANAGER_TAG, penaltyMint.toBytes()], BPF_LOADER_UPGRADEABLE_PROGRAM_ID)
  const memorandum = await pda([MEMORANDUM_TAG, globalStateData.memorandumCount.toArrayLike(Buffer, 'be', 8)], BPF_LOADER_UPGRADEABLE_PROGRAM_ID)
  const creator = signer

  const tx = await memorandumProgram.methods.createMemorandum(
    {
      title, content
    }
  )
    .accounts({
      creator,
      payer: creator,
      globalState,
      memorandumManager,
      memorandum,
      ...defaults
    })
    .signers(signers)
    .rpc()

  // eslint-disable-next-line no-console
  console.log('createMemorandum tx = ', tx)

}
export const updateMemorandum = async (
  title: string,
  content: string,
  memorandum: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = memorandumProvider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  const globalState = await pda([GLOBAL_STATE_TAG], memorandumProgramId)
  const globalStateData = await memorandumProgram.account.globalState.fetch(globalState);
  const penaltyWallet = globalStateData.penaltyWallet;
  const memorandumData = await memorandumProgram.account.memorandum.fetch(memorandum);
  const memorandumManager = memorandumData.memorandumManager;
  const memorandumManagerData = await memorandumProgram.account.memorandumManager.fetch(memorandumManager);
  const penaltyMint = memorandumManagerData.penaltyMint;
  const creator = signer

  const preInstructions: anchor.web3.TransactionInstruction[] = []
  let penaltyVault = await checkWalletATA(penaltyMint.toBase58(), memorandumProvider.connection, penaltyWallet)

  if (!penaltyVault) {
    penaltyVault = await addTokenAccountInstruction(penaltyMint, penaltyWallet, preInstructions, signer, signers)
  }

  let userVault = await checkWalletATA(penaltyMint.toBase58(), memorandumProvider.connection, penaltyWallet)

  if (!userVault) {
    console.log("user doesn't have token to pay penalty fee!");
    return;
  }

  const tx = await memorandumProgram.methods.updateMemorandum(
    {
      title, content
    }
  )
    .accounts({
      creator,
      globalState,
      memorandumManager,
      memorandum,
      penaltyVault,
      userVault,
      ...defaults
    })
    .signers(signers)
    .rpc()

  // eslint-disable-next-line no-console
  console.log('updateMemorandum tx = ', tx)

}

export const getMemorandumManagerList = async () => {
  return await memorandumProgram.account.memorandumManager.all()
}
export async function pda(seeds: (Buffer | Uint8Array)[], pid: anchor.web3.PublicKey) {
  const [pdaKey] = await anchor.web3.PublicKey.findProgramAddress(seeds, pid)
  return pdaKey
}
export const checkWalletATA = async (
  mint: string,
  connection: anchor.web3.Connection = memorandumProvider.connection,
  walletPubkey: anchor.web3.PublicKey = memorandumProvider.wallet.publicKey
) => {
  const parsedTokenAccounts = await connection.getParsedTokenAccountsByOwner(
    walletPubkey,
    {
      programId: TOKEN_PROGRAM_ID
    },
    'confirmed'
  )
  let result: any = null
  let maxAmount = 0
  parsedTokenAccounts.value.forEach(async (tokenAccountInfo) => {
    const tokenAccountPubkey = tokenAccountInfo.pubkey
    const parsedInfo = tokenAccountInfo.account.data.parsed.info
    const mintAddress = parsedInfo.mint
    const amount = parsedInfo.tokenAmount.uiAmount
    if (mintAddress === mint && amount >= maxAmount) {
      result = tokenAccountPubkey
      maxAmount = amount
    }
  })

  return result
}
export const addTokenAccountInstruction = async (
  mint: anchor.web3.PublicKey,
  owner: anchor.web3.PublicKey,
  instructions: anchor.web3.TransactionInstruction[],
  signer: anchor.web3.PublicKey,
  signers: anchor.web3.Keypair[],
  rent: number = 0
) => {
  const newKeypair = anchor.web3.Keypair.generate()
  const rentForTokenAccount = await Token.getMinBalanceRentForExemptAccount(memorandumProvider.connection)
  instructions.push(
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: signer,
      newAccountPubkey: newKeypair.publicKey,
      lamports: rent > 0 ? rent : rentForTokenAccount,
      space: ACCOUNT_LAYOUT.span,
      programId: TOKEN_PROGRAM_ID
    })
  )
  const instruction = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, mint, newKeypair.publicKey, owner)
  instructions.push(instruction)
  signers.push(newKeypair)
  return newKeypair.publicKey
}

export const addTokenAccountFromKeypairInstruction = async (
  mint: anchor.web3.PublicKey,
  owner: anchor.web3.PublicKey,
  newKeypair: anchor.web3.Keypair,
  instructions: anchor.web3.TransactionInstruction[],
  signer: anchor.web3.PublicKey,
  signers: anchor.web3.Keypair[],
  rent: number = 0
) => {
  //const newKeypair = Keypair.generate()
  const rentForTokenAccount = await Token.getMinBalanceRentForExemptAccount(memorandumProvider.connection)
  instructions.push(
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: signer,
      newAccountPubkey: newKeypair.publicKey,
      lamports: rent > 0 ? rent : rentForTokenAccount,
      space: ACCOUNT_LAYOUT.span,
      programId: TOKEN_PROGRAM_ID
    })
  )
  const instruction = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, mint, newKeypair.publicKey, owner)
  instructions.push(instruction)
  signers.push(newKeypair)
  return newKeypair.publicKey
}
export const ACCOUNT_LAYOUT = struct([
  publicKey('mint'),
  publicKey('owner'),
  u64('amount'),
  u32('delegateOption'),
  publicKey('delegate'),
  u8('state'),
  u32('isNativeOption'),
  u64('isNative'),
  u64('delegatedAmount'),
  u32('closeAuthorityOption'),
  publicKey('closeAuthority')
])

export const MINT_LAYOUT = struct([
  u32('mintAuthorityOption'),
  publicKey('mintAuthority'),
  u64('supply'),
  u8('decimals'),
  bool('initialized'),
  u32('freezeAuthorityOption'),
  publicKey('freezeAuthority')
])
