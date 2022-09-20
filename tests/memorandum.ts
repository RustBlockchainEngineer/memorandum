import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Memorandum } from "../target/types/memorandum";

describe("memorandum", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Memorandum as Program<Memorandum>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
