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
        string imgUrl;
        string description;
        string genre;
        uint avgRating;
        uint totalRating;
        uint reviewersCount;
    }

    struct Member {
        string name;
        address account;
        string email;
        MemberStatus status;
        uint dateAdded;
    }

    uint public numBooks;
    uint public numMembers;
    mapping (uint => Book) catalog;                 // index 0 to be kept free since 0 is default value
    mapping (uint => Member) members;               // index 0 to be kept free since 0 is default value
    mapping (address => uint) memberIndex;
    mapping (string => uint) emailIndex;

    event Borrow(uint indexed bookId, address indexed borrower, uint timestamp);
    event Return(uint indexed bookId, address indexed borrower, uint timestamp);
    event Rate(uint indexed bookId, address indexed reviewer, uint indexed rating, string comments, uint timestamp);

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

    function LMS(string name, string email) payable {
        // Owner is the first member of our library, at index 1 (NOT 0)
        members[++numMembers] = Member(name, owner, email, MemberStatus.Active, now);
        memberIndex[owner] = numMembers;
        emailIndex[email] = numMembers;
    }

    function addMember(string name, address account, string email) public onlyOwner {
        // Add or activate member
        var index = memberIndex[account];
        if (index != 0) {           // This is the reason index 0 is not used
            members[index].status = MemberStatus.Active;
            return;
        }
        members[++numMembers] = Member(name, account, email, MemberStatus.Active, now);
        memberIndex[account] = numMembers;
        emailIndex[email] = numMembers;
    }

    function getMemberDetailsByEmail(string email) constant returns (string, address, string, MemberStatus, uint) {
        var i = emailIndex[email];
        if(i != 0) {
            return (members[i].name, members[i].account, members[i].email, members[i].status, members[i].dateAdded);
        }
    }


    function removeMember(address account) public onlyOwner {
        // Deactivate member
        var index = memberIndex[account];
        if (index != 0) {
            members[index].status = MemberStatus.Inactive;
        }
    }

    function getOwnerDetails() constant returns (string, address, string, MemberStatus, uint) {
        return getMemberDetailsByAccount(owner);
    }

    function getMemberDetailsByAccount(address account) constant returns (string, address, string, MemberStatus, uint) {
        var i = memberIndex[account];
        if(i != 0) {
            return (members[i].name, members[i].account, members[i].email, members[i].status, members[i].dateAdded);
        }
    }

    function addBook(string title, string author, string publisher, string imgUrl, string description, string genre) public onlyMember {
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
            imgUrl: imgUrl,
            description: description,
            genre: genre,
            avgRating: 0,
            reviewersCount: 0,
            totalRating: 0
        });
        if (this.balance < 10**12) {
            throw;
        }
        if(!catalog[numBooks].owner.send(10**12)) {
            throw;
        }
    }

    function getBook(uint i) constant returns (string bookString) {
        var parts = new strings.slice[](15);
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
        parts[9] = catalog[i].imgUrl.toSlice();
        parts[10] = catalog[i].description.toSlice();
        parts[11] = catalog[i].genre.toSlice();
        parts[12] = StringLib.uintToString(catalog[i].avgRating).toSlice();
        parts[13] = StringLib.uintToString(catalog[i].totalRating).toSlice();
        parts[14] = StringLib.uintToString(catalog[i].reviewersCount).toSlice();
        bookString = ";".toSlice().join(parts);
    }

    function getBooks(bool ownerFilter) constant onlyMember returns (string bookString, uint8 count) {
        string memory book;
        //Iterate over the entire catalog to find my books
        for (uint i = 1; i <= numBooks; i++) {
            if (!ownerFilter || catalog[i].owner == msg.sender || catalog[i].borrower == msg.sender) {
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

    function borrowBook(uint id) onlyMember payable {
        // Can't borrow book if passed value is not sufficient
        if (msg.value < 10**12) {
            throw;
        }
        // Can't borrow a non-existent book
        if (id > numBooks || catalog[id].state != State.Available) {
            throw;
        }
        catalog[id].borrower = msg.sender;
        catalog[id].dateIssued = now;
        catalog[id].state = State.Borrowed;
        // 50% value is shared with the owner
        var owner_share = msg.value/2; 
        if (!catalog[id].owner.send(owner_share)) {
            throw;
        }
        Borrow(id, msg.sender, catalog[id].dateIssued);
    }

    function returnBook(uint id) onlyMember {
        address borrower;
        if (id > numBooks || catalog[id].state == State.Available || catalog[id].owner != msg.sender) {
            throw;
        }
        borrower = catalog[id].borrower;
        catalog[id].borrower = 0x0;
        catalog[id].dateIssued = 0;
        catalog[id].state = State.Available;
        Return(id, borrower, now);
    }

    function rateBook(uint id, uint rating, string comments, uint oldrating) onlyMember {
        if (id > numBooks || rating < 1 || rating > 5) {
            throw;
        }
        uint change = rating - oldrating;
        if (oldrating == 0) {
            catalog[id].reviewersCount += 1;
            catalog[id].totalRating += change;
            catalog[id].avgRating = catalog[id].totalRating / catalog[id].reviewersCount;
        }
        else {
            catalog[id].totalRating += change;
            catalog[id].avgRating = catalog[id].totalRating / catalog[id].reviewersCount;
        }

        // All reviews are logged. Applications are responsible for eliminating duplicate ratings
        // and computing average rating.
        Rate(id, msg.sender, rating, comments, now);
    }
}