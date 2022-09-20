#!/usr/bin/env -S ts-node --transpile-only
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const memorandum_1 = require("./memorandum");
const program = new commander_1.Command("memorandum")
    .showHelpAfterError(true)
    .showSuggestionAfterError(true)
    .helpOption("-h, --help", "display this help message and exit");
program.command("create-global-state <SIGNER>")
    .description("create global state of memorandum program")
    .action(function (signer) {
    (0, memorandum_1.createGlobalStateCommand)(signer);
});
program.command("update-super-owner <NEW_SUPER_OWNER> <SIGNER>")
    .description("update global state for super owner")
    .action(function (newSuperOwner, signer) {
    console.log("update global state", newSuperOwner, signer);
});
program.parse();
