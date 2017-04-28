import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

const defaultState = {
  accounts: null,
  ownerDetails: null,
  error: null,
  loading: {
    accountsLoading: true,
    ownerDetailsLoading: true,
    allbooksloading: true,
    myBooksLoading: true,
    addBooksLoading: false,
    returnBooksLoading: false,
    borrowBooksLoading: false
  },
  books: {
    allBooks : [],
    filteredBooks : []  
  },
  myBooks: [],
  isBookAdded: null,
  isBookReturned: null,
  isBookBorrowed: null
}

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers)

export default store
