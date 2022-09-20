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
program.command("create-memorandum-manager <PENALTY_TOKEN_MINT> <PENALTY_AMOUNT> <SIGNER>")
    .description("create memorandum manager")
    .action(function (penaltyTokenMint, penaltyAmount, signer) {
    (0, memorandum_1.createMemorandumManagerCommand)(penaltyTokenMint, penaltyAmount, signer);
});
program.command("create-memorandum <PENALTY_TOKEN_MINT> <TITLE> <CONTENT> <SIGNER>")
    .description("create memorandum")
    .action(function (penaltyTokenMint, title, content, signer) {
    (0, memorandum_1.createMemorandumCommand)(penaltyTokenMint, title, content, signer);
});
program.command("update-memorandum <MEMORANDUM_ADDRESS> <TITLE> <CONTENT> <SIGNER>")
    .description("update memorandum")
    .action(function (memorandumAddress, title, content, signer) {
    (0, memorandum_1.updateMemorandumCommand)(memorandumAddress, title, content, signer);
});
program.command("get-memorandum-managers")
    .description("get all memorandum managers")
    .action(function () {
    (0, memorandum_1.getAllMemorandumManagers)();
});
program.parse();
//# sourceMappingURL=index.js.map