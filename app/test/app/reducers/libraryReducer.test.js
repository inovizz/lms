import { libraryReducer, loadingReducer, errorReducer, ownerDetailsReducer, allBooksReducers } from '../../../reducers/libraryReducer'

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
      expect(loadingReducer(undefined, {})).toEqual([])
    })
    it('should handle GET_ACCOUNTS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_ACCOUNTS_LOADING',
          payload: true
        })).toEqual(true)
    })
    it('should handle GET_OWNERDETAILS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_OWNERDETAILS_LOADING',
          payload: true
        })).toEqual(true)
    })
    it('should handle GET_ALL_BOOKS_LOADING', () => {
      expect(
        loadingReducer(undefined, {
          type: 'GET_ALL_BOOKS_LOADING',
          payload: true
        })).toEqual(true)
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
  })
  describe('ownerDetailsReducer', () => {
    it('should return initial state', () => {
      expect(ownerDetailsReducer(undefined, {})).toEqual([])
    })
    it('should handle GET_OWNERDETAILS_SUCCESS', () => {
      expect(
        ownerDetailsReducer(undefined, {
          type: 'GET_OWNERDETAILS_SUCCESS',
          payload: [
            '0xb'
          ]
        })).toEqual(['0xb'])
    })
  })
  describe('allBooksReducers', () => {
    it('should return initial state', () => {
      expect(allBooksReducers(undefined, {})).toEqual([])
    })
    it('should handle GET_ALL_BOOKS_SUCCESS', () => {
      expect(
        allBooksReducers(undefined, {
          type: 'GET_ALL_BOOKS_SUCCESS',
          payload: [
            '0xb'
          ]
        })).toEqual(['0xb'])
    })
  })
})
