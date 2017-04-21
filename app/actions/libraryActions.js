import contractConfig from '../config'
import { web as web3, lms as LMS } from '../web3'
import actionType from './actionTypes'
import { sessionService } from 'redux-react-session'

export const action = (type, flag) => {
  return {
    type: type,
    payload: flag
  }
}

export const getAccounts = () => {
  return (dispatch) => {
    dispatch(action(actionType.GET_ACCOUNTS_LOADING, true))
    web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        dispatch(action(actionType.GET_ACCOUNTS_ERROR, err))
      }
      dispatch(action(actionType.GET_ACCOUNTS_SUCCESS, accs))
      dispatch(action(actionType.GET_ACCOUNTS_LOADING, false))
    })
  }
}

export const getOwnerDetails = (response) => {
  return (dispatch) => {
    dispatch(action(actionType.GET_OWNERDETAILS_LOADING, true))
    LMS.at(contractConfig.id).then((instance) => {
      return instance.getOwnerDetails.call()
    }).then((user) => {
      login(response, user)
      dispatch(action(actionType.GET_OWNERDETAILS_SUCCESS, user))
      dispatch(action(actionType.GET_OWNERDETAILS_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.GET_OWNERDETAILS_ERROR, e))
      dispatch(action(actionType.GET_OWNERDETAILS_LOADING, false))
    })
  }
}

export const getAllBooks = () => {
  return (dispatch) => {
    dispatch(action(actionType.GET_ALL_BOOKS_LOADING, true))
    LMS.at(contractConfig.id).then((instance) => {
      return instance.getAllBooks.call()
    }).then((books) => {
      dispatch(action(actionType.GET_ALL_BOOKS_SUCCESS, books))
      dispatch(action(actionType.GET_ALL_BOOKS_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.GET_ALL_BOOKS_ERROR, e))
      dispatch(action(actionType.GET_ALL_BOOKS_LOADING, false))
    })
  }
}

export const getMyBooks = () => {
  return (dispatch) => {
    dispatch(action(actionType.GET_MY_BOOKS_LOADING, true))
    LMS.at(contractConfig.id).then((instance) => {
      return instance.getMyBooks.call()
    }).then((books) => {
      dispatch(action(actionType.GET_MY_BOOKS_SUCCESS, books))
      dispatch(action(actionType.GET_MY_BOOKS_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.GET_MY_BOOKS_ERROR, e))
      dispatch(action(actionType.GET_MY_BOOKS_LOADING, false))
    })
  }
}

export const addBook = (title, author, publisher, imageUrl, description, genre) => {
  return (dispatch) => {
    dispatch(action(actionType.GET_ADD_BOOKS_LOADING, true))
    LMS.at(contractConfig.id).then((instance) => {
      return instance.addBook(
        title,
        author,
        publisher,
        imageUrl,
        description,
        genre,
        {
          from: web3.eth.accounts[0],
          gas: 600000
        }
      )
    }).then((response) => {
      dispatch(getMyBooks())
      dispatch(action(actionType.GET_ADD_BOOKS_SUCCESS, true))
      dispatch(action(actionType.GET_ADD_BOOKS_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.GET_ADD_BOOKS_ERROR, e))
      dispatch(action(actionType.GET_ADD_BOOKS_LOADING, false))
    })
  }
}

export const returnBook = (book) => {
  return (dispatch) => {
    dispatch(action(actionType.GET_RETURN_BOOKS_LOADING, true))
    LMS.at(contractConfig.id).then((instance) => {
      return instance.returnBook(book.id, { from : book.owner, gas: 200000 })
    }).then((response) => {
      dispatch(getMyBooks())
      dispatch(action(actionType.GET_RETURN_BOOKS_SUCCESS, true))
      dispatch(action(actionType.GET_RETURN_BOOKS_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.GET_RETURN_BOOKS_ERROR, e))
      dispatch(action(actionType.GET_RETURN_BOOKS_LOADING, false))
    })
  }
}

export const borrowBook = (book, ownerDetails) => {
  return (dispatch) => {
    dispatch(action(actionType.GET_BORROW_BOOKS_LOADING, true))
    LMS.at(contractConfig.id).then((instance) => {
      return instance.borrowBook(book.id, { from: ownerDetails.account, value: web3.toWei(0.1), gas: 200000 })
    }).then((response) => {
      dispatch(getMyBooks())
      dispatch(action(actionType.GET_BORROW_BOOKS_SUCCESS, true))
      dispatch(action(actionType.GET_BORROW_BOOKS_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.GET_BORROW_BOOKS_ERROR, e))
      dispatch(action(actionType.GET_BORROW_BOOKS_LOADING, false))
    })
  }
}

export const searchBook = (book) => {
  return action(actionType.SEARCH_BOOK, book)
}

export const rateBook = (rating, comment, book, ownerDetails) => {
  return (dispatch) => {
    dispatch(action(actionType.RATE_BOOK_LOADING, true))
    LMS.at(contractConfig.id).then((instance) => {
      return instance.rateBook(book.id, rating, comment, {
        from: ownerDetails.account,
        gas: 300000
      })
    }).then((response) => {
      dispatch(action(actionType.RATE_BOOK_SUCCESS, true))
      dispatch(action(actionType.RATE_BOOK_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.RATE_BOOK_ERROR, e))
      dispatch(action(actionType.RATE_BOOK_LOADING, false))
    })
  }
}

export const login = (response, userVal) => {
  sessionService.saveSession(response.accessToken)
  .then(() => {
    const user = {
      'name' : userVal[0],
      'account' : userVal[1],
      'status' : userVal[2],
      'dateAdded' : userVal[3]
    }
    sessionService.saveUser(user)
  }).catch(err => console.error(err))
}

export const logout = () => {
  return () => {
    sessionService.deleteSession()
    sessionService.deleteUser()
  }
}
