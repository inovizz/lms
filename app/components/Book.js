import React from 'react'

const style = {
    width : "84%"
}

const Book = ({ title, books, btnTitle, btnFunction, loading }) => (
  <div className='book'>
    <p className='lead'>{title}</p>
    <p className='text-center text-info'>
        {
            loading.borrowBooksLoading ? "Borrowing a book" : ""
        }
        {
            loading.returnBooksLoading ? "Returning a book" : ""
        }
    </p>
    <ul className='media-list list-group'>
        {
            books.map((book, i) => {
              return (
                    <li key={i} className='list-group-item'>
                        <div className='media-left'>
                            <img className='media-object' src='https://placehold.it/140X100'/>
                        </div>
                        <div className='media-body'>
                            <h4 className='media-heading'>{book.title}</h4>
                            <div className="rating">
                                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                            </div>
                            <div className='row info'>
                                <div className='col-sm-6'>
                                    <span className='glyphicon glyphicon-pencil'></span>&nbsp;&nbsp;{book.author}
                                </div>
                                <div className='col-sm-6'>
                                    <span className='glyphicon glyphicon-book'></span>&nbsp;&nbsp;{book.publisher}
                                </div>
                            </div>
                        </div>
                        {
                            btnTitle 
                            ? <div className='media-bottom'>
                                <button className='btn btn-default' onClick={() => btnFunction(book)}>{btnTitle}</button>
                            </div>
                            : ''
                        }
                    </li>
              )
            })
        }
    </ul>
  </div>
)

export default Book
