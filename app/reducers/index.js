import {
  combineReducers
} from 'redux'
import {
  libraryReducer,
  loadingReducer,
  errorReducer,
  allBooksReducers,
  myBooksReducers
} from './libraryReducer'
import { sessionReducer } from 'redux-react-session'

const rootReducer = combineReducers({
  accounts: libraryReducer,
  loading: loadingReducer,
  error: errorReducer,
  books: allBooksReducers,
  myBooks: myBooksReducers,
  session: sessionReducer
})

export default rootReducer
