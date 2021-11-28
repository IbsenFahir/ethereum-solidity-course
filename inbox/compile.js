const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, 'utf8');



const input = {
  language: "Solidity",
  sources: {
    // Each Solidity source file to be compiled must be specified by defining either
    // a URL to the file or the literal file content.
    // See https://docs.soliditylang.org/en/v0.8.5/using-the-compiler.html#input-description
    "Inbox.sol": {
      content: source
    }
  },
  settings: {
    metadata: {
      useLiteralContent: true
    },
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = output.contracts["Inbox.sol"].Inbox;
