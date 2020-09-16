pragma solidity ^0.5.00;

import "./Ownable.sol";

contract HashStorage is Ownable{
    
    /* event NewTagAdded(string _ipfshash, bytes32 tag); // Event */
    
    mapping (string => ImageInfo) collection;

    struct ImageInfo {
        string ipfshash;
        uint dateAdded; //in epoch
        bool exist;
        ImageInfo memory imageInfo = ImageInfo(_ipfshash, _dateAdded, true);
        collection[_filehash] = imageInfo;
        
        emit HashAdded(_ipfshash, _filehash, _dateAdded);
    }

    /* function get(string memory _hash) public view returns (string memory,string memory, uint, bool, bytes32[10] memory) { */
    function get(string memory _hash) public view returns (string memory,string memory, uint, bool) {
        return (
            _hash, 
            collection[_hash].ipfshash,
            collection[_hash].dateAdded,
            collection[_hash].exist
            /* collection[_hash].tags */
        );
    }
}
