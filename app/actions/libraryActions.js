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
        console.log("Error Occured",err)
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
      console.log("Error Occured",e)
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
      console.log("Error Occured",e)
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
      console.log("Error Occured",e)
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
      console.log("Error Occured",e)
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
      console.log("Error Occured",e)
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
      console.log("Error Occured",e)
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
      console.log("Error Occured",e)
      dispatch(action(actionType.RATE_BOOK_ERROR, NotificationType.SHOW_GET_RATE_BOOK_ERROR))
      dispatch(action(actionType.RATE_BOOK_LOADING, false))
    })
  }
}

export const login = (response, userVal) => {
  return (dispatch) => {
    sessionService.saveSession(response)
    .then(() => {
      const user = {
        'name' : userVal[0],
        'account' : userVal[1],
        'email' : userVal[2]
      }
      sessionService.saveUser(user)
    }).catch(err => console.error(err))
  }
}

export const logout = () => {
  return (dispatch) => {
    sessionService.deleteSession()
    sessionService.deleteUser()
    if(window.gapi) {
        window.gapi.auth2.getAuthInstance().disconnect()
    }
    dispatch(action("LOGOUT",[]))
  }
}

export const getMemberDetailsByEmail = (response) => {
  return (dispatch) => {
    dispatch(action(actionType.GET_MEMBER_DETAILS_EMAIL_LOADING, true))
    lms.getMemberDetailsByEmail(response.profileObj.email).then((user) => {
      dispatch(action(actionType.GET_MEMBER_DETAILS_EMAIL_SUCCESS, { session: response, user }))
    }).catch((e) => {
      console.log("Error Occured",e)
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
      console.log("Error Occured",err)
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
              const user = [
                session.profileObj.name,
                response.data.data.result,
                session.profileObj.email
              ];
              dispatch(unlockAccount(session, user, password, true))
            })
            .catch((error) => {
              console.log("Error Occured",error)
              dispatch(action(actionType.CREATE_ACCOUNT_ERROR, NotificationType.SHOW_CREATE_ACCOUNT_ERROR))
            }).then(() => {
              dispatch(action(actionType.CREATE_ACCOUNT_LOADING, false))
            });
  };
}

export const addMember = (member) => {
  return (dispatch) => {
    dispatch(action(actionType.ADD_MEMBER_LOADING, true))
    lms.addMember(member[0], member[1], member[2], {
            from: web3.eth.accounts[0],
            gas: 600000
          }).then((response) => {
          web3.eth.sendTransaction({
            from: web3.eth.accounts[0],
            to: member[1],
            value: web3.toWei(1000)
          })
          dispatch(action(actionType.ADD_MEMBER_SUCCESS, true))
        }).catch((err) => {
          console.log("Error Occured",err)
          dispatch(action(actionType.ADD_MEMBER_ERROR, NotificationType.SHOW_ADD_MEMBER_ERROR))
        }).then(() => {
          dispatch(action(actionType.ADD_MEMBER_LOADING, false))
        })
  }
}

export const unlockAccount = (session, user, password, flag) => {
  return (dispatch) => {
    dispatch(action('UNLOCK_ACCOUNT_START'),true)
    if(web3.personal.unlockAccount(user[1], password, 0)) {
      if(flag) {
        dispatch(addMember(user))
      }
      dispatch(login(session, user))
    }
    dispatch(action('UNLOCK_ACCOUNT_END'),true)
  }
}
