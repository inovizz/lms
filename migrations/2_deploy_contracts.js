var StringLib = artifacts.require("./StringLib.sol");
var DataStore = artifacts.require("./DataStore.sol");
var LMS = artifacts.require("./LMS.sol");

module.exports = function(deployer) {
  deployer.deploy(StringLib);
  deployer.link(StringLib, LMS);
  deployer.deploy(DataStore);
  deployer.deploy(LMS);
};
