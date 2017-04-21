import React from 'react'

const Book = ({ books }) => (
    <ul className='list-group'>
        {
            books.split('|').map(book => {
              book = book.split(';')
              return (
                    <li key={book[0]} className='list-group-item'>
                        <span>{book[1]}</span>
                        <span>{book[2]}</span>
                        <span>{book[3]}</span>
                    </li>
              )
            })
        }
    </ul>
)

export default Book
