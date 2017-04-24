import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Book from './Book'
import OwnerDetails from './OwnerDetails';

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books,
    ownerDetails : state.ownerDetails,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBooks: () => {
      dispatch(libraryActions.getAllBooks())
    },
    getOwnerDetails: () => {
      dispatch(libraryActions.getOwnerDetails())
    }
  }
}

export class App extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.getOwnerDetails()
    this.props.getAllBooks()
  }

  render () {
    return (
      <div>
        <nav className='navbar navbar-default'>
        <div className='container-fluid'>
            <div className='navbar-header'>
                <a className='navbar-brand' href='#'>LMS</a>
            </div>
            {
              this.props.ownerDetails
              ? <OwnerDetails data={this.props.ownerDetails}/>
              : ''
            }
        </div>
        </nav>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              {
                this.props.books.length
                ? <Book books={this.props.books[0]} />
                : <div>Loading...</div>
              }
            </div>
          </div>
        </div>
      </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
