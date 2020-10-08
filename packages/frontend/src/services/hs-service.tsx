
import contractInstance from './hs-contract-provider';
import CONFIG from './config';
import CONFIG from './config';
import contractInstance from './hs-contract-provider';
const web3Utils = require('./web3-Utils');
const contract = require('./../build/contracts/HashStorage.json');
contract.numberFormat = 'String';
import CONFIG from './config';
const getFile = async (hash: string) => {


  const web3 = new Web3(provider);
    var data = [];
    const response = await hsContract.methods.get(web3Utils.stringToBytes(hash)).call();
    data.push({ filehash: response[0], ipfshash: response[1], dateAdded: response[2], exists: response[3] });

    return data;
};

const addFile = async (ipfsHash: string, fileHash: string, dateAdded: string) => {

    const accounts = await web3.eth.getAccounts();
    const response = await hsContract.methods.add(
        web3Utils.stringToBytes(ipfsHash),
        web3Utils.stringToBytes(fileHash),
        dateAdded).send({from: accounts[0]});

    return response;
};

module.exports = {
    get: async (hash: string) => await getFile(hash),
    add: async (ipfsHash: string, fileHash: string, dateAdded: string) => await addFile(ipfsHash, fileHash, dateAdded)
}

const contract = require('./../build/contracts/HashStorage.json');
contract.numberFormat = 'String';

export const contractInstance = new web3.eth.Contract(
  contract.abi,
  CONFIG.hs_contract_address
);

module.exports.getInstance = () => contractInstance;


const getFile = async (hash: string) => {



const addFile = async (ipfsHash: string, fileHash: string, dateAdded: string) => {

    const accounts = await web3.eth.getAccounts();
    const response = await hsContract.methods.add(
        web3Utils.stringToBytes(ipfsHash),
        web3Utils.stringToBytes(fileHash),
        dateAdded).send({from: accounts[0]});

    return response;
};

module.exports = {
    get: async (hash: string) => await getFile(hash),
    add: async (ipfsHash: string, fileHash: string, dateAdded: string) => await addFile(ipfsHash, fileHash, dateAdded)
}



const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider(
  CONFIG.wallet_passphrase,
  CONFIG.eth_url
);


/* module.exports = web3; */


module.exports = {

  hashString: (data: any) => {
    if(typeof data !== 'string') {
      throw new Error(`expecting argument of type string, but got: ${typeof data}`);
    }

    return web3.utils.soliditySha3(data);
  },

  stringToBytes: (data: any) => {
    if(typeof data !== 'string') {
      throw new Error(`expecting argument of type string, but got: ${typeof data}`);
    }

    return web3.utils.asciiToHex(data);
  },

  bytesToString: (bytes: any) => {
    return web3.utils.hexToUtf8(bytes);
  },

  numberInEtherToWei: (data: any) => {
    return web3.utils.toWei(data, 'ether');
  }
};
