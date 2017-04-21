import {
  libraryReducer,
  loadingReducer,
  errorReducer,
  allBooksReducers,
  ownerDetailsReducer,
  myBooksReducers,
  addBookReducer,
  returnBookReducer,
  borrowBookReducer,
  rateBookReducer
} from '../../../reducers/libraryReducer'

describe('Reducers', () => {
  describe('libraryReducer', () => {
    it('should return initial state', () => {
      expect(libraryReducer(undefined, {})).toEqual([])
    })
    it('should handle GET_ACCOUNTS_SUCCESS', () => {
      expect(
        libraryReducer(undefined, {
          type: 'GET_ACCOUNTS_SUCCESS',
          payload: [
            '0xb'
          ]
        })).toEqual(['0xb'])
    })
  })
  describe('loadingReducer', () => {
    it('should return initial state', () => {
      expect(loadingReducer(undefined, {})).toEqual({})
    })
    it('should handle GET_ACCOUNTS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_ACCOUNTS_LOADING',
          payload: true
        })).toEqual({ 'accountsLoading' : true })
    })
    it('should handle GET_OWNERDETAILS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_OWNERDETAILS_LOADING',
          payload: true
        })).toEqual({ 'ownerDetailsLoading' : true })
    })
    it('should handle GET_ALL_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_ALL_BOOKS_LOADING',
          payload: true
        })).toEqual({ 'allbooksloading' : true })
    })
    it('should handle GET_MY_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_MY_BOOKS_LOADING',
          payload: true
        })).toEqual({ 'myBooksLoading' : true })
    })
    it('should handle GET_ADD_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_ADD_BOOKS_LOADING',
          payload: true
        })).toEqual({ 'addBooksLoading' : true })
    })
    it('should handle GET_BORROW_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_BORROW_BOOKS_LOADING',
          payload: true
        })).toEqual({ 'borrowBooksLoading' : true })
    })
    it('should handle GET_RETURN_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_RETURN_BOOKS_LOADING',
          payload: true
        })).toEqual({ 'returnBooksLoading' : true })
    })
    it('should handle RATE_BOOK_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'RATE_BOOK_LOADING',
          payload: true
        })).toEqual({ 'rateBookLoading' : true })
    })
  })
  describe('errorReducer', () => {
    it('should return initial state', () => {
      expect(errorReducer(undefined, {})).toEqual([])
    })
    it('should handle GET_ACCOUNTS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_ACCOUNTS_ERROR',
          payload: 'ERROR'
        })).toEqual('ERROR')
    })
    it('should handle GET_OWNERDETAILS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_OWNERDETAILS_ERROR',
          payload: 'ERROR'
        })).toEqual('ERROR')
    })
    it('should handle GET_ALL_BOOKS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_ALL_BOOKS_ERROR',
          payload: 'ERROR'
        })).toEqual('ERROR')
    })
    it('should handle GET_MY_BOOKS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_MY_BOOKS_ERROR',
          payload: 'ERROR'
        })).toEqual('ERROR')
    })
    it('should handle GET_ADD_BOOKS_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'GET_ADD_BOOKS_ERROR',
          payload: 'ERROR'
        })).toEqual('ERROR')
    })
    it('should handle RATE_BOOK_ERROR', () => {
      expect(
        errorReducer(undefined, {
          type: 'RATE_BOOK_ERROR',
          payload: 'ERROR'
        })).toEqual('ERROR')
    })
  })
  describe('ownerDetailsReducer', () => {
    it('should return initial state', () => {
      expect(ownerDetailsReducer(undefined, {})).toEqual({})
    })
    it('should handle GET_OWNERDETAILS_SUCCESS', () => {
      expect(
        ownerDetailsReducer(undefined, {
          type: 'GET_OWNERDETAILS_SUCCESS',
          payload: [
            'Owner',
            'account',
            'status',
            'dateAdded'
          ]
        })).toEqual({
          'name' : 'Owner',
          'account' : 'account',
          'status' : 'status',
          'dateAdded' : 'dateAdded'
        })
    })
  })
  describe('allBooksReducers', () => {
    let books;
    beforeEach(() => {
      books = [{
        'id': '1',
        'title': 'Title',
        'author': 'Author',
        'publisher': 'Publisher',
        'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
        'borrower': '0x0000000000000000000000000000000000000000',
        'state': '0',
        'dateAdded': '1493054441',
        'dateIssued': '0'
      }]
      Date.now = jest.fn(() => '1493054441')
    })

    it('should return initial state', () => {
      expect(allBooksReducers(undefined, {})).toEqual([])
    })
    it('should handle GET_ALL_BOOKS_SUCCESS', () => {
      expect(
        allBooksReducers(undefined, {
          type: 'GET_ALL_BOOKS_SUCCESS',
          payload: [
            '1;Title;Author;Publisher;ba21a9b09d528b2e1726d786a1d1b861032dba87;0000000000000000000000000000000000000000;0;1493054441;0'
          ]
        })).toEqual({
          allBooks : books
        })
    })
    it('should handle SEARCH_BOOK', () => {
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'SEARCH_BOOK',
          payload: 'Title'
        })).toEqual({
          allBooks : books,
         filteredBooks : books,
         value: 'Title'
        })
    })
    it('should handle GET_RATE_BOOK_SUCCESS when reviewer is not present', () => {
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'GET_RATE_BOOK_SUCCESS',
          payload: {
            'bookId': '1',
            'reviewer': '0xeeffa82fb768e9057d7967f672a3d0a6116d2528',
            'rating': 3,
            'comments': 'Awesome',
            'timestamp': '1494410074'
          }
        })).toEqual({
          allBooks : [{
            'id': '1',
            'title': 'Title',
            'author': 'Author',
            'publisher': 'Publisher',
            'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
            'borrower': '0x0000000000000000000000000000000000000000',
            'state': '0',
            'dateAdded': '1493054441',
            'dateIssued': '0',
            'reviewers': ['0xeeffa82fb768e9057d7967f672a3d0a6116d2528'],
            'ratings': [3],
            'rating': 3,
            'totalRating': 3
          }]
        })
    })
    it('should handle GET_RATE_BOOK_SUCCESS when reviewer is already present', () => {
      books[0].reviewers = ['0xeeffa82fb768e9057d7967f672a3d0a6116d2528']
      books[0].ratings = [3]
      books[0].rating = 3
      books[0].totalRating = 3
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'GET_RATE_BOOK_SUCCESS',
          payload: {
            'bookId': '1',
            'reviewer': '0xeeffa82fb768e9057d7967f672a3d0a6116d2528',
            'rating': 3,
            'comments': 'Awesome',
            'timestamp': '1494410074'
          }
        })).toEqual({
          allBooks : books
        })
    })
    it('should handle GET_ADD_BOOKS_SUCCESS', () => {
      const book = {
        'title': 'Title',
        'author': 'Author',
        'publisher': 'Publisher',
        'owner': {
            'account': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
        },
        'imageUrl' : 'url',
        'description' : 'description',
        'genre' : 'genre'
      }
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'GET_ADD_BOOKS_SUCCESS',
          payload: book
        })).toEqual({
          allBooks : [
            ...books,
            {
              'id' : 2,
              'title' : book.title,
              'author' : book.author,
              'publisher' : book.publisher,
              'owner' : book.owner.account,
              'borrower' : '0x0',
              'state' : '0',
              'dateAdded' : '1493054441',
              'dateIssued' : '0',
              'imageUrl' : book.imageUrl,
              'description' : book.description,
              'genre' : book.genre
            }
          ]
        })
    })
    it('should handle GET_BORROW_BOOKS_SUCCESS', () => {
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'GET_BORROW_BOOKS_SUCCESS',
          payload: {
            book: books[0],
            owner: '0xba21a9b09d528b2e1726d786a1d1b861032dba87'
          }
        })).toEqual({
          allBooks : [{
            'id': '1',
            'title': 'Title',
            'author': 'Author',
            'publisher': 'Publisher',
            'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
            'borrower': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
            'state': '0',
            'dateAdded': '1493054441',
            'dateIssued': '1493054441'
          }]
        })
    })
    it('should handle GET_RETURN_BOOKS_SUCCESS', () => {
      expect(
        allBooksReducers({
          allBooks : books
        }, {
          type: 'GET_RETURN_BOOKS_SUCCESS',
          payload: books[0]
        })).toEqual({
          allBooks : [{
            'id': '1',
            'title': 'Title',
            'author': 'Author',
            'publisher': 'Publisher',
            'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
            'borrower': '0x0',
            'state': '0',
            'dateAdded': '1493054441',
            'dateIssued': '0'
          }]
        })
    })
  })
  describe('myBooksReducers', () => {
    it('should return initial state', () => {
      expect(myBooksReducers(undefined, {})).toEqual([])
    })
    it('should handle GET_MY_BOOKS_SUCCESS', () => {
      expect(
        myBooksReducers(undefined, {
          type: 'GET_MY_BOOKS_SUCCESS',
          payload: [
            '1;Title;Author;Publisher;ba21a9b09d528b2e1726d786a1d1b861032dba87;0000000000000000000000000000000000000000;0;1493054441;0'
          ]
        })).toEqual([{
          'id': '1',
          'title': 'Title',
          'author': 'Author',
          'publisher': 'Publisher',
          'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
          'borrower': '0x0000000000000000000000000000000000000000',
          'state': '0',
          'dateAdded': '1493054441',
          'dateIssued': '0'
        }])
    })
  })
  describe('myBooksReducers', () => {
    it('should return initial state', () => {
      expect(myBooksReducers(undefined, {})).toEqual([])
    })
    it('should handle GET_MY_BOOKS_SUCCESS', () => {
      expect(
        myBooksReducers(undefined, {
          type: 'GET_MY_BOOKS_SUCCESS',
          payload: [
            '1;Title;Author;Publisher;ba21a9b09d528b2e1726d786a1d1b861032dba87;0000000000000000000000000000000000000000;0;1493054441;0'
          ]
        })).toEqual([{
          'id': '1',
          'title': 'Title',
          'author': 'Author',
          'publisher': 'Publisher',
          'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
          'borrower': '0x0000000000000000000000000000000000000000',
          'state': '0',
          'dateAdded': '1493054441',
          'dateIssued': '0'
        }])
    })
  })
  describe('addBookReducer', () => {
    it('should return initial state', () => {
      expect(addBookReducer(undefined, {})).toEqual(false)
    })
    it('should handle GET_ADD_BOOKS_SUCCESS', () => {
      expect(
        addBookReducer(undefined, {
          type: 'GET_ADD_BOOKS_SUCCESS',
          payload: true
        })).toEqual(true)
    })
  })
  describe('returnBookReducer', () => {
    it('should return initial state', () => {
      expect(returnBookReducer(undefined, {})).toEqual(false)
    })
    it('should handle GET_RETURN_BOOKS_SUCCESS', () => {
      expect(
        returnBookReducer(undefined, {
          type: 'GET_RETURN_BOOKS_SUCCESS',
          payload: true
        })).toEqual(true)
    })
  })
  describe('borrowBookReducer', () => {
    it('should return initial state', () => {
      expect(borrowBookReducer(undefined, {})).toEqual(false)
    })
    it('should handle GET_BORROW_BOOKS_SUCCESS', () => {
      expect(
        borrowBookReducer(undefined, {
          type: 'GET_BORROW_BOOKS_SUCCESS',
          payload: true
        })).toEqual(true)
    })
  })
  describe('rateBookReducer', () => {
    it('should return initial state', () => {
      expect(rateBookReducer(undefined, {})).toEqual(false)
    })
    it('should handle RATE_BOOK_SUCCESS', () => {
      expect(
        rateBookReducer(undefined, {
          type: 'RATE_BOOK_SUCCESS',
          payload: true
        })).toEqual(true)
    })
  })
})
