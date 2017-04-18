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
        uint id;
        string title;
        string author;
        string publisher;
        address owner;
        address borrower;
        State state;
        uint dateAdded;
        uint dateIssued;
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
        ++numBooks;
        catalog[numBooks] = Book({
            id: numBooks,
            title: title,
            publisher: publisher,
            author: author,
            borrower: 0x0,
            owner: msg.sender,
            state: State.Available,
            dateAdded: now,
            dateIssued: 0,
            rating: 0
        });
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

    function getBook(uint i) constant returns (string bookString) {
        var parts = new strings.slice[](10);
        //Iterate over the entire catalog to find my books
        parts[0] = StringLib.uintToString(catalog[i].id).toSlice();
        parts[1] = catalog[i].title.toSlice();
        parts[2] = catalog[i].author.toSlice();
        parts[3] = catalog[i].publisher.toSlice();
        parts[4] = StringLib.addressToString(catalog[i].owner).toSlice();
        parts[5] = StringLib.addressToString(catalog[i].borrower).toSlice();
        parts[6] = StringLib.uintToString(uint(catalog[i].state)).toSlice();
        parts[7] = StringLib.uintToString(catalog[i].dateAdded).toSlice();
        parts[8] = StringLib.uintToString(catalog[i].dateIssued).toSlice();
        parts[9] = StringLib.uintToString(catalog[i].rating).toSlice();
        bookString = ";".toSlice().join(parts);
    }

    function getBooks(bool ownerFilter) constant onlyMember returns (string bookString, uint8 count) {
        string memory book;
        //Iterate over the entire catalog to find my books
        for (uint i = 1; i <= numBooks; i++) {
            if (!ownerFilter || catalog[i].owner == msg.sender) {
                book = getBook(i);
                count++;
                if (bookString.toSlice().equals("".toSlice())) {
                    bookString = book;
                } else {
                    bookString = bookString.toSlice().concat('|'.toSlice()).toSlice().concat(book.toSlice());
                }
            }
        }
    }

    function getMyBooks() constant onlyMember returns (string bookString, uint8 count) {
        return getBooks(true);
    }

    function getAllBooks() constant onlyMember returns (string bookString, uint8 count) {
        return getBooks(false);
    }

    function borrowBook(uint id) onlyMember {
        // Can't borrow a non-existent book
        if (id > numBooks || catalog[id].state != State.Available) {
            throw;
        }
        catalog[id].borrower = msg.sender;
        catalog[id].dateIssued = now;
        catalog[id].state = State.Borrowed;
    }

    function returnBook(uint id) onlyMember {
        if (id > numBooks || catalog[id].state == State.Available || catalog[id].owner != msg.sender) {
            throw;
        }
        catalog[id].borrower = 0x0;
        catalog[id].dateIssued = 0;
        catalog[id].state = State.Available;
    }
}

