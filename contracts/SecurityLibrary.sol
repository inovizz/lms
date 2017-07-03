pragma solidity ^0.4.8;

import "./DataStore.sol";


library SecurityLibrary {

    event OrgAdminAdded(address _user, address org, bool status);
    event SuperAdminAdded(address _user, bool status);

    function  isUserAdmin(address _orgStoreAddress, address _user, address org) constant returns (bool) {
        return DataStore(_orgStoreAddress).getBoolValue(sha3(_user, org));
    }

    function addAdmin(address _orgStoreAddress, address _user, address org) {
        var userIsSuperAdmin = isSuperAdmin(_orgStoreAddress, _user);
        if (userIsSuperAdmin) {
            throw;
        } else {
            DataStore(_orgStoreAddress).setBoolValue(sha3(_user, org), true);
            OrgAdminAdded(_user, org, DataStore(_orgStoreAddress).getBoolValue(sha3(_user, org)));
        }
    }

    function isSuperAdmin(address _orgStoreAddress, address _user) constant returns (bool) {
        return DataStore(_orgStoreAddress).getBoolValue(sha3('superAdmin', _user));
    }

    function makeSuperAdmin(address _orgStoreAddress, address _user) {
        var dataStore = DataStore(_orgStoreAddress);
        var userIsSuperAdmin = isSuperAdmin(_orgStoreAddress, _user);
        if (userIsSuperAdmin) {
            throw;
        } else {
            dataStore.setBoolValue(sha3('superAdmin', _user), true);
            SuperAdminAdded(_user, DataStore(_orgStoreAddress).getBoolValue(sha3('superAdmin', _user)));
        }
    }
}
