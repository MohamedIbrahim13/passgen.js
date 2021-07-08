#!/usr/bin/env node
const { program } = require("commander")
const chalk = require("chalk")
const clipboard = require("clipboardy")
const log = console.log
const createPass = require("./helpers/createPass")
const savePass = require("./helpers/savePass")

program.version("1.0.0").description("Simple Password Generator App")

program
  .option("-l, --length <number>", "Length Of Password", "8")
  .option("-s, --save", "Save Password to passwords.txt")
  .option("-nn, --no-numbers", "Remove Numbers")
  .option("-ns, --no-symbols", "remove Symbols")
  .parse()

const { length, save, numbers, symbols } = program.opts()

// Get password
const generatedPass = createPass(length, numbers, symbols)

// Save to file
if (save) {
  savePass(generatedPass)
}

// Copy to clipboard
clipboard.writeSync(generatedPass)

// Output generated password
log(chalk.magenta("Generated Password: ") + chalk.bold(generatedPass))
log(chalk.green("Password copied successfully to the clipboard"))
