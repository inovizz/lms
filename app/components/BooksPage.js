import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Book from './Book'
import Header from './Header'

const style = {
  marginTop : "15px"
}

const mapStateToProps = (state, ownProps) => {
  return {
    books : state.books,
    ownerDetails : state.ownerDetails,
    filteredBooks : state.filteredBooks,
    loading : state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBooks: () => {
      dispatch(libraryActions.getAllBooks())
    },
    borrowBook: (book,ownerDetails) => {
      dispatch(libraryActions.borrowBook(book, ownerDetails))
    },
    getOwnerDetails: () => {
      dispatch(libraryActions.getOwnerDetails())
    },
    searchBook: (val) => {
      dispatch(libraryActions.searchBook(val))
    }
  }
}

export class BooksPage extends React.Component {
  constructor (props) {
    super(props)
    this.searchVal = ''
  }

  componentDidMount () {
    // disabling the Loader screen screen
    const loader = document.getElementById('loader')

    if (loader) {
      loader.style.display = 'none'
    }

    if (!this.props.ownerDetails) {
      this.props.getOwnerDetails()
    }
    this.props.getAllBooks()
  }

  render () {
    const ownerDetails = this.props.ownerDetails ? this.props.ownerDetails : ''
    const books = this.props.loading.allbooksloading ? [] : ( this.props.books.filteredBooks.length ? this.props.books.filteredBooks : this.props.books.allBooks )
    return (
      <div>
        <Header ownerDetails={ownerDetails} />
        <div className='row yogalogo'>
          <div className='col-sm-6'>
            <div className='yoga-wrapper'>
              <img width="1016" height="590" src="http://www.pramati.com/wp-content/uploads/2017/03/Triad-01.png" className="vc_single_image-img attachment-large" alt="" srcSet="http://www.pramati.com/wp-content/uploads/2017/03/Triad-01.png 1016w, http://www.pramati.com/wp-content/uploads/2017/03/Triad-01-300x174.png 300w, http://www.pramati.com/wp-content/uploads/2017/03/Triad-01-768x446.png 768w" sizes="(max-width: 1016px) 100vw, 1016px"/>
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
            <div className='col-sm-7'>
              <ul className='nav navbar-nav'>
                <li>
                  <a href='#' className='active'>All Books</a>
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
                    <button className='btn btn-default' type='button' onClick={() => this.props.searchBook(this.searchVal.value)}>
                      Search
                    </button>
                  </div>
              </div>
            </div>
          </div>
          {
            this.props.books.allBooks.length === 0
            ? <div style={style}>Fetching details from library</div>
              : <Book loading={this.props.loading} title='' books={books} btnTitle='Borrow' btnFunction={(book) => this.props.borrowBook(book, this.props.ownerDetails)} width='70%' />
          }
        </div>
      </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage)


/**
 * 
                <li>
                  <a href='#'>Programming</a>
                </li>
                <li>
                  <a href='#'>Business</a>
                </li>
                <li>
                  <a href='#'>Science</a>
                </li>
 */