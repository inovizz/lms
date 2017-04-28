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
};

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
    }
  }
}

export class Dashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      modalIsOpen: false
    }
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
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
            shouldCloseOnOverlayClick={true}
            role='dialog'
            style={modalStyle}
            contentLabel="Add a Book">
            <BooksForm closeModal={() => this.closeModal()}/>
          </Modal>
        </div>
        <div>
          {
            this.props.loading.myBooksLoading 
            ? <div className="row">
                <p className="text-center text-info">
                  Updating books library...
                </p>
              </div>
            : ''
          }
            {
              ownerBooks.length
              ? <Book loading={this.props.loading} title='My Books' books={ownerBooks} btnTitle='' btnFunction='' />
              : <div>No Books Added</div>
            }
            {
              borrowedBooks.length
              ? <Book loading={this.props.loading} title='Borrowed Books' books={borrowedBooks}  btnTitle='Return' btnFunction={(id) => this.props.returnBook(id)}/>
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
