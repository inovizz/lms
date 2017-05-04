pragma solidity ^0.4.0;

contract Schema {

	enum State {
        Available,
        Borrowed,
        Overdue,
        Lost,
        Removed
    }

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
    }

    enum MemberStatus { Active, Inactive }
    
    struct Member {
        string name;
        address account;
        MemberStatus status;
        uint dateAdded;
    }

}