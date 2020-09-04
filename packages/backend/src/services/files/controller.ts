import { NextFunction, Request, Response } from 'express';

import { File } from '../../models/file.model';
require('../../config');
// import fs from 'fs';
// import moment from 'moment';
// import web3Utils from 'web3-utils';
// import { CryptoJS } from 'crypto-js';
// import crypt from 'crypto-js';
// import bodyParser from 'body-parser';
import '@textile/ipfs-lite'
// const ipfs = ipfsAPI('127.0.0.1', '5001', { protocol: 'http' });
export const create = (req: Request, res: Response, next: NextFunction) => {
  try {

    //## prepare data
    // const fileToAdd = req.body;
    // const fileContentWordArray = CryptoJS.lib.WordArray.create(req.body);
    // const fileHash = CryptoJS.SHA256(fileContentWordArray).toString();

    // const epochTime = Math.round(moment().format('X'));
    // console.log(moment().format('X'));

    // //## save to ifps
    // const fileIPFS = ipfs.files.add(fileToAdd);
    // console.log('Added to ipfs : ' + fileIPFS[0].hash);

    // //## save to blockchain
    // console.log('fileHash : ' + fileHash);
    // const data = await hsService.add(fileIPFS[0].hash, fileHash, epochTime);

    // console.log('Added to ETH Blockchain!');
    // res.status(200).send(JSON.stringify({ tx: data, ipfsHash: fileIPFS[0].hash, fileHash: fileHash }));

    File.create(req.body)
      .then((file: File) => res.json(file))
      .catch(next);
  } catch (err) {
    console.log(err);

    if (err.message.includes("revert")) {
      res.status(409).send();
    }
    else {
      res.status(500).send();
    }
  }
}
