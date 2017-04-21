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
        })).toEqual({ "accountsLoading" : true })
    })
    it('should handle GET_OWNERDETAILS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_OWNERDETAILS_LOADING',
          payload: true
        })).toEqual({ "ownerDetailsLoading" : true })
    })
    it('should handle GET_ALL_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_ALL_BOOKS_LOADING',
          payload: true
        })).toEqual({ "allbooksloading" : true })
    })
    it('should handle GET_MY_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_MY_BOOKS_LOADING',
          payload: true
        })).toEqual({ "myBooksLoading" : true })
    })
    it('should handle GET_ADD_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_ADD_BOOKS_LOADING',
          payload: true
        })).toEqual({ "addBooksLoading" : true })
    })
    it('should handle GET_BORROW_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_BORROW_BOOKS_LOADING',
          payload: true
        })).toEqual({ "borrowBooksLoading" : true })
    })
    it('should handle GET_RETURN_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_RETURN_BOOKS_LOADING',
          payload: true
        })).toEqual({ "returnBooksLoading" : true })
    })
    it('should handle RATE_BOOK_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'RATE_BOOK_LOADING',
          payload: true
        })).toEqual({ "rateBookLoading" : true })
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
    let books = [{
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
         filteredBooks : books
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
