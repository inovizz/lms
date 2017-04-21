import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Book from './Book'
import Header from './Header'

const style = {
  marginTop : '15px'
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books,
    ownerDetails: state.ownerDetails,
    filteredBooks: state.filteredBooks,
    loading: state.loading,
    session: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBooks: () => {
      dispatch(libraryActions.getAllBooks())
    },
    borrowBook: (book, ownerDetails) => {
      dispatch(libraryActions.borrowBook(book, ownerDetails))
    },
    getOwnerDetails: (response) => {
      dispatch(libraryActions.getOwnerDetails(response))
    },
    searchBook: (val) => {
      dispatch(libraryActions.searchBook(val))
    },
    rateBook: (rating, comment, book, ownerDetails) => {
      dispatch(libraryActions.rateBook(rating, comment, book, ownerDetails))
    },
    login : (response) => {
      dispatch(libraryActions.login(response))
    },
    logout : () => {
      dispatch(libraryActions.logout())
    }
  }
}

export class BooksPage extends React.Component {
  constructor (props) {
    super(props)
    this.searchVal = ''
    this.state = {
      rateModalIsOpen: false,
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
  openModal (book) {
    this.setState({ rateModalIsOpen: true, book: book })
  }
  closeModal () {
    this.setState({ rateModalIsOpen: false })
  }
  loginSuccess (response) {
    this.props.getOwnerDetails(response)
  }
  loginFailure (response) {
    console.log(response)
  }
  render () {
    const books = this.props.loading.allbooksloading
                  ? []
                  : (this.props.books.filteredBooks.length ? this.props.books.filteredBooks : this.props.books.allBooks)
    return (
      <div>
        < Header ownerDetails = {
          this.props.session.authenticated ? this.props.session.user : ''
        }
        loginSuccess = {
          (response) => this.loginSuccess(response)
        }
        loginFailure = {
          (response) => this.loginFailure(response)
        }
        authenticated={ this.props.authenticated }
        logout = {
          () => this.props.logout()
        }
        />
        <div className='row yogalogo'>
          <div className='col-sm-6'>
            <div className='yoga-wrapper'>
              < img width = '1016'
              height = '590'
              src = 'http://www.pramati.com/wp-content/uploads/2017/03/Triad-01.png'
              className = 'vc_single_image-img attachment-large'
              alt = ''
              srcSet = 'http://www.pramati.com/wp-content/uploads/2017/03/Triad-01.png 1016w, http://www.pramati.com/wp-content/uploads/2017/03/Triad-01-300x174.png 300w, http://www.pramati.com/wp-content/uploads/2017/03/Triad-01-768x446.png 768w'
              sizes = '(max-width: 1016px) 100vw, 1016px' / >
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='yoga-header'>
              <h1>Yoga for the mind</h1>
            </div>
            <div className='yoga-subheader'>
              <h4>Get Rewarded for Reading</h4>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7'>
              <ul className='nav navbar-nav'>
                <li>
                  <a href='#' className='active'>All Books</a>
                </li>
                <li>
                  <a href='#'>Programming</a>
                </li>
                <li>
                  <a href='#'>Business</a>
                </li>
                <li>
                  <a href='#'>Science</a>
                </li>
              </ul>
            </div>
            <div className='col-sm-4 col-sm-offset-1'>
              <div className='row'>
                <div className='col-sm-8'>
                  <input
                      type='text'
                      className='form-control'
                      placeholder='Search for...'
                      ref={(node) => {
                        this.searchVal = node
                      }}
                      required/>
                  </div>
                  <div className='col-sm-4'>
                    < button className = 'btn btn-default'
                    type = 'button'
                    onClick = {
                      () => this.props.searchBook(this.searchVal.value)
                    } >
                      Search
                    </button>
                  </div>
              </div>
            </div>
          </div>
          {
            this.props.loading.allbooksloading
            ? <div style={style}>Fetching details from library</div>
              : < Book loading = {
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
                (book) => this.openModal(book)
              }
              closeModal = {
                () => this.closeModal()
              }
              rateModalIsOpen = { this.state.rateModalIsOpen }
              width = '70%' / >
          }
        </div>
      </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage)
