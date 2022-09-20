/// <reference types="node" />
import * as anchor from '@project-serum/anchor';
import { Memorandum } from './types/memorandum';
export declare let memorandumProgram: anchor.Program<Memorandum>;
export declare let memorandumProvider: anchor.AnchorProvider;
export declare let memorandumProgramId: anchor.web3.PublicKey;
export declare const BPF_LOADER_UPGRADEABLE_PROGRAM_ID: anchor.web3.PublicKey;
export declare const systemProgram: anchor.web3.PublicKey;
export declare const tokenProgram: anchor.web3.PublicKey;
export declare const rent: anchor.web3.PublicKey;
export declare const clock: anchor.web3.PublicKey;
export declare const defaults: {
    systemProgram: anchor.web3.PublicKey;
    tokenProgram: anchor.web3.PublicKey;
    rent: anchor.web3.PublicKey;
    clock: anchor.web3.PublicKey;
};
export declare const initProgram: (wallet: anchor.Wallet, connection: anchor.web3.Connection, pid: anchor.web3.PublicKey) => void;
export declare const createGlobalState: (signer?: anchor.web3.PublicKey, signers?: anchor.web3.Keypair[]) => Promise<void>;
export declare const createMemorandumManager: (penaltyMint: anchor.web3.PublicKey, penaltyAmount: anchor.BN, signer?: anchor.web3.PublicKey, signers?: anchor.web3.Keypair[]) => Promise<void>;
export declare const createMemorandum: (title: string, content: string, penaltyMint: anchor.web3.PublicKey, signer?: anchor.web3.PublicKey, signers?: anchor.web3.Keypair[]) => Promise<void>;
export declare const updateMemorandum: (title: string, content: string, memorandum: anchor.web3.PublicKey, signer?: anchor.web3.PublicKey, signers?: anchor.web3.Keypair[]) => Promise<void>;
export declare const getMemorandumManagerList: () => Promise<anchor.ProgramAccount<import("@project-serum/anchor/dist/cjs/program/namespace/types").TypeDef<{
    name: "globalState";
    type: {
        kind: "struct";
        fields: [{
            name: "bump";
            type: "u8";
        }, {
            name: "superOwner";
            type: "publicKey";
        }, {
            name: "penaltyWallet";
            type: "publicKey";
        }, {
            name: "memorandumCount";
            type: "u64";
        }, {
            name: "reserved";
            type: {
                array: ["u128", 7];
            };
        }];
    };
} | {
    name: "memorandumManager";
    type: {
        kind: "struct";
        fields: [{
            name: "bump";
            type: "u8";
        }, {
            name: "penaltyMint";
            type: "publicKey";
        }, {
            name: "penaltyAmount";
            type: "u64";
        }, {
            name: "reserved";
            type: {
                array: ["u128", 5];
            };
        }];
    };
} | {
    name: "memorandum";
    type: {
        kind: "struct";
        fields: [{
            name: "bump";
            type: "u8";
        }, {
            name: "creator";
            type: "publicKey";
        }, {
            name: "memorandumManager";
            type: "publicKey";
        }, {
            name: "memorandumNum";
            type: "u64";
        }, {
            name: "title";
            type: "string";
        }, {
            name: "content";
            type: "string";
        }, {
            name: "reserved";
            type: {
                array: ["u128", 7];
            };
        }];
    };
}, anchor.IdlTypes<Memorandum>>>[]>;
export declare function pda(seeds: (Buffer | Uint8Array)[], pid: anchor.web3.PublicKey): Promise<anchor.web3.PublicKey>;
export declare const checkWalletATA: (mint: string, connection?: anchor.web3.Connection, walletPubkey?: anchor.web3.PublicKey) => Promise<any>;
export declare const addTokenAccountInstruction: (mint: anchor.web3.PublicKey, owner: anchor.web3.PublicKey, instructions: anchor.web3.TransactionInstruction[], signer: anchor.web3.PublicKey, signers: anchor.web3.Keypair[], rent?: number) => Promise<anchor.web3.PublicKey>;
export declare const addTokenAccountFromKeypairInstruction: (mint: anchor.web3.PublicKey, owner: anchor.web3.PublicKey, newKeypair: anchor.web3.Keypair, instructions: anchor.web3.TransactionInstruction[], signer: anchor.web3.PublicKey, signers: anchor.web3.Keypair[], rent?: number) => Promise<anchor.web3.PublicKey>;
export declare const ACCOUNT_LAYOUT: any;
export declare const MINT_LAYOUT: any;
//# sourceMappingURL=main.d.ts.map