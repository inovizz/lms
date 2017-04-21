import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import * as libraryActions from '../actions/libraryActions'
import Book from './Book'
import BooksForm from './BooksForm'
import Loader from './Loader'

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
    allBooks: state.books.allBooks,
    ownerDetails: state.session.user,
    loading: state.loading,
    session: state.session
  }
}

export class Dashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      modalIsOpen: false,
      rateModalIsOpen: false,
      book: {}
    }
  }
  toggleModal (option, book) {
    switch (option) {
      case 'addBook':
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
        break
      case 'rateBook':
        this.setState({ rateModalIsOpen: !this.state.rateModalIsOpen, book })
    }
  }
  componentDidMount () {
    if(!this.props.allBooks.length) {
        this.props.getAllBooks()
    }
  }
  renderLoading () {
    const title = this.props.loading.allbooksloading
                  ? 'Loading Books'
                  : this.props.loading.addBooksLoading
                    ? 'Adding book...'
                    : this.props.loading.returnBooksLoading
                    ? 'Returning Book'
                    : this.props.loading.rateBookLoading
                      ? 'Submitting Rating'
                      : 'Fetching details from library';
   if (this.props.loading.allbooksloading || this.props.loading.addBooksLoading || this.props.loading.returnBooksLoading ||  this.props.loading.rateBookLoading) {
     return (<Loader text={title}/>)
   }
  }
  renderBooks () {
    const ownerBooks = this.props.allBooks.filter((book) => book.owner === this.props.ownerDetails.account)
    const borrowedBooks = this.props.allBooks.filter((book) => book.borrower === this.props.ownerDetails.account)
    return (
      <div>
        <div className='add-btn'>
          <button className='btn btn-default' onClick={() => this.toggleModal('addBook')}>Add Book</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={() => this.toggleModal('addBook')}
            shouldCloseOnOverlayClick={false}
            role='dialog'
            style={modalStyle}
            contentLabel='Add a Book'>
            <BooksForm closeModal={() => this.toggleModal('addBook')}/>
          </Modal>
        </div>
        {
          this.renderLoading()
        }
        <div>
            {
              ownerBooks.length
              ? <Book loading = {
                  this.props.loading
                }
                title = 'My Books'
                books = {
                  ownerBooks
                }
                btnTitle = ''
                btnFunction = ''
                rateBook = {
                  (rating, comment) => this.props.rateBook(rating, comment, this.state.book, this.props.ownerDetails)
                }
                openModal = {
                  (book) => this.toggleModal('rateBook', book)
                }
                closeModal = {
                  () => this.toggleModal('rateBook')
                }
                rateModalIsOpen = { this.state.rateModalIsOpen }
                authenticated = { this.props.session.authenticated} />
              : <div> No Books Added </div>
            }
            {
              borrowedBooks.length
              ? <Book loading = {
                  this.props.loading
                }
                title = 'Borrowed Books'
                books = {
                  borrowedBooks
                }
                btnTitle = 'Return'
                btnFunction = {
                  (id) => this.props.returnBook(id)
                }
                rateBook = {
                  (rating, comment) => this.props.rateBook(rating, comment, this.state.book, this.props.ownerDetails)
                }
                openModal = {
                  (book) => this.toggleModal('rateBook', book)
                }
                closeModal = {
                  () => this.toggleModal('rateBook')
                }
                rateModalIsOpen = { this.state.rateModalIsOpen }
                authenticated = { this.props.session.authenticated} />
              : ''
            }
        </div>
      </div>
    )
  }
  render () {
    return (
        this.props.allBooks.length
        ? this.renderBooks()
        : this.renderLoading()
    )
  }
}

export default connect(mapStateToProps, libraryActions)(Dashboard)
