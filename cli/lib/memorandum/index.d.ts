import * as anchor from "@project-serum/anchor";
export declare const MEMORANDUM_PID = "HuutBEMazN5RWDAQCXbDRFqxQc7hrYmhvR4XCn6Reo7i";
export declare const RPC_ENDPOINT = "http://localhost:8899";
export declare const SOLANA_CONNECTION: anchor.web3.Connection;
export declare const readJsonKeypair: (path: string) => anchor.web3.Keypair;
export declare const createGlobalStateCommand: (signer: string) => Promise<void>;
export declare const createMemorandumManagerCommand: (penaltyTokenMint: string, penaltyAmount: number, signer: string) => Promise<void>;
export declare const createMemorandumCommand: (penaltyTokenMint: string, title: string, content: string, signer: string) => Promise<void>;
export declare const updateMemorandumCommand: (memorandumAddress: string, title: string, content: string, signer: string) => Promise<void>;
export declare const getAllMemorandumManagers: () => Promise<any[]>;
//# sourceMappingURL=index.d.ts.map