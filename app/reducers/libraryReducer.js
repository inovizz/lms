export const libraryReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ACCOUNTS_SUCCESS':
      return action.payload
    default:
      return state
  }
}

export const loadingReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ACCOUNTS_LOADING':
      return action.payload
    case 'GET_OWNERDETAILS_LOADING':
      return action.payload
    case 'GET_ALL_BOOKS_LOADING':
      return action.payload
    default:
      return state
  }
}

export const errorReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ACCOUNTS_ERROR':
      return action.payload
    case 'GET_OWNERDETAILS_ERROR':
      return action.payload
    case 'GET_ALL_BOOKS_ERROR':
      return action.payload
    default:
      return state
  }
}

export const ownerDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_OWNERDETAILS_SUCCESS':
      return action.payload
    default:
      return state
  }
}

export const allBooksReducers = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_BOOKS_SUCCESS':
      return action.payload
    default:
      return state
  }
}
