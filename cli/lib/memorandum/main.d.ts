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
export declare function pda(seeds: (Buffer | Uint8Array)[], pid: anchor.web3.PublicKey): Promise<anchor.web3.PublicKey>;
