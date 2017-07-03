pragma solidity ^0.4.8;

import "./SecurityLibrary.sol";
import "./helper_contracts/zeppelin/ownership/Ownable.sol";


contract DataVerifiable is Ownable {

	address orgStore;
	using SecurityLibrary for address;

    modifier orgAdminOrOwner(address org) {
        if (owner==msg.sender) {
            _;
        } else if (orgStore.isUserAdmin(msg.sender, org)) {
            _;
        } else {
            throw;
        }
    }

    modifier superAdminOrOwner() {
        if (owner==msg.sender) {
            _;
        } else if (orgStore.isSuperAdmin(msg.sender)) {
            _;
        } else {
            throw;
        }
    }

}