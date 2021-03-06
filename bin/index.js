#!/usr/bin/env node
const infoMessage = require("./infoMessages");
const yargs = require('yargs');

const args = yargs.scriptName("calculator")
    .usage('$0 [command] [args]')
    .option("i", { alias: "info", describe: "Display information about the calculator" })
    .option("h", { alias: "help" })
    .option("v", { alias: "version" })
    .help()
    .strict()
    .argv

if (args.info || Object.keys(args).length < 3 && !args._.length) {
    infoMessage.getIntroductoryMessage();
}
