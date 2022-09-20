#!/usr/bin/env -S ts-node --transpile-only

import { Command } from "commander";
import { createGlobalStateCommand, createMemorandumCommand, createMemorandumManagerCommand, getAllMemorandumManagers, updateMemorandumCommand } from "./memorandum";

const program = new Command("memorandum")
  .showHelpAfterError(true)
  .showSuggestionAfterError(true)
  .helpOption("-h, --help", "display this help message and exit");

program.command("create-global-state <SIGNER>")
  .description("create global state of memorandum program")
  .action(function (signer){
    createGlobalStateCommand(signer)
  });

program.command("create-memorandum-manager <PENALTY_TOKEN_MINT> <PENALTY_AMOUNT> <SIGNER>")
  .description("create memorandum manager")
  .action(function (penaltyTokenMint: string, penaltyAmount: number, signer: string){
    createMemorandumManagerCommand(penaltyTokenMint, penaltyAmount, signer)
  });

program.command("create-memorandum <PENALTY_TOKEN_MINT> <TITLE> <CONTENT> <SIGNER>")
  .description("create memorandum")
  .action(function (penaltyTokenMint: string, title: string, content: string, signer: string){
    createMemorandumCommand(penaltyTokenMint, title, content, signer)
  });

program.command("update-memorandum <MEMORANDUM_ADDRESS> <TITLE> <CONTENT> <SIGNER>")
  .description("update memorandum")
  .action(function (memorandumAddress: string, title: string, content: string, signer: string){
    updateMemorandumCommand(memorandumAddress, title, content, signer)
  });

program.command("get-memorandum-managers")
  .description("get all memorandum managers")
  .action(function (){
    getAllMemorandumManagers();
  });
  
program.parse();
