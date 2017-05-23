import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Book from './Book'
import Header from './Header'
import Banner from './Banner'
import SearchBook from './SearchBook'
import Modal from 'react-modal'
import LMSAuth from './LMSAuth'
import Loader from './Loader'
import NotifyMe from './notifications/NotifyMe'

const style = {
  marginTop : '15px'
}

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '30%',
    transform             : 'translate(-50%, -50%)'
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books,
    ownerDetails: state.session.user,
    filteredBooks: state.filteredBooks,
    loading: state.loading,
    session: state.session,
    error: state.error,
    isExistingMember: state.isExistingMember,
    accounts: state.accounts
  }
}

export class BooksPage extends React.Component {
  constructor (props) {
    super(props)
    this.searchVal = ''
    this.state = {
      rateModalIsOpen: false,
      authModalIsOpen: !this.props.isExistingMember.user,
      book: {}
    }
  }
  componentDidMount () {
    // disabling the Loader screen screen
    const loader = document.getElementById('loader')
    if (loader) {
      loader.style.display = 'none'
    }
    if(!this.props.books.allBooks.length) {
        this.props.getAllBooks()
    }
  }
  componentWillReceiveProps (nextProps) {
    if(!nextProps.isExistingMember.user) {
      this.setState({
        authModalIsOpen: true
      })
    }
    if(nextProps.session.authenticated && nextProps.session.user.account) {
      if(!nextProps.accounts) {
        this.props.getBalance(nextProps.session.user)
      }
      if(nextProps.isExistingMember.callbackFn) {
        nextProps.isExistingMember.callbackFn.call(this, nextProps.isExistingMember.book, nextProps.session.user)
      }
    }
  }
  toggleModal (modal, book) {
    switch (modal) {
      case 'rateBook' : {
        this.setState({ rateModalIsOpen: !this.state.rateModalIsOpen, book })
        break;
      }
      case 'authModal' : {
        this.setState({ authModalIsOpen: !this.state.authModalIsOpen })
      }
    }
  }
  loginFailure (response) {
    console.log(response)
  }
  signIn (password) {
    const { session, user } = this.props.isExistingMember
    this.props.unlockAccount(session, user, password)
  }
  renderLoader (flag) {
    const title = this.props.loading.loginLoader
                  ? 'Validating User'
                  : (this.props.loading.createAccountLoader || this.props.loading.addMemberLoader)
                    ? 'Creating Account'
                    : this.props.loading.borrowBooksLoading
                    ? 'Borrowing book'
                    : this.props.loading.rateBookLoading
                      ? 'Submitting Rating'
                      : 'Loading Books'
    if(this.props.loading.loginLoader || (this.props.loading.createAccountLoader || this.props.loading.addMemberLoader) || flag || this.props.loading.borrowBooksLoading ||  this.props.loading.rateBookLoading) {
      return <Loader text={title} />
    }
  }
  render () {
    const books = this.props.books.value
                  ? this.props.books.filteredBooks.length
                    ? this.props.books.filteredBooks
                    : []
                  : (this.props.books.allBooks.length ? this.props.books.allBooks : [])
    return (
      <div>
        <Header
          loginSuccess = {
            (response) => {
              this.props.getMemberDetailsByEmail(response)
            }
          }
          loginFailure = {
            (response) => this.loginFailure(response)
          }
          session={ this.props.session }
          accounts={ this.props.accounts }
          logout = {
            () => this.props.logout()
          } />
        <Banner />
        {
          this.renderLoader()
        }
        <NotifyMe message={this.props.error}/>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7'>
              <ul className='nav navbar-nav'>
                <li>
                  <a href='#' className='active'>All Books</a>
                </li>
              </ul>
            </div>
            <div className='col-sm-4 col-sm-offset-1'>
              <SearchBook searchBook={this.props.searchBook} />
            </div>
          </div>
          {
            this.props.books.allBooks.length
            ? <Book loading = {
                this.props.loading
              }
              title = ''
              books = {
                books
              }
              ownerDetails = { this.props.ownerDetails }
              btnTitle = 'Borrow'
              btnFunction = {
                (book,ownerDetails) => this.props.borrowBook(book, ownerDetails)
              }
              rateBook = {
                (rating, comment) => this.props.rateBook(rating, comment, this.state.book, this.props.ownerDetails)
              }
              openModal = {
                (book) => this.toggleModal('rateBook',book)
              }
              closeModal = {
                () => this.toggleModal('rateBook')
              }
              rateModalIsOpen = { this.state.rateModalIsOpen }
              authenticated = { this.props.session.authenticated }
              getMemberDetailsByEmail={(response, callbackFn, argsArray) => this.props.getMemberDetailsByEmail(response, callbackFn, argsArray)}
              width = '70%' />
            : <div className="col-md-12">No Books Added</div>
          }
        </div>
        <Modal
            isOpen={this.state.authModalIsOpen && (this.props.isExistingMember.user ? true: false) }
            onRequestClose={() => this.toggleModal('authModal')}
            shouldCloseOnOverlayClick={false}
            role='dialog'
            style={modalStyle}
            contentLabel='Account'>
            <LMSAuth
              closeModal={() => this.toggleModal('authModal')}
              user={this.props.isExistingMember.user}
              login={(password) => this.signIn(password)}
              createAccount={(password) => {
                this.props.createAccount(this.props.isExistingMember.session, password)
              }}/>
          </Modal>
      </div>)
  }
}

export default connect(mapStateToProps, libraryActions)(BooksPage)
