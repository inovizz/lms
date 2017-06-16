// const baseAddress = 'http://localhost:8080/api/'
const baseAddress = '/api/'

const apiList = {
    create_account:         baseAddress + 'auth/create_account',
    members:                baseAddress + 'members',
    addmember:              baseAddress + 'members/addmember',
    removemember:           baseAddress + 'members/removemember',
    memberdetails:          baseAddress + 'members/memberdetails',
    numberofmembers:        baseAddress + 'members/numberofmembers',
    ownerdetails:           baseAddress + 'members/ownerdetails',
    books:                  baseAddress + 'books/', //Get Api
    book:                   baseAddress + 'books/book', //Get Api
    mybooks:                baseAddress + 'books/mybooks', //Get Api
    addbook:                baseAddress + 'books/addbook', 
    updatebook:             baseAddress + 'books/updatebook',
    borrowbook:             baseAddress + 'books/borrowbook',
    returnbook:             baseAddress + 'books/returnbook',
    ratebook:               baseAddress + 'books/ratebook',
    searchbook:             baseAddress + 'books/searchbook',
}

export default apiList;