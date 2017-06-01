import React from 'react'
import { Link } from 'react-router-dom'
import Image from './Image'
import Ratings from './Ratings'
import LoginButton from './LoginButton'

const BookInfo = ({ type, book, members, authenticated, openModal, getMemberDetailsByEmail, isDisabled, btnTitle }) => (
  <div className='list-group-item'>
    <div className='media-left'>
      <Link to={`/book/${book.id}`}>
        <Image type={btnTitle} src={book.imageUrl}/>
      </Link>
    </div>
    <div className='media-body'>
      <div className='taContainer'>
        <div className='media-heading hint--bottom' aria-label='bottom'>{book.title}</div>
        <div className='author'>by {book.author}</div>
      </div>
      <div className='ratingContainer'>
        <Ratings ratings={book.avgRating} />
        <span>&nbsp;{ book.reviewersCount }&nbsp;voters</span>
      </div>
      <div className='bookDescription'>
        {book.description}
      </div>
    </div>
    <div className='media-bottom'>
      <p className='user-info'>
      {
        members[book.owner] !== undefined &&
        members[book.owner].name !== '' &&
        <span>
          Book shared by &nbsp;
          <strong>{members[book.owner].name}</strong>
          &nbsp;&nbsp;
        </span>
      }
      {
        members[book.borrower] !== undefined &&
        members[book.borrower].name !== '' &&
        <span>
          Currently with &nbsp;
          <strong>{members[book.borrower].name}</strong>
        </span>
      }
      </p>
      <p className='btns'>
      {
        type === 'info' &&
          <LoginButton
            authenticated={authenticated}
            loginSuccess={(response) => {
              getMemberDetailsByEmail(response, openModal, ['bookModal', book])
            }}
            loginFailure={(err) => console.log(err)}
            success = {() => openModal('bookModal', book)}
            className='btn btn-default borrow-btn'
            disabled={isDisabled(book, btnTitle) ? 'disabled' : false}
            buttonText={btnTitle? btnTitle : 'Return'}
            logo='' />
      }
      {
        type === 'info' &&
        <LoginButton
          authenticated={authenticated}
          loginSuccess={(response) => {
            getMemberDetailsByEmail(response, openModal, ['rateBook', book])
          }}
          loginFailure={(err) => console.log(err)}
          success = {() => openModal('rateBook', book)}
          className='btn btn-default'
          disabled={false}
          buttonText='Rate'
          logo='' />
      }
      </p>
    </div>
  </div>
)

export default BookInfo
