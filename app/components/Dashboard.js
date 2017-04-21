import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import * as libraryActions from '../actions/libraryActions'
import Book from './Book'
import BooksForm from './BooksForm'

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
    myBooks : state.myBooks,
    ownerDetails : state.ownerDetails,
    loading : state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyBooks : () => {
      dispatch(libraryActions.getMyBooks())
    },
    returnBook : (book) => {
      dispatch(libraryActions.returnBook(book))
    },
    rateBook: (rating, comment, book, ownerDetails) => {
      dispatch(libraryActions.rateBook(rating, comment, book, ownerDetails))
    }
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
  openModal () {
    this.setState({ modalIsOpen: true })
  }
  closeModal () {
    this.setState({ modalIsOpen: false })
  }
  openRateModal (book) {
    this.setState({ rateModalIsOpen: true, book: book })
  }
  closeRateModal () {
    this.setState({ rateModalIsOpen: false })
  }
  componentDidMount () {
    this.props.getMyBooks()
  }
  renderLoading () {
    return (
      <div>
        Fetching details of the books.
      </div>
    )
  }
  renderBooks () {
    const ownerBooks = this.props.myBooks.filter((book) => book.owner === this.props.ownerDetails.account)
    const borrowedBooks = this.props.myBooks.filter((book) => book.borrower === this.props.ownerDetails.account)
    return (
      <div>
        <div className='add-btn'>
          <button className='btn btn-default' onClick={() => this.openModal()}>Add Book</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={() => this.closeModal()}
            shouldCloseOnOverlayClick={false}
            role='dialog'
            style={modalStyle}
            contentLabel='Add a Book'>
            <BooksForm closeModal={() => this.closeModal()}/>
          </Modal>
        </div>
        <div>
          {
            this.props.loading.myBooksLoading
            ? <div className='row'>
                <p className='text-center text-info'>
                  Updating books library...
                </p>
              </div>
            : ''
          }
            {
              ownerBooks.length
              ? < Book loading = {
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
                  (book) => this.openRateModal(book)
                }
                closeModal = {
                  () => this.closeRateModal()
                }
                rateModalIsOpen = { this.state.rateModalIsOpen }/ >
              : < div > No Books Added < /div>
            }
            {
              borrowedBooks.length
              ? < Book loading = {
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
                  (book) => this.openRateModal(book)
                }
                closeModal = {
                  () => this.closeRateModal()
                }
                rateModalIsOpen = { this.state.rateModalIsOpen } />
              : ''
            }
        </div>
      </div>
    )
  }
  render () {
    return (
        this.props.myBooks.length
        ? this.renderBooks()
        : this.renderLoading()
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
