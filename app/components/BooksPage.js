import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Book from './Book'
import Header from './Header'
import Banner from './Banner'
import SearchBook from './SearchBook'
import Modal from 'react-modal'
import LMSAuth from './LMSAuth'

const style = {
  marginTop : '15px'
}

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books,
    ownerDetails: state.session.user,
    filteredBooks: state.filteredBooks,
    loading: state.loading,
    session: state.session
  }
}

export class BooksPage extends React.Component {
  constructor (props) {
    super(props)
    this.searchVal = ''
    this.state = {
      rateModalIsOpen: false,
      authModalIsOpen: true,
      book: {}
    }
  }
  componentDidMount () {
    // disabling the Loader screen screen
    const loader = document.getElementById('loader')
    if (loader) {
      loader.style.display = 'none'
    }
    this.props.getAllBooks() 
  }
  toggleModal (modal, book) {
    switch (modal) {
      case 'rateBook' : {
        this.setState({ rateModalIsOpen: !this.state.rateModalIsOpen, book })
      }
      case 'authModal' : {
        this.setState({ authModalIsOpen: !this.state.authModalIsOpen })
      }
    }
    
  }
  loginFailure (response) {
    console.log(response)
  }
  render () {
    const books = this.props.books.filteredBooks.length
                  ? this.props.books.filteredBooks
                  : (this.props.books.allBooks.length ? this.props.books.allBooks : [])
    return (
      <div>
        <Header
          loginSuccess = {
            (response) => this.props.getMemberDetailsByEmail(response)
          }
          loginFailure = {
            (response) => this.loginFailure(response)
          }
          session={ this.props.session }
          logout = {
            () => this.props.logout()
          } />
        <Banner />
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
            books.length
            ? <Book loading = {
                this.props.loading
              }
              title = ''
              books = {
                books
              }
              btnTitle = 'Borrow'
              btnFunction = {
                (book) => this.props.borrowBook(book, this.props.ownerDetails)
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
              width = '70%' />
            : <div style={style}>Fetching details from library</div>
          }
        </div>
        <Modal
            isOpen={this.state.authModalIsOpen && this.props.session.authenticated && !this.props.session.user.name}
            onRequestClose={() => this.toggleModal('authModal')}
            shouldCloseOnOverlayClick={false}
            role='dialog'
            style={modalStyle}
            contentLabel='Create Account'>
            <LMSAuth 
              closeModal={() => this.toggleModal('authModal')}
              createAccount={(password) => this.props.createAccount(this.props.session, password)}/>
          </Modal>
      </div>)
  }
}

export default connect(mapStateToProps, libraryActions)(BooksPage)
