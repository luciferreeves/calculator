#!/usr/bin/env node

const yargs = require('yargs');
const terminalLink = require('terminal-link');
const boxen = require("boxen");
const chalk = require("chalk");
const packageInfo = require('./../package.json');
const infoMessage = {
    getIntroductoryMessage: () => {
        // If the command is run without any options we will show the about screen
        const terminalSupportedLink = `${chalk.blue.underline(terminalLink('here', packageInfo.homepage))}`;
        const terminalUnsupportedLink = `here: ${chalk.blue.underline(packageInfo.homepage)}`;
        const calculatorAboutMessage = `${chalk.white.bold('Calculator')} ${chalk.green.bold('v' + packageInfo.version)}\nWritten by ${packageInfo.author} — available ${terminalLink.isSupported ? terminalSupportedLink : terminalUnsupportedLink}.\nLicensed under the ${packageInfo.license} License.\n\nCalculator, as the name suggests, is a Scientific Calculator which runs on the command line (CLI)\nof your device and is available for all major desktop operating systems. This program is open\nsource and is written in JavaScript (NodeJS).\n\nFor learning the usage run: ${chalk.green('calculator --help')} or ${chalk.green('calculator --h')}\nLicense Information: ${chalk.green('calculator --license')}\nOpen Source Credis: ${chalk.green('calculator --credits')}`;

        console.log(boxen(calculatorAboutMessage, { padding: 1, borderColor: "green" }))
    },

    showError: (functionName, usageMessage) => {
        const errorMessage = `function ${chalk.blue(functionName)} ${usageMessage}`;

        console.log(errorMessage);
    }
}
const args = yargs.scriptName("calculator")
    .usage(`
Usage:
  $0 [command] [args] OR $0 <calculation string> [args]

Usage Examples: 
  $0 2+3
  $0 add 2,3
  $0 add 2.5,6.38,13.234 --round-to 2
  
Specific Command Help:
  $0 <command name> -h OR $0 <command name> --Help
  
Command Help Example:
  $0 add --help`)
    .command({
        command: 'add',
        describe: 'Takes a list of numbers all separated by commas and adds them and returns the output. Optional arguments can be passed.',
        builder: (yargs) => yargs
            .option('rt', {
                alias: 'round-to',
                desc: 'Round upto the number of decimal places passed',
                type: 'number',
            }),
        handler: function (args) {
            if (args._.length === 2) {
                const result = args._[1].split(',').reduce((a, b) => Number(a) + Number(b), 0)
                console.log(args.rt ? parseFloat(result.toFixed(args.rt)) : result)
            } else {
                infoMessage.showError('add', 'needs a list of comma-separated numbers to be passed.');
            }
        }
    })
    .option("i", { alias: "info", describe: "Display information about the calculator" })
    .option("h", { alias: "help" })
    .option("v", { alias: "version" })
    .help()
    .argv

if (args.info || Object.keys(args).length < 3 && !args._.length) {
    infoMessage.getIntroductoryMessage();
}
