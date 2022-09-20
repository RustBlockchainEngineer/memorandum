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
exports.pda = exports.createGlobalState = exports.initProgram = exports.defaults = exports.clock = exports.rent = exports.tokenProgram = exports.systemProgram = exports.BPF_LOADER_UPGRADEABLE_PROGRAM_ID = exports.memorandumProgramId = exports.memorandumProvider = exports.memorandumProgram = void 0;
const anchor = __importStar(require("@project-serum/anchor"));
const spl_token_1 = require("@solana/spl-token");
const memorandum_1 = require("./types/memorandum");
exports.memorandumProgram = null;
exports.memorandumProvider = null;
exports.memorandumProgramId = null;
const GLOBAL_STATE_TAG = Buffer.from('GLOBAL_STATE_TAG');
const MEMORANDUM_MANAGER_TAG = "MEMORANDUM_MANAGER_TAG";
const MEMORANDUM_TAG = "MEMORANDUM_TAG";
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
async function pda(seeds, pid) {
    const [pdaKey] = await anchor.web3.PublicKey.findProgramAddress(seeds, pid);
    return pdaKey;
}
exports.pda = pda;
