import React from 'react'

const Book = ({ books }) => (
    <ul className='media-list'>
        {
            books.split('|').map(book => {
              book = book.split(';')
              return (
                    <li key={book[0]} className='media'>
                        <div className='media-left'>
                            <img className='media-object' />
                        </div>
                        <div className='media-body'>
                            <h4 className='media-heading'>{book[1]}</h4>
                            <p><span>Author : </span> {book[2]}</p>
                            <p><span>Publisher : </span> {book[3]}</p>
                            <p></p>
                        </div>
                    </li>
              )
            })
        }
    </ul>
)

export default Book
