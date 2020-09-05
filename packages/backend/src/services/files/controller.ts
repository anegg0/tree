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
    const fileIPFS = ipfs.files.add(fileToAdd);
    console.log('fileIPFS returns: ' + fileIPFS);
    // console.log('Added to ipfs : ' + fileIPFS[0].hash);

    // //## save to blockchain
    console.log('fileHash : ' + fileHash);
    // const data = await hsService.add(fileIPFS[0].hash, fileHash, epochTime);

    // console.log('Added to ETH Blockchain!');
    // res.status(200).send(JSON.stringify({ tx: data, ipfsHash: fileIPFS[0].hash, fileHash: fileHash }));

    File.create(req.body)
      .then((file: File) => res.json(file))
      .catch(next);
  } catch (err) {
    console.log(err);

    if (err.message.includes('revert')) {
      res.status(409).send();
    } else {
      res.status(500).send();
    }
  }
}
