import { combineReducers } from 'redux'
import { libraryReducer, loadingReducer, errorReducer, allBooksReducers, ownerDetailsReducer } from './libraryReducer'

const rootReducer = combineReducers({
  accounts: libraryReducer,
  ownerDetails : ownerDetailsReducer,
  loading: loadingReducer,
  error: errorReducer,
  books: allBooksReducers
})

export default rootReducer
