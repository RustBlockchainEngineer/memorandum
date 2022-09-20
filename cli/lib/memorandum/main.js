"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MINT_LAYOUT = exports.ACCOUNT_LAYOUT = exports.addTokenAccountFromKeypairInstruction = exports.addTokenAccountInstruction = exports.checkWalletATA = exports.pda = exports.getMemorandumManagerList = exports.updateMemorandum = exports.createMemorandum = exports.createMemorandumManager = exports.createGlobalState = exports.initProgram = exports.defaults = exports.clock = exports.rent = exports.tokenProgram = exports.systemProgram = exports.BPF_LOADER_UPGRADEABLE_PROGRAM_ID = exports.memorandumProgramId = exports.memorandumProvider = exports.memorandumProgram = void 0;
const anchor = __importStar(require("@project-serum/anchor"));
const spl_token_1 = require("@solana/spl-token");
const borsh_1 = require("@project-serum/borsh");
const memorandum_1 = require("./types/memorandum");
exports.memorandumProgram = null;
exports.memorandumProvider = null;
exports.memorandumProgramId = null;
const GLOBAL_STATE_TAG = Buffer.from('GLOBAL_STATE_TAG');
const MEMORANDUM_MANAGER_TAG = Buffer.from('MEMORANDUM_MANAGER_TAG');
const MEMORANDUM_TAG = Buffer.from('MEMORANDUM_TAG');
const TITLE_LENGTH = 50;
const CONTENT_LENGTH = 500;
exports.BPF_LOADER_UPGRADEABLE_PROGRAM_ID = new anchor.web3.PublicKey("BPFLoaderUpgradeab1e11111111111111111111111");
exports.systemProgram = anchor.web3.SystemProgram.programId;
exports.tokenProgram = spl_token_1.TOKEN_PROGRAM_ID;
exports.rent = anchor.web3.SYSVAR_RENT_PUBKEY;
exports.clock = anchor.web3.SYSVAR_CLOCK_PUBKEY;
exports.defaults = {
    systemProgram: exports.systemProgram,
    tokenProgram: exports.tokenProgram,
    rent: exports.rent,
    clock: exports.clock
};
const initProgram = (wallet, connection, pid) => {
    exports.memorandumProgramId = pid;
    const provider = new anchor.AnchorProvider(connection, wallet, { skipPreflight: true });
    exports.memorandumProvider = provider;
    exports.memorandumProgram = new anchor.Program(memorandum_1.IDL, exports.memorandumProgramId, provider);
};
exports.initProgram = initProgram;
const createGlobalState = async (signer = exports.memorandumProvider.wallet.publicKey, signers = []) => {
    const globalState = await pda([GLOBAL_STATE_TAG], exports.memorandumProgramId);
    const programData = await pda([exports.memorandumProgramId.toBytes()], exports.BPF_LOADER_UPGRADEABLE_PROGRAM_ID);
    const superOwner = signer;
    const tx = await exports.memorandumProgram.methods.createGlobalState()
        .accounts({
        superOwner,
        payer: superOwner,
        globalState,
        memorandumProgram: exports.memorandumProgramId,
        programData,
        ...exports.defaults
    })
        .signers(signers)
        .rpc();
    // eslint-disable-next-line no-console
    console.log('createGlobalState tx = ', tx);
};
exports.createGlobalState = createGlobalState;
const createMemorandumManager = async (penaltyMint, penaltyAmount, signer = exports.memorandumProvider.wallet.publicKey, signers = []) => {
    const memorandumManager = await pda([MEMORANDUM_MANAGER_TAG, penaltyMint.toBytes()], exports.BPF_LOADER_UPGRADEABLE_PROGRAM_ID);
    const superOwner = signer;
    const tx = await exports.memorandumProgram.methods.createMemorandumManager(penaltyAmount)
        .accounts({
        superOwner,
        payer: superOwner,
        memorandumManager,
        penaltyMint,
        ...exports.defaults
    })
        .signers(signers)
        .rpc();
    // eslint-disable-next-line no-console
    console.log('createMemorandumManager tx = ', tx);
};
exports.createMemorandumManager = createMemorandumManager;
const createMemorandum = async (title, content, penaltyMint, signer = exports.memorandumProvider.wallet.publicKey, signers = []) => {
    const globalState = await pda([GLOBAL_STATE_TAG], exports.memorandumProgramId);
    const globalStateData = await exports.memorandumProgram.account.globalState.fetch(globalState);
    const memorandumManager = await pda([MEMORANDUM_MANAGER_TAG, penaltyMint.toBytes()], exports.BPF_LOADER_UPGRADEABLE_PROGRAM_ID);
    const memorandum = await pda([MEMORANDUM_TAG, globalStateData.memorandumCount.toArrayLike(Buffer, 'be', 8)], exports.BPF_LOADER_UPGRADEABLE_PROGRAM_ID);
    const creator = signer;
    const tx = await exports.memorandumProgram.methods.createMemorandum({
        title, content
    })
        .accounts({
        creator,
        payer: creator,
        globalState,
        memorandumManager,
        memorandum,
        ...exports.defaults
    })
        .signers(signers)
        .rpc();
    // eslint-disable-next-line no-console
    console.log('createMemorandum tx = ', tx);
};
exports.createMemorandum = createMemorandum;
const updateMemorandum = async (title, content, memorandum, signer = exports.memorandumProvider.wallet.publicKey, signers = []) => {
    const globalState = await pda([GLOBAL_STATE_TAG], exports.memorandumProgramId);
    const globalStateData = await exports.memorandumProgram.account.globalState.fetch(globalState);
    const penaltyWallet = globalStateData.penaltyWallet;
    const memorandumData = await exports.memorandumProgram.account.memorandum.fetch(memorandum);
    const memorandumManager = memorandumData.memorandumManager;
    const memorandumManagerData = await exports.memorandumProgram.account.memorandumManager.fetch(memorandumManager);
    const penaltyMint = memorandumManagerData.penaltyMint;
    const creator = signer;
    const preInstructions = [];
    let penaltyVault = await (0, exports.checkWalletATA)(penaltyMint.toBase58(), exports.memorandumProvider.connection, penaltyWallet);
    if (!penaltyVault) {
        penaltyVault = await (0, exports.addTokenAccountInstruction)(penaltyMint, penaltyWallet, preInstructions, signer, signers);
    }
    let userVault = await (0, exports.checkWalletATA)(penaltyMint.toBase58(), exports.memorandumProvider.connection, penaltyWallet);
    if (!userVault) {
        console.log("user doesn't have token to pay penalty fee!");
        return;
    }
    const tx = await exports.memorandumProgram.methods.updateMemorandum({
        title, content
    })
        .accounts({
        creator,
        globalState,
        memorandumManager,
        memorandum,
        penaltyVault,
        userVault,
        ...exports.defaults
    })
        .signers(signers)
        .rpc();
    // eslint-disable-next-line no-console
    console.log('updateMemorandum tx = ', tx);
};
exports.updateMemorandum = updateMemorandum;
const getMemorandumManagerList = async () => {
    return await exports.memorandumProgram.account.memorandumManager.all();
};
exports.getMemorandumManagerList = getMemorandumManagerList;
async function pda(seeds, pid) {
    const [pdaKey] = await anchor.web3.PublicKey.findProgramAddress(seeds, pid);
    return pdaKey;
}
exports.pda = pda;
const checkWalletATA = async (mint, connection = exports.memorandumProvider.connection, walletPubkey = exports.memorandumProvider.wallet.publicKey) => {
    const parsedTokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPubkey, {
        programId: spl_token_1.TOKEN_PROGRAM_ID
    }, 'confirmed');
    let result = null;
    let maxAmount = 0;
    parsedTokenAccounts.value.forEach(async (tokenAccountInfo) => {
        const tokenAccountPubkey = tokenAccountInfo.pubkey;
        const parsedInfo = tokenAccountInfo.account.data.parsed.info;
        const mintAddress = parsedInfo.mint;
        const amount = parsedInfo.tokenAmount.uiAmount;
        if (mintAddress === mint && amount >= maxAmount) {
            result = tokenAccountPubkey;
            maxAmount = amount;
        }
    });
    return result;
};
exports.checkWalletATA = checkWalletATA;
const addTokenAccountInstruction = async (mint, owner, instructions, signer, signers, rent = 0) => {
    const newKeypair = anchor.web3.Keypair.generate();
    const rentForTokenAccount = await spl_token_1.Token.getMinBalanceRentForExemptAccount(exports.memorandumProvider.connection);
    instructions.push(anchor.web3.SystemProgram.createAccount({
        fromPubkey: signer,
        newAccountPubkey: newKeypair.publicKey,
        lamports: rent > 0 ? rent : rentForTokenAccount,
        space: exports.ACCOUNT_LAYOUT.span,
        programId: spl_token_1.TOKEN_PROGRAM_ID
    }));
    const instruction = spl_token_1.Token.createInitAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint, newKeypair.publicKey, owner);
    instructions.push(instruction);
    signers.push(newKeypair);
    return newKeypair.publicKey;
};
exports.addTokenAccountInstruction = addTokenAccountInstruction;
const addTokenAccountFromKeypairInstruction = async (mint, owner, newKeypair, instructions, signer, signers, rent = 0) => {
    //const newKeypair = Keypair.generate()
    const rentForTokenAccount = await spl_token_1.Token.getMinBalanceRentForExemptAccount(exports.memorandumProvider.connection);
    instructions.push(anchor.web3.SystemProgram.createAccount({
        fromPubkey: signer,
        newAccountPubkey: newKeypair.publicKey,
        lamports: rent > 0 ? rent : rentForTokenAccount,
        space: exports.ACCOUNT_LAYOUT.span,
        programId: spl_token_1.TOKEN_PROGRAM_ID
    }));
    const instruction = spl_token_1.Token.createInitAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint, newKeypair.publicKey, owner);
    instructions.push(instruction);
    signers.push(newKeypair);
    return newKeypair.publicKey;
};
exports.addTokenAccountFromKeypairInstruction = addTokenAccountFromKeypairInstruction;
exports.ACCOUNT_LAYOUT = (0, borsh_1.struct)([
    (0, borsh_1.publicKey)('mint'),
    (0, borsh_1.publicKey)('owner'),
    (0, borsh_1.u64)('amount'),
    (0, borsh_1.u32)('delegateOption'),
    (0, borsh_1.publicKey)('delegate'),
    (0, borsh_1.u8)('state'),
    (0, borsh_1.u32)('isNativeOption'),
    (0, borsh_1.u64)('isNative'),
    (0, borsh_1.u64)('delegatedAmount'),
    (0, borsh_1.u32)('closeAuthorityOption'),
    (0, borsh_1.publicKey)('closeAuthority')
]);
exports.MINT_LAYOUT = (0, borsh_1.struct)([
    (0, borsh_1.u32)('mintAuthorityOption'),
    (0, borsh_1.publicKey)('mintAuthority'),
    (0, borsh_1.u64)('supply'),
    (0, borsh_1.u8)('decimals'),
    (0, borsh_1.bool)('initialized'),
    (0, borsh_1.u32)('freezeAuthorityOption'),
    (0, borsh_1.publicKey)('freezeAuthority')
]);
//# sourceMappingURL=main.js.map