// An iterable data stored designed to be eternal.
// Create new instances for each logical entity e.g. one for books, one for members and so on.
// As is true for all Ethereum contracts, keep the contract addresses very safe, else you will lose all data.

pragma solidity ^0.4.0;

import "./helper_contracts/zeppelin/lifecycle/Killable.sol";

contract DataStore is Killable {
    uint public count;

    function addNew() {
        count++;
    }

    mapping (uint => mapping (bytes32 => address)) public AddressStorage;
    mapping (uint => mapping (bytes32 => uint)) public IntStorage;
    mapping (uint => mapping (bytes32 => string)) public StringStorage;
    // An example Member Data Store:
    // {1: {'name': 'John Doe', 'email': 'john.doe@example.com'}}
    // {2: {'name': 'Johnny Appleseed', 'email': 'johnny.appleseed@icloud.com', 'address': '1, Infinite Loop'}}
    // Book Data Store: {1: {'title': '1984', 'author': '', 'publisher': '', 'imgUrl': ''}}

    function getAddressValue(uint index, bytes32 record) constant returns (address) {
        return AddressStorage[index][record];
    }

    function setAddressValue(uint index, bytes32 record, address value) {
        AddressStorage[index][record] = value;
    }

    function getIntValue(uint index, bytes32 record) constant returns (uint) {
        return IntStorage[index][record];
    }

    function setIntValue(uint index, bytes32 record, uint value) {
        IntStorage[index][record] = value;
    }

    function getStringValue(uint index, bytes32 record) constant returns (string) {
        // This function cannot be used by other contracts or libraries due to an EVM restriction
        // on contracts reading variable-sized data from other contracts.
        return StringStorage[index][record];
    }

    function setStringValue(uint index, bytes32 record, string value) {
        StringStorage[index][record] = value;
    }

    mapping(bytes32 => mapping (address => uint)) AddressIndex;
    mapping(bytes32 => mapping (bytes32 => uint)) Bytes32Index;
    mapping(bytes32 => mapping (int => uint)) IntIndex;

    function getAddressIndex(bytes32 indexName, address record) constant returns (uint) {
        return AddressIndex[indexName][record];
    }

    function setAddressIndex(bytes32 indexName, uint index, address record) {
        AddressIndex[indexName][record] = index;
    }

    function getBytes32Index(bytes32 indexName, bytes32 record) constant returns (uint) {
        return Bytes32Index[indexName][record];
    }

    function setBytes32Index(bytes32 indexName, uint index, bytes32 record) {
        Bytes32Index[indexName][record] = index;
    }

    function getIntIndex(bytes32 indexName, int record) constant returns (uint) {
        return IntIndex[indexName][record];
    }

    function setIntIndex(bytes32 indexName, uint index, int record) {
        IntIndex[indexName][record] = index;
    }
}
