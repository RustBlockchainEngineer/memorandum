import * as anchor from "@project-serum/anchor"
import { createGlobalState, createMemorandum, createMemorandumManager, getMemorandumManagerList, initProgram, updateMemorandum } from "./main";
import fs from "fs"
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
export const createMemorandumManagerCommand = async (penaltyTokenMint: string, penaltyAmount: number, signer: string) => {
    const wallet = new anchor.Wallet(readJsonKeypair(signer))
    const connection = SOLANA_CONNECTION;
    const pid = new anchor.web3.PublicKey(MEMORANDUM_PID)
    initProgram(wallet, connection, pid)
    await createMemorandumManager(new anchor.web3.PublicKey(penaltyTokenMint),new anchor.BN(penaltyAmount));
}
export const createMemorandumCommand = async (penaltyTokenMint: string, title: string, content: string, signer: string) => {
    const wallet = new anchor.Wallet(readJsonKeypair(signer))
    const connection = SOLANA_CONNECTION;
    const pid = new anchor.web3.PublicKey(MEMORANDUM_PID)
    initProgram(wallet, connection, pid)
    await createMemorandum(title, content, new anchor.web3.PublicKey(penaltyTokenMint));
}
export const updateMemorandumCommand = async (memorandumAddress: string, title: string, content: string, signer: string) => {
    const wallet = new anchor.Wallet(readJsonKeypair(signer))
    const connection = SOLANA_CONNECTION;
    const pid = new anchor.web3.PublicKey(MEMORANDUM_PID)
    initProgram(wallet, connection, pid)
    await updateMemorandum(title, content, new anchor.web3.PublicKey(memorandumAddress));
}

export const getAllMemorandumManagers = async () => {
    const wallet = new anchor.Wallet(anchor.web3.Keypair.generate())
    const connection = SOLANA_CONNECTION;
    const pid = new anchor.web3.PublicKey(MEMORANDUM_PID)
    initProgram(wallet, connection, pid)
    const all = await getMemorandumManagerList();
    const refactored = []
    all.forEach((val)=>{
        refactored.push(JSON.stringify({
            address: val.publicKey.toBase58(),
            penaltyTokenMint: val.account.penaltyMint.toBase58(),
            penaltyAmount: val.account.penaltyAmount.toNumber()
        }))
    })
    console.log("managers:", refactored);
    return refactored;
}