const assert = require('assert');
const ganache = require('ganache-cli');
const { beforeEach, it, describe } = require('mocha');
const Web3 = require('web3')
const { abi, evm } = require("../compile")

const web3 = new Web3(ganache.provider());

let accounts, inbox;
const INITIAL_MESSAGE = "Initial message here!"

beforeEach(async () => {
  // Fetch test accounts from ganache provider
  accounts = await web3.eth.getAccounts()

  // Deploy the contract with one of the accounts
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: '1000000' })
})

describe("Inbox", () => {
  it("deploys a contract", () => {
     assert.ok(inbox.options.address);
  })

  it("has a default message", async () => {
     const message = await inbox.methods.message().call();
     assert.equal(message, INITIAL_MESSAGE);
  })

  it('can change the message', async () => {
    const newMsg = "new message here!!"
    await inbox.methods.setMessage(newMsg).send({ from: accounts[1] });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMsg);
  })
})