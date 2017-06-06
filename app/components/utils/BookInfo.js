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
        <span>&nbsp;{ book.reviewersCount }&nbsp;{ (book.reviewersCount > 1) ? 'votes' : 'vote' }</span>
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
          <a href={'mailto:'+members[book.owner].email}>
            <strong>{members[book.owner].name}</strong>
          </a>
          &nbsp;&nbsp;
        </span>
      }
      {
        members[book.borrower] !== undefined &&
        members[book.borrower].name !== '' &&
        <span>
          Currently with &nbsp;
          <a href={'mailto:'+members[book.borrower].email}>
            <strong>{members[book.borrower].name}</strong>
          </a>
        </span>
      }
      </p>
      <p className='btns'>
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
      </p>
    </div>
  </div>
)

export default BookInfo
