import contractConfig from '../config'
import { web3, lms } from '../web3'
import actionType from './actionTypes'
import { sessionService } from 'redux-react-session'
import axios from 'axios'
import NotificationType from '../components/notifications/NotificationTypes'

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
        dispatch(action(actionType.GET_ACCOUNTS_ERROR, NotificationType.SHOW_ACCOUNTS_ERROR))
      }
      dispatch(action(actionType.GET_ACCOUNTS_SUCCESS, accs))
      dispatch(action(actionType.GET_ACCOUNTS_LOADING, false))
    })
  }
}

export const getOwnerDetails = (response) => {
  return (dispatch) => {
    dispatch(action(actionType.GET_OWNERDETAILS_LOADING, true))
    lms.getOwnerDetails.call().then((user) => {
      login(response, user)
      dispatch(action(actionType.GET_OWNERDETAILS_SUCCESS, user))
      dispatch(action(actionType.GET_OWNERDETAILS_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.GET_OWNERDETAILS_ERROR, NotificationType.SHOW_OWNERDETAILS_ERROR))
      dispatch(action(actionType.GET_OWNERDETAILS_LOADING, false))
    })
  }
}

export const getAllBooks = () => {
  return (dispatch) => {
    dispatch(action(actionType.GET_ALL_BOOKS_LOADING, true))
    lms.getAllBooks.call().then((books) => {
      getRatings(dispatch)
      dispatch(action(actionType.GET_ALL_BOOKS_SUCCESS, books))
      dispatch(action(actionType.GET_ALL_BOOKS_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.GET_ALL_BOOKS_ERROR, NotificationType.SHOW_ALL_BOOKS_ERROR))
      dispatch(action(actionType.GET_ALL_BOOKS_LOADING, false))
    })
  }
}

export const getMyBooks = () => {
  return (dispatch) => {
    dispatch(action(actionType.GET_MY_BOOKS_LOADING, true))
    lms.getMyBooks.call().then((books) => {
      dispatch(action(actionType.GET_MY_BOOKS_SUCCESS, books))
      dispatch(action(actionType.GET_MY_BOOKS_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.GET_MY_BOOKS_ERROR, NotificationType.SHOW_MY_BOOKS_ERROR))
      dispatch(action(actionType.GET_MY_BOOKS_LOADING, false))
    })
  }
}

export const addBook = (book) => {
  return (dispatch) => {
    dispatch(action(actionType.GET_ADD_BOOKS_LOADING, true))
    lms.addBook(
        book.title,
        book.author,
        book.publisher,
        book.imageUrl,
        book.description,
        book.genre,
        {
          from: book.owner.account,
          gas: 600000
        }
      ).then((response) => {
      dispatch(action(actionType.GET_ADD_BOOKS_SUCCESS, book))
      dispatch(action(actionType.GET_ADD_BOOKS_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.GET_ADD_BOOKS_ERROR, NotificationType.SHOW_ADD_BOOKS_ERROR))
      dispatch(action(actionType.GET_ADD_BOOKS_LOADING, false))
    })
  }
}

export const returnBook = (book) => {
  return (dispatch) => {
    dispatch(action(actionType.GET_RETURN_BOOKS_LOADING, true))
    lms.returnBook(book.id, { from : book.owner, gas: 200000 }).then((response) => {
      dispatch(action(actionType.GET_RETURN_BOOKS_SUCCESS, book))
    }).catch((e) => {
      dispatch(action(actionType.GET_RETURN_BOOKS_ERROR, NotificationType.SHOW_GET_RETURN_BOOKS_ERROR))
    }).then(() => {
      dispatch(action(actionType.GET_RETURN_BOOKS_LOADING, false))
    })
  }
}

export const borrowBook = (book, ownerDetails) => {
  return (dispatch) => {
    dispatch(action(actionType.GET_BORROW_BOOKS_LOADING, true))
    lms.borrowBook(book.id, { from: ownerDetails.account, value: web3.toWei(0.1), gas: 200000 }).then((response) => {
      dispatch(action(actionType.GET_BORROW_BOOKS_SUCCESS, { book, owner: ownerDetails.account }))
    }).catch((e) => {
      dispatch(action(actionType.GET_BORROW_BOOKS_ERROR, NotificationType.SHOW_GET_BORROW_BOOKS_ERROR))
    }).then(() => {
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
    lms.rateBook(book.id, rating, comment,'0', {
        from: ownerDetails.account,
        gas: 300000
      }).then((response) => {
      dispatch(action(actionType.GET_RATE_BOOK_SUCCESS, {
        bookId: book.id,
        rating: rating,
        reviewer: ownerDetails.account,
      }))
      dispatch(action(actionType.RATE_BOOK_LOADING, false))
    }).catch((e) => {
      dispatch(action(actionType.RATE_BOOK_ERROR, NotificationType.SHOW_GET_RATE_BOOK_ERROR))
      dispatch(action(actionType.RATE_BOOK_LOADING, false))
    })
  }
}

export const login = (response, userVal) => {
  sessionService.saveSession(response)
  .then(() => {
    const user = {
      'name' : userVal[0],
      'account' : userVal[1],
      'status' : userVal[2],
      'dateAdded' : userVal[3],
      'body': response
    }
    sessionService.saveUser(user)
  }).catch(err => console.error(err))
}

export const logout = () => {
  return () => {
    sessionService.deleteSession()
    sessionService.deleteUser()
    if(window.gapi) {
        window.gapi.auth2.getAuthInstance().disconnect()
    }
  }
}

export const getMemberDetailsByEmail = (response) => {
  return (dispatch) => {
    dispatch(action(actionType.GET_MEMBER_DETAILS_EMAIL_LOADING, true))
    lms.getMemberDetailsByEmail(response.profileObj.email).then((user) => {
      login(response, user)
      dispatch(action(actionType.GET_MEMBER_DETAILS_EMAIL_SUCCESS, user))
    }).catch((e) => {
      dispatch(action(actionType.GET_MEMBER_DETAILS_EMAIL_ERROR, NotificationType.SHOW_GET_MEMBER_DETAILS_EMAIL_ERROR))
    }).then(() => {
      dispatch(action(actionType.GET_MEMBER_DETAILS_EMAIL_LOADING, false))
    })
  }
}

export const getRatings = (dispatch) => {
  dispatch(action(actionType.GET_RATE_BOOK_LOADING, true))
  var rateEvent = lms.Rate({}, {
    fromBlock: 0,
    toBlock: 'latest'
  });
  rateEvent.watch(function(err, result) {
    rateEvent.stopWatching();
    if (err) {
      dispatch(action(actionType.GET_RATE_BOOK_ERROR, NotificationType.SHOW_GET_RATE_BOOK_ERROR))
    } else {
      dispatch(action(actionType.GET_RATE_BOOK_SUCCESS, result.args))
    }
    dispatch(action(actionType.GET_RATE_BOOK_LOADING, false))
  });
}

export const createAccount = (session,password) => {
  return (dispatch) => {
    dispatch(action(actionType.CREATE_ACCOUNT_LOADING, true))
    const request = {
      "jsonrpc":"2.0",
      "method":"personal_newAccount",
      "params":[password],
      "id":74
    }
    return axios.post('/api/create_account',request)
            .then((response) => {
              addMember([
                session.user.body.profileObj.name,
                response.data.data.result,
                session.user.body.profileObj.email,
                password,
              ], dispatch, session.user.body)
            })
            .catch((error) => {
              dispatch(action(actionType.CREATE_ACCOUNT_ERROR, NotificationType.SHOW_CREATE_ACCOUNT_ERROR))
            }).then(() => {
              dispatch(action(actionType.CREATE_ACCOUNT_LOADING, false))
            });
  };
}

export const addMember = (member, dispatch, session) => {
  dispatch(action(actionType.ADD_MEMBER_LOADING, true))
  if(web3.personal.unlockAccount(member[1],member[3],0)) {
    lms.addMember(member[0], member[1], member[2], member[3], {
            from: web3.eth.accounts[0],
            gas: 600000
          }).then((response) => {
          login(session, member)
          web3.eth.sendTransaction({
            from: web3.eth.accounts[0],
            to: member[1],
            value: web3.toWei(1000)
          })
        }).catch((err) => {
          logout()
          dispatch(action(actionType.ADD_MEMBER_ERROR, NotificationType.SHOW_ADD_MEMBER_ERROR))
        }).then(() => {
          dispatch(action(actionType.ADD_MEMBER_LOADING, false))
        })
  }
}
