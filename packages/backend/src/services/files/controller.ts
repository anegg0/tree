import { NextFunction, Request, Response } from 'express';

import { File } from '../../models/file.model';
// require('../../con fig');
// import fs from 'fs';
// import moment from 'moment';
// import web3Utils from 'web3-URLs';
import CryptoJS from 'crypto-js';
//import CryptoJS = require("../../../../../node_modules/@types/crypto-js")
// import bodyParser from 'body-parser';
// import ipfsAPI from 'ipfs-http-client';
var ipfsAPI = require('ipfs-api');
// import IPFS from ('./types.d');
// import * as ipfsAPI '@textile/ipfs-lite'
// const ipfs = ipfsAPI('127.0.0.1', '5001', { protocol: 'http' });
var ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });
export const create = (req: Request, res: Response, next: NextFunction) => {
  try {

    //## prepare data
    const fileToAdd = req.body;
    const fileContentWordArray = CryptoJS.lib.WordArray.create(req.body);
    const fileHash = CryptoJS.SHA256(fileContentWordArray).toString();

    // const epochTime = Math.round(moment().format('X'));
    // console.log(moment().format('X'));

    //## save to fps
    async function asyncAddToIpfs() {
      try {
        // const data = await getStringFromWebServerAsync("http://localhost/GetAString");

        const fileIPFS = await ipfs.files.add(fileToAdd);
        console.log(fileIPFS);
      }
      catch (err) {
        console.log(err);
      }
    }
    console.log('fileHash : ' + fileHash);
  } finally { }
}
