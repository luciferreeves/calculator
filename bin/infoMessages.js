const terminalLink = require('terminal-link');
const boxen = require("boxen");
const chalk = require("chalk");
var packageInfo = require('./../package.json');

module.exports = {
    getIntroductoryMessage: () => {
        // If the command is run without any options we will show the about screen
        const terminalSupportedLink = `${chalk.blue.underline(terminalLink('here', packageInfo.homepage))}`;
        const terminalUnsupportedLink = `here: ${chalk.blue.underline(packageInfo.homepage)}`;
        const calculatorAboutMessage = `
        ${chalk.white.bold('Calculator')} ${chalk.green.bold('v' + packageInfo.version)}
        Written by ${packageInfo.author} — available ${terminalLink.isSupported ? terminalSupportedLink : terminalUnsupportedLink}.
        Licensed under the ${packageInfo.license} License.
    
        Calculator, as the name suggests, is a Scientific Calculator which runs on the command line (CLI)
        of your device and is available for all major desktop operating systems. This program is open
        source and is written in JavaScript (NodeJS).
    
        For learning the usage run: ${chalk.green('calculator --help')} or ${chalk.green('calculator --h')}
        License Information: ${chalk.green('calculator --license')}
        Open Source Credis: ${chalk.green('calculator --credits')}
        `;

        console.log(boxen(calculatorAboutMessage, { padding: 1, borderColor: "green" }))
    }
}