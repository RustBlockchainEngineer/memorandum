import * as anchor from '@project-serum/anchor'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Memorandum, IDL } from './types/memorandum'

export let memorandumProgram: anchor.Program<Memorandum> = null as unknown as anchor.Program<Memorandum>
export let memorandumProvider: anchor.AnchorProvider = null as unknown as anchor.AnchorProvider
export let memorandumProgramId: anchor.web3.PublicKey = null as unknown as anchor.web3.PublicKey

const GLOBAL_STATE_TAG = Buffer.from('GLOBAL_STATE_TAG');
const MEMORANDUM_MANAGER_TAG = "MEMORANDUM_MANAGER_TAG";
const MEMORANDUM_TAG = "MEMORANDUM_TAG";
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

export async function pda(seeds: (Buffer | Uint8Array)[], pid: anchor.web3.PublicKey) {
  const [pdaKey] = await anchor.web3.PublicKey.findProgramAddress(seeds, pid)
  return pdaKey
}
