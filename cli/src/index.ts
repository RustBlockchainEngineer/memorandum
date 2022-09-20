#!/usr/bin/env -S ts-node --transpile-only

import { Command } from "commander";
import { createGlobalStateCommand } from "./memorandum";

const program = new Command("memorandum")
  .showHelpAfterError(true)
  .showSuggestionAfterError(true)
  .helpOption("-h, --help", "display this help message and exit");

program.command("create-global-state <SIGNER>")
  .description("create global state of memorandum program")
  .action(function (signer){
    createGlobalStateCommand(signer)
  });

program.command("update-super-owner <NEW_SUPER_OWNER> <SIGNER>")
.description("update global state for super owner")
  .action(function (newSuperOwner, signer){
    console.log("update global state",newSuperOwner, signer)
  });

program.parse();
