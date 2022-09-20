import fs from "fs"
import * as anchor from "@project-serum/anchor"
import { createGlobalState, initProgram } from "./main";

export const MEMORANDUM_PID = 'HuutBEMazN5RWDAQCXbDRFqxQc7hrYmhvR4XCn6Reo7i';

export const RPC_ENDPOINT = 'http://localhost:8899';
// export const RPC_ENDPOINT = 'https://api.devnet.solana.com';
// export const RPC_ENDPOINT = 'https://solana-api.projectserum.com';

export const SOLANA_CONNECTION = new anchor.web3.Connection(RPC_ENDPOINT, {
    disableRetryOnRateLimit: true
  })

export const readJsonKeypair = (path: string) => {
    fs.readFile(path, (err, data) => {
        if (err) throw err;
        return anchor.web3.Keypair.fromSecretKey(data)
    });
    return anchor.web3.Keypair.generate()
}
export const createGlobalStateCommand = async (signer: string) => {
    const wallet = new anchor.Wallet(readJsonKeypair(signer))
    const connection = SOLANA_CONNECTION;
    const pid = new anchor.web3.PublicKey(MEMORANDUM_PID)
    initProgram(wallet, connection, pid)
    await createGlobalState();
}