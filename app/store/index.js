import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { sessionService } from 'redux-react-session'

const defaultState = {
  accounts: null,
  error: null,
  loading: {
    accountsLoading: true,
    ownerDetailsLoading: true,
    allbooksloading: true,
    myBooksLoading: true,
    addBooksLoading: false,
    returnBooksLoading: false,
    borrowBooksLoading: false,
    rateBookLoading: false
  },
  books: {
    allBooks : [],
    filteredBooks : []
  },
  myBooks: [],
  isBookAdded: null,
  isBookReturned: null,
  isBookBorrowed: null,
  ratings: null
}

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, defaultState, enhancers)

sessionService.initSessionService(store)

export default store
