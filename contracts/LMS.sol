pragma solidity ^0.4.0;

import "./strings.sol";
import "./StringLib.sol";
import "zeppelin/lifecycle/Killable.sol";

contract LMS is Killable {
    // In order to use the third-party strings library
    using strings for *;

    enum State {
        Available,
        Borrowed,
        Overdue,
        Lost,
        Removed
    }

    enum MemberStatus { Active, Inactive }

    struct Book {
        string title;
        string author;
        string publisher;
        address owner;
        State state;
        uint dateAdded;
        uint8 rating;
    }

    struct Member {
        string name;
        address account;
        MemberStatus status;
        uint dateAdded;
    }

    uint public numBooks;
    uint public numMembers;
    mapping (uint => Book) catalog;                 // index 0 to be kept free since 0 is default value
    mapping (uint => Member) members;               // index 0 to be kept free since 0 is default value
    mapping (address => uint) memberIndex;

    modifier onlyMember {
        bool member = false;
        for (uint i=1; i <= numMembers; i++) {
            if (msg.sender == members[i].account && members[i].status == MemberStatus.Active) {
                member = true;
                break;
            }
        }
        if (!member) {
            throw;
        } else {
            _;
        }
    }

    function LMS(string name) {
        // Owner is the first member of our library, at index 1 (NOT 0)
        members[++numMembers] = Member(name, owner, MemberStatus.Active, now);
        memberIndex[owner] = numMembers;
    }

    function testing(uint8 a1, uint8 a2) constant returns (string) {
//    function testing(uint8 a1, uint8 a2) constant returns (uint8, uint8) {
//    function testing(uint8 a1, uint8 a2) constant returns (uint8 b1, uint8 b2) {
//        b1 = a1;
//        b2 = a2;
//        return (a1, a2);
        var parts = new strings.slice[](2);
        parts[0] = "book".toSlice();
        parts[1] = "worm".toSlice();
        return ";".toSlice().join(parts);
    }

    function addMember(string name, address account) public onlyOwner {
        // Add or activate member
        var index = memberIndex[account];
        if (index != 0) {           // This is the reason index 0 is not used
            members[index].status = MemberStatus.Active;
            return;
        }
        members[++numMembers] = Member(name, account, MemberStatus.Active, now);
        memberIndex[account] = numMembers;
    }

    function removeMember(address account) public onlyOwner {
        // Deactivate member
        var index = memberIndex[account];
        if (index != 0) {
            members[index].status = MemberStatus.Inactive;
        }
    }

    function getOwnerDetails() constant returns (string, address, MemberStatus, uint) {
        return getMemberDetails(owner);
    }

    function getMemberDetails(address account) constant returns (string, address, MemberStatus, uint) {
        var i = memberIndex[account];
        return (members[i].name, members[i].account, members[i].status, members[i].dateAdded);
    }

    function addBook(string title, string author, string publisher) public onlyMember {
        catalog[++numBooks] = Book({
            title: title,
            publisher: publisher,
            author: author,
            owner: msg.sender,
            state: State.Available,
            dateAdded: now,
            rating: 0
        });
    }

    function getMyBooks() constant onlyMember returns (string bookString, uint8 count) {
        var parts = new strings.slice[](6);
        //Iterate over the entire catalog to find my books
        for (uint i = 1; i <= numBooks; i++) {
            if (catalog[i].owner == msg.sender) {
                parts[0] = catalog[i].title.toSlice();
                parts[1] = catalog[i].author.toSlice();
                parts[2] = catalog[i].publisher.toSlice();
                parts[3] = StringLib.uintToString(uint(catalog[i].state)).toSlice();
                parts[4] = StringLib.uintToString(catalog[i].dateAdded).toSlice();
                parts[5] = StringLib.uintToString(catalog[i].rating).toSlice();
                var book = ";".toSlice().join(parts);
                count++;
                if (bookString.toSlice().equals("".toSlice())) {
                    bookString = bookString.toSlice().concat(book.toSlice());
                } else {
                    bookString = book;
                }
            }
        }
    }

    function addMemberWithBooks(
        string name, 
        string speciallyConstructedBooksString, 
        string bookSeparator, 
        string fieldSeparator
    ) returns (string) {
        // TODO Write tests
        // Should be called by the prospective member themselves and NOT by anybody else on their
        // behalf.
        // Each book string should be separated from the other by the bookSeparator e.g. semi-colon
        // Within each book string, the three fields title, author and publisher should be 
        // separated by fieldSeparator e.g. pipe (|)
        // e.g. Ethereum|Ben Abner|CreateSpace Independent Publishing Platform
        // return speciallyConstructedBooksString;
        var s = speciallyConstructedBooksString.toSlice();
        var delim = bookSeparator.toSlice();
        // if (s.count(delim) < 2) {       // minimum 3 books required to use this functionality:D
        //     throw;  
        // }
        members[numMembers++] = Member(name, msg.sender, MemberStatus.Active, now);
        var books = new string[](s.count(delim));
        for(uint i = 0; i < books.length; i++) {
            var book = s.split(delim).toString().toSlice();
            var delim2 = fieldSeparator.toSlice();
            var title = book.split(delim2).toString();
            var author = book.split(delim2).toString();
            var publisher = book.toString();
            addBook(title, author, publisher);
        }
    }

}

