import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'

const mapStateToProps = (state, ownProps) => {
  return {
    isBookAdded: state.isBookAdded,
    loading : state.loading,
    closeModal : ownProps.closeModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (title, author, publisher) => {
      dispatch(libraryActions.addBook(title, author, publisher))
    }
  }
}

export class BooksForm extends React.Component {
  constructor (props) {
    super(props)
    this.newBook = {
      title: '',
      author: '',
      publisher: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if(!nextProps.loading.addBooksLoading) {
      nextProps.closeModal();
    }
  }
  addBook () {
    const title = this.newBook.title.value
    const author = this.newBook.author.value
    const publisher = this.newBook.publisher.value
    this.props.addBook(title, author, publisher)
  }
  render () {
    return (
      <form className='form-horizontal' ref='bookForm' onSubmit={(e) => {
        e.preventDefault()
        this.addBook()
        this.refs.bookForm.reset()
      }}>
        <fieldset>
          <legend>Add a book</legend>
          {
            this.props.loading.addBooksLoading 
            ? <div className="form-group">
                <p className="text-center text-info">
                  Adding a new book.
                </p>
              </div>
            : ''
          }
          <div className='form-group'>
            <label htmlFor='title' className='col-sm-3 control-label'>Title</label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='title' placeholder='Enter title of the book' ref={(node) => { this.newBook.title = node }} required/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='author' className='col-sm-3 control-label'>Author</label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='author' placeholder='Enter name of the author' ref={(node) => { this.newBook.author = node }} required/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='publisher' className='col-sm-3 control-label'>Publisher</label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='publisher' placeholder='Enter name of the publisher' ref={(node) => { this.newBook.publisher = node }} required/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-6 col-sm-offset-3'>
              <button type='submit' className='btn btn-primary'>Add</button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm)