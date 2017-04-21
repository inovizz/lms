import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Book from './Book'

const mapStateToProps = (state, ownProps) => {
  return {
    account: ownProps.account,
    books: state.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerDetails: (account) => {
      dispatch(libraryActions.getOwnerDetails(account))
    },
    getAllBooks: () => {
      dispatch(libraryActions.getAllBooks())
    }
  }
}

export class Main extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.getAllBooks()
  }

  render () {
    let books = []
    if (this.props.books.length) {
      console.log(this.props.books[0])
    }
    return (<div>
      {
        this.props.books.length
          ? <Book books={this.props.books[0]} />
          : <p> There are no books available </p>
      }
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
