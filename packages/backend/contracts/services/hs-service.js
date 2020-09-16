const hsContract = require('./hs-contract-provider').getInstance();
const web3Utils = require('./web3-utils');
const web3 = require('./web3-provider');

const getFile = async (hash) => {

    var data = [];
    const response = await hsContract.methods.get(web3Utils.stringToBytes(hash)).call();
    data.push({ filehash: response[0], ipfshash: response[1], dateAdded: response[2], exists: response[3] });

    return data;
};

// const addFile = async (ipfsHash, fileHash, dateAdded, tags) => {
    const addFile = async (ipfsHash, fileHash, dateAdded) => {

    const accounts = await web3.eth.getAccounts();
    const response = await hsContract.methods.add(
        web3Utils.stringToBytes(ipfsHash),
        web3Utils.stringToBytes(fileHash),
        dateAdded).send({from: accounts[0]});
        // dateAdded, tags).send({from: accounts[0]});

    return response;
};

module.exports = {
    get: async (hash) => await getFile(hash),
    add: async (ipfsHash, fileHash, dateAdded) => await addFile(ipfsHash, fileHash, dateAdded)
}
