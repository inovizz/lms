pragma solidity ^0.4.0;

import "./DataStore.sol";
import "./OrgLibrary.sol";
import "./OrganisationInterface.sol";


contract Parent {
    using OrgLibrary for address;
    address public orgStore;

    function Parent(address initAddress) {
        if (initAddress == 0x0) {
            orgStore = new DataStore();
        } else {
            orgStore = initAddress;
        }
    }

    function registerOrganisation(bytes32 key, address org) {
        // Important: Pass an organisation without a set data store
        orgStore.createOrganisation(key, org);
        // Create new book and member data stores
        OrganisationInterface(org).setDataStore(0x0, 0x0);
    }

    function getOrganisation(bytes32 key) constant returns (address) {
        return orgStore.getOrganisation(key);
    }

    function upgradeOrganisation(bytes32 key, address newOrg) {
        var org = orgStore.getOrganisation(key);
        var (bookStore, memberStore) = OrganisationInterface(org).getDataStore();
        OrganisationInterface(newOrg).setDataStore(bookStore, memberStore);
        orgStore.setOrganisation(key, newOrg);
    }
}
