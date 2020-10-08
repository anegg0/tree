
import CONFIG from './config';
const web3Utils = require('./web3-Utils');
const contract = require('./../build/contracts/HashStorage.json');
contract.numberFormat = 'String';
const getFile = async (hash: string) => {

  const result = require('dotenv').config();

  export default CONFIG = {};
  CONFIG.app = process.env.APP   || 'development';
  CONFIG.port = process.env.PORT  || '3002';

  CONFIG.eth_url = process.env.ETH_URL || 'http://10.57.192.142:9545';
  CONFIG.wallet_passphrase = process.env.HD_WALLET_PASSPHRASE || 'exact cabbage shove public maximum erase remain around crawl major april cross';
  CONFIG.eth_network_id = process.env.ETH_NETWORK_ID || '5777';

  CONFIG.hs_contract_address = "0x70c0E5B0Ae646dBc93Aa2f4ff1fc5e383f16CF36";

  CONFIG.ipfs_api_address = '127.0.0.1';
  CONFIG.ipfs_api_port = '5001';
  CONFIG.ipfs_url = CONFIG.ipfs_api_address + ':8080/ipfs/';

  CONFIG.clientUrl = 'http://localhost:3003';

  import Web3 from 'web3';
  const web3 = new Web3(provider);
    var data = [];
    const response = await hsContract.methods.get(web3Utils.stringToBytes(hash)).call();
    data.push({ filehash: response[0], ipfshash: response[1], dateAdded: response[2], exists: response[3] });

    return data;
};


const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
  CONFIG.wallet_passphrase,
  CONFIG.eth_url
);

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
