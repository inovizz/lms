import { combineReducers } from 'redux'
import { libraryReducer, loadingReducer, errorReducer, allBooksReducers } from './libraryReducer'

const rootReducer = combineReducers({
  accounts: libraryReducer,
  loading: loadingReducer,
  error: errorReducer,
  books: allBooksReducers
})

export default rootReducer
