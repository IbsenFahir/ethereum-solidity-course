// Load env vars
require("dotenv").config();

const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { abi, evm } = require("./compile")

const mnemonicPhrase = process.env.ACCOUNT_MNEMONIC;
const rinkebyEndpoint = process.env.RINKEBY_ENDPOINT;
const INITIAL_MESSAGE = "Initial message here!"

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: rinkebyEndpoint
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log("Attempting to deploy from account", accounts[0])

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: '1000000' });

  console.log("Contract deploy to", result.options.address)
  provider.engine.stop()
}

deploy()
