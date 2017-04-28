import { combineReducers } from 'redux'
import {
  libraryReducer,
  loadingReducer,
  errorReducer,
  allBooksReducers,
  ownerDetailsReducer,
  myBooksReducers,
  addBookReducer,
  returnBookReducer,
  borrowBookReducer
} from './libraryReducer'

const rootReducer = combineReducers({
  accounts: libraryReducer,
  ownerDetails : ownerDetailsReducer,
  loading: loadingReducer,
  error: errorReducer,
  books: allBooksReducers,
  myBooks : myBooksReducers,
  isBookAdded : addBookReducer,
  isBookReturned : returnBookReducer,
  isBookBorrowed : borrowBookReducer
})

export default rootReducer
