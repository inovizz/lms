pragma solidity ^0.4.8;

import "./DataStore.sol";
import "./OrgLibrary.sol";
import "./OrganisationInterface.sol";
import "./SecurityLibrary.sol";
import "./DataVerifiable.sol";


contract Parent is DataVerifiable {

    address orgStore;

    using OrgLibrary for address;
    using SecurityLibrary for address;

    function Parent() payable {
        // Call setDataStore before using this contract.
    }

    function setDataStore(address _orgStore) superAdminOrOwner {
        if (_orgStore == 0x0) {
            orgStore = new DataStore();
        } else {
            orgStore = _orgStore;
        }
        DataVerifiable.orgStore = orgStore;
    }

    function getOrgStore() constant superAdminOrOwner returns(address) {
        return orgStore;
    }

    function makeUserOrgAdmin(address user, address org) superAdminOrOwner {
        orgStore.addAdmin(user, org);
    }

    function isOrgAdmin(address user, address org) constant returns (bool) {
        return orgStore.isUserAdmin(user, org);
    }

    function makeSuperAdmin(address _user) superAdminOrOwner {
        orgStore.makeSuperAdmin(_user);
    }

    function registerOrganisation(bytes32 key, address org) superAdminOrOwner {
        orgStore.addAdmin(this, org);
        // Important: Pass an organisation without a set data store
        orgStore.registerOrganisation(key, org);
        // Create new book and member data stores
        OrganisationInterface(org).setDataStore(0x0, 0x0);
    }

    function getOrganisation(bytes32 key) constant returns (address) {
        return orgStore.getOrganisation(key);
    }

    function upgradeOrganisation(bytes32 key, address newOrg) superAdminOrOwner {
        var org = orgStore.getOrganisation(key);
        // In order to call setDataStore of newOrg, parent has to become an admin
        orgStore.addAdmin(this, newOrg);
        var (bookStore, memberStore) = OrganisationInterface(org).getDataStore();
        OrganisationInterface(newOrg).setDataStore(bookStore, memberStore);
        orgStore.setOrganisation(key, newOrg);
        OrganisationInterface(org).kill(newOrg);
    }

    function kill(address upgradedParent) superAdminOrOwner {
        // Provide the address of upgraded parent in order to transfer all data and ownership to the new parent.
        if (upgradedParent == 0x0) {
            throw;
        }
        DataStore(orgStore).transferOwnership(upgradedParent);
        selfdestruct(upgradedParent);
    }
}
