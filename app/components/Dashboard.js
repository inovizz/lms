import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Book from './Book'

const mapStateToProps = (state, ownProps) => {
  return {
    myBooks : state.myBooks,
    ownerDetails : state.ownerDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyBooks : () => {
      dispatch(libraryActions.getMyBooks())
    }
  }
}

export class Dashboard extends React.Component {
  componentDidMount () {
    this.props.getMyBooks()
  }
  render () {
    const ownerBooks = this.props.myBooks.filter((book) => book.owner === this.props.ownerDetails.account)
    return (
      <div className='row'>
        {
          this.props.myBooks.length
          ? <Book title='My Books' books={ownerBooks} />
          : <div>Loading...</div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
