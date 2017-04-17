'use strict';
import expectThrow from './helpers/expectThrow';

const LMS = artifacts.require('../contracts/LMS.sol');

contract('LMS', function() {
    let lms;

    beforeEach(async function() {
        lms = await LMS.new('Lallan');
    });

    it('should have a default member', async function() {
        let memberCount = await lms.numMembers();
        assert.equal(memberCount, 1);
    });

    it('should have no books by default', async function() {
        let bookCount = await lms.numBooks();
        assert.equal(bookCount, 0);
    });

    describe('getOwnerDetails', function() {
        it('should provide owner details', async function() {
            let [name, account, status, timestamp] = await lms.getOwnerDetails();
            assert.equal(name, 'Lallan');
            assert.equal(account, web3.eth.coinbase);
            assert.equal(status.valueOf(), 0);
            assert.isAtMost(timestamp, Math.floor(Date.now() / 1000));
            assert.isAbove(timestamp, Math.floor(Date.now() / 1000) - 300);
        });
    });

    describe('addMember', function() {
        it('should not add an already added member', async function() {
            let memberCount = await lms.numMembers();
            assert.equal(memberCount.valueOf(), 1);
            await lms.addMember("John Doe", 0x0);
            await lms.addMember("John Doe", 0x0);
            memberCount = await lms.numMembers();
            assert.equal(memberCount.valueOf(), 2);
        });
        it('should not add the already added default member', async function() {
            await lms.addMember("Already added member", web3.eth.coinbase);
            let memberCount = await lms.numMembers();
            assert.equal(memberCount.valueOf(), 1);
        });
    });

    describe('getMemberDetails', function() {
        it('should provide member details', async function() {
            await lms.addMember("John Doe", 0x0);
            let [name, account, status, timestamp] = await lms.getMemberDetails(0x0);
            assert.equal(name, 'John Doe');
            assert.equal(account, 0x0);
            assert.equal(status.valueOf(), 0);
            assert.isAtMost(timestamp, Math.floor(Date.now() / 1000));
            assert.isAbove(timestamp, Math.floor(Date.now() / 1000) - 300);
        });
    });

    describe('removeMember', function() {
        it('should do nothing for non-existent members', async function() {
            await lms.removeMember(0x0);
        });
        it('should deactivate a member', async function() {
            await lms.removeMember(web3.eth.coinbase);
            let [name, account, status] = await lms.getOwnerDetails();
            assert.equal(name, 'Lallan');
            assert.equal(account, web3.eth.coinbase);
            assert.equal(status.valueOf(), 1);
        });
    });

    describe('addBook', function() {
        it('should add a book', async function() {
            await lms.addBook("title", "author", "publisher");
            let bookCount = await lms.numBooks();
            assert.equal(bookCount, 1);
            let [books, count] = await lms.getMyBooks();
            assert.equal(count, 1);
            let book = books.split('|')[0];
            let bookAttr = book.split(';');
            assert.equal(bookAttr[0], 'title');
            assert.equal(bookAttr[1], 'author');
            assert.equal(bookAttr[2], 'publisher');
            assert.equal(bookAttr[3], '0');
            assert.isAtMost(bookAttr[4], Math.floor(Date.now() / 1000));
            assert.isAbove(bookAttr[4], Math.floor(Date.now() / 1000) - 300);
            assert.equal(bookAttr[5], '0');
        });
        it('should not add a book for non-members', async function() {
            await lms.removeMember(web3.eth.coinbase);
            await expectThrow(lms.addBook("", "", ""));
        });
    });

    it.skip('should return two values', async function() {
//        let [a, b] = await lms.testing(3, 4);
//        assert.equal(a.valueOf(), 3);
//        assert.equal(b.valueOf(), 4);
        let asdf = await lms.testing(3, 4);
        assert.equal(asdf, "book;worm");
    });
});