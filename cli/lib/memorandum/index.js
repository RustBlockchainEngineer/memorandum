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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGlobalStateCommand = exports.readJsonKeypair = exports.SOLANA_CONNECTION = exports.RPC_ENDPOINT = exports.MEMORANDUM_PID = void 0;
const fs_1 = __importDefault(require("fs"));
const anchor = __importStar(require("@project-serum/anchor"));
const main_1 = require("./main");
exports.MEMORANDUM_PID = 'HuutBEMazN5RWDAQCXbDRFqxQc7hrYmhvR4XCn6Reo7i';
exports.RPC_ENDPOINT = 'http://localhost:8899';
// export const RPC_ENDPOINT = 'https://api.devnet.solana.com';
// export const RPC_ENDPOINT = 'https://solana-api.projectserum.com';
exports.SOLANA_CONNECTION = new anchor.web3.Connection(exports.RPC_ENDPOINT, {
    disableRetryOnRateLimit: true
});
const readJsonKeypair = (path) => {
    fs_1.default.readFile(path, (err, data) => {
        if (err)
            throw err;
        return anchor.web3.Keypair.fromSecretKey(data);
    });
    return anchor.web3.Keypair.generate();
};
exports.readJsonKeypair = readJsonKeypair;
const createGlobalStateCommand = async (signer) => {
    const wallet = new anchor.Wallet((0, exports.readJsonKeypair)(signer));
    const connection = exports.SOLANA_CONNECTION;
    const pid = new anchor.web3.PublicKey(exports.MEMORANDUM_PID);
    (0, main_1.initProgram)(wallet, connection, pid);
    await (0, main_1.createGlobalState)();
};
exports.createGlobalStateCommand = createGlobalStateCommand;
