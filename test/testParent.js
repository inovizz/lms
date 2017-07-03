'use strict';

const Parent = artifacts.require('../contracts/Parent.sol');
const Organisation = artifacts.require('../contracts/Organisation.sol');
const DataStore = artifacts.require('../contracts/DataStore.sol');
import expectThrow from './helpers/expectThrow';
const sha3 = require('solidity-sha3').default;

contract('Parent', function(accounts) {
    let parent, orgStore, org;

    beforeEach(async function() {
        parent = await Parent.new();
        await parent.setDataStore(0x0);
        await parent.makeSuperAdmin(accounts[0]);
        orgStore = await parent.getOrgStore();
        org = await Organisation.new(orgStore);
        await org.setDataStore(0x0, 0x0);
    });

    describe('registerOrganisation and upgradeOrganisation', function() {

        it('should only let SuperAdminOrOwner register the Organisation', async function() {
            let count  = await DataStore.at(orgStore).count();
            assert.equal(count.valueOf(), 0);
            await expectThrow(parent.registerOrganisation("myorg", org.address, {from: accounts[1]}));
            await parent.makeSuperAdmin(accounts[1]);
            await parent.registerOrganisation("myorg", org.address, {from: accounts[1]});

            count  = await DataStore.at(orgStore).count();
            assert.equal(count.valueOf(), 1);
        });

        it('should only let SuperAdminOrOwner upgrade the Organisation', async function() {
            await parent.registerOrganisation("myorg", org.address);
            let newOrg = await Organisation.new(orgStore);
            await expectThrow(parent.upgradeOrganisation("myorg", newOrg.address, {from: accounts[1]}));

            let [oldBookStore, oldMemberStore] =  await org.getDataStore();

            await parent.makeSuperAdmin(accounts[1]);
            await parent.upgradeOrganisation("myorg", newOrg.address, {from: accounts[1]});

            let [newBookStore, newMemberStore] =  await newOrg.getDataStore();

            assert.equal(oldBookStore, newBookStore);
            assert.equal(oldMemberStore, newMemberStore);
        });

        it('should let parent register and upgrade Organisation', async function() {
            let count  = await DataStore.at(orgStore).count();
            assert.equal(count.valueOf(), 0);
            await parent.registerOrganisation("myorg", org.address);

            count  = await DataStore.at(orgStore).count();
            assert.equal(count.valueOf(), 1);

            let memberCount = await org.memberCount();
            assert.equal(memberCount.valueOf(), 0);

            await org.addMember('John Doe', 'john.doe@example.com', accounts[5]);
            memberCount = await org.memberCount();
            assert.equal(memberCount.valueOf(), 1);

            let [oldBookStore, oldMemberStore] =  await org.getDataStore();

            let newOrg = await Organisation.new(orgStore);

            await parent.upgradeOrganisation("myorg", newOrg.address);
            let [newBookStore, newMemberStore] =  await newOrg.getDataStore();

            assert.equal(oldBookStore, newBookStore);
            assert.equal(oldMemberStore, newMemberStore);
            // member's data shall remain same as old org
            memberCount = await newOrg.memberCount();
            assert.equal(memberCount.valueOf(), 1);
        });
    });

    describe('kill parent', function() {

        it('should let owner kill parent', async function() {
            let newParent = await Parent.new();
            await newParent.setDataStore(orgStore);
            await parent.kill(newParent.address);
            assert.equal(orgStore, await newParent.getOrgStore());
        });

        it('should let only SuperAdminOrOwner kill parent', async function() {
            let newParent = await Parent.new();
            await newParent.setDataStore(orgStore);
            await expectThrow(parent.kill(newParent.address, {from: accounts[1]}));
            await parent.makeSuperAdmin(accounts[1]);
            await parent.kill(newParent.address, {from: accounts[1]});
            assert.equal(orgStore, await newParent.getOrgStore());
        });
    });

});