#!/usr/bin/env -S ts-node --transpile-only
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command("memorandum")
    .showHelpAfterError(true)
    .showSuggestionAfterError(true)
    .helpOption("-h, --help", "display this help message and exit");
program.command("create-global-state <SIGNER>")
    .action(function (signer) {
    console.log("here 1", signer);
});
program.command("update-super-owner <NEW_SUPER_OWNER> <SIGNER>")
    .action(function (newSuperOwner, signer) {
    console.log("here 2", newSuperOwner, signer);
});
program.parse();
////////////////////////////////////////////////////////////////////////////////
