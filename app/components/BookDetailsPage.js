import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import BookInfo from './utils/BookInfo'
import CommentList from './utils/CommentList'

export const mapStateToProps = (state, ownProps) => {
  return {
    accounts: state.accounts,
    books: state.books
  }
}

export class BookDetailsPage extends React.Component {
  render () {
    const book = this.props.books.allBooks.filter((book) => book.id === this.props.match.params.id)
    const members = (this.props.accounts && this.props.accounts.members) ? this.props.accounts.members : ''
    return  (
      <div className='container'>
        <div className='book-details-row'>
          {
            book.length !== 0 &&
            <div className='book'>
              <BookInfo type='details' book={book[0]} members={members} />
            </div>
          }
          {
            book.length !==0 && book[0].comments !== undefined && book[0].comments.length !==0 &&
            <CommentList
              members={members} ratings={book[0].ratings} reviewers={book[0].reviewers} comments={book[0].comments} />
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, libraryActions)(BookDetailsPage)
