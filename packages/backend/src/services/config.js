const result = require('dotenv').config();

CONFIG = {} 
CONFIG.app = process.env.APP   || 'development';
CONFIG.port = process.env.PORT  || '3002';

CONFIG.eth_url = process.env.ETH_URL || 'http://127.0.0.1:8545';
CONFIG.wallet_passphrase = process.env.HD_WALLET_PASSPHRASE || 'dentist orphan famous deliver shock trumpet rifle equip paddle first desert around';
CONFIG.eth_network_id = process.env.ETH_NETWORK_ID || '5777';

CONFIG.hs_contract_address = "0xA1F4553c232c019718999E838398aF5F90296DB4";

CONFIG.ipfs_api_address = '127.0.0.1';
CONFIG.ipfs_api_port = '5001';
CONFIG.ipfs_url = CONFIG.ipfs_api_address + ':8080/ipfs/';
secret: 'shhhh', // TODO Put in process.env
CONFIG.clientUrl = 'http://localhost:3002';


