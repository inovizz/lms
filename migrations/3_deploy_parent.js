var DataStore = artifacts.require("./DataStore.sol");
var OrgLibrary = artifacts.require("./OrgLibrary.sol");
var SecurityLibrary = artifacts.require("./SecurityLibrary.sol");
var Parent = artifacts.require("./Parent.sol");

module.exports = function(deployer) {
  deployer.deploy(DataStore);
  deployer.deploy(OrgLibrary);
  deployer.deploy(SecurityLibrary);
  deployer.link(OrgLibrary, Parent);
  deployer.link(SecurityLibrary, Parent);
  deployer.deploy(Parent);
};
