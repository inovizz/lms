import React from 'react'
import { mockbooks } from '../mockdata/books'

const style = {
  row: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

const Book = ({ title, books, btnTitle, btnFunction, loading }) => (
  <div className='book'>
    <div className='lead'>{title}</div>
    <p className='text-center text-info'>
      {loading.borrowBooksLoading ? 'Borrowing a book' : ''}
      {loading.returnBooksLoading ? 'Returning a book' : ''}
    </p>
    <div className='media-list list-group' style={style.row}>
      {books.map((book, i) => {
        return (
          <div key={i} className='list-group-item'>
            <div className='media-left'>
              <div className='imgContainer'>
                <img className={btnTitle ? 'imgLarge' : 'imgMedium'} src={book.imageUrl} />
              </div>
              <div className='imgFaker'>Image faker</div>
            </div>
            <div className='media-body'>
              <div className='taContainer'>
                <div className='media-heading hint--bottom' aria-label='bottom'>{book.title}</div>
                <div className='author'>by {book.author}</div>
              </div>
              <div className='ratingContainer'>
                <div className='rating'>
                  <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
              </div>
              <div className='bookDescription'>
                {book.description}
              </div>
            </div>
            {btnTitle
              ? <div className='media-bottom'>
                  <button className='btn btn-default' onClick={() => btnFunction(book)}>{btnTitle}</button>
                </div>
              : ''}
          </div>
        )
      })}
    </div>
  </div>
)

export default Book
