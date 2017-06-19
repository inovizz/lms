pragma solidity ^0.4.0;

import "./helper_contracts/strings.sol";
import "./helper_contracts/StringLib.sol";

import "./DataStore.sol";


library MembersLibrary {

    // Status of transaction. Used for error handling.
    event Status(uint indexed statusCode);

    // Member has following states: 0 (Active), 1 (Inactive)

    function memberCount(address memberStoreAddress) constant returns (uint count) {
        return DataStore(memberStoreAddress).count();
    }

    function addMember(address memberStoreAddress, string name, string email, address account) public {
        var memberStore = DataStore(memberStoreAddress);
        var emailIndex = memberStore.getBytes32Index('email', sha3(email));
        var accountIndex = memberStore.getAddressIndex('account', account);
        if (accountIndex == emailIndex && accountIndex != 0) {
            // if member is already registered with given info
            memberStore.setIntValue(accountIndex, 'state', 0);
            Status(102);
            return;
        }
        if (accountIndex != 0 && emailIndex != 0 && emailIndex != accountIndex) {
            // provided account and email already registered but with different users
            Status(103);
            return;
        }
        if (accountIndex == 0 && emailIndex != 0) {
            // email is already registered
            Status(104);
            return;
        }
        if (accountIndex != 0 && emailIndex == 0) {
            // account is already registered
            Status(105);
            return;
        }
        memberStore.addNew();
        var index = memberStore.count();

        memberStore.setStringValue(index, 'name', name);
        memberStore.setStringValue(index, 'email', email);
        memberStore.setIntValue(index, 'dateAdded', now);
        memberStore.setAddressValue(index, 'account', account);

        memberStore.setBytes32Index('email', sha3(email), index);
        memberStore.setAddressIndex('account', account, index);
    }

    function removeMember(address memberStoreAddress, address account) {
        var memberStore = DataStore(memberStoreAddress);
        // Deactivate member
        var accountIndex = memberStore.getAddressIndex('account', account);
        if (accountIndex != 0) {
            memberStore.setIntValue(accountIndex, 'state', 1);
        }
    }

    function getMember(address memberStoreAddress, uint index) constant returns (address account, uint state, uint dateAdded) {
        var memberStore = DataStore(memberStoreAddress);
        if (index < 1 || index > memberStore.count()) {
            return;
        }
        account = memberStore.getAddressValue(index, 'account');
        state = memberStore.getIntValue(index, 'state');
        dateAdded = memberStore.getIntValue(index, 'dateAdded');
    }
}