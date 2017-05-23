import React from 'react'
import Modal from 'react-modal'
import RateBook from './RateBook'
import Image from './utils/Image'
import LoginButton from './utils/LoginButton'

const style = {
  row: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '30%',
    transform             : 'translate(-50%, -50%)'
  }
}

const isDisabled = (book, bookAction) => {
  return (bookAction === 'Borrow' && book.state === '1') || (bookAction === 'Return' && book.state === '0')
}

const Book = ({
    title,
    books,
    ownerDetails,
    btnTitle,
    btnFunction,
    loading,
    rateBook,
    openModal,
    closeModal,
    rateModalIsOpen,
    authenticated,
    getMemberDetailsByEmail
  }) => (
  <div className='book'>
    <div className='lead'>{title}</div>
    <div className='media-list list-group' style={style.row}>
      {books.map((book, i) => {
        return (
          <div key={i} className='list-group-item'>
            <div className='media-left'>
              <Image type={btnTitle} src={book.imageUrl}/>
            </div>
            <div className='media-body'>
              <div className='taContainer'>
                <div className='media-heading hint--bottom' aria-label='bottom'>{book.title}</div>
                <div className='author'>by {book.author}</div>
              </div>
              <div className='ratingContainer'>
                <div className='rating'>
                  {
                    [1, 2, 3, 4, 5].map(rate => {
                      if(rate <= book.avgRating) {
                        return <span key={rate} id={rate} className='active'>★</span>
                      } else {
                        return <span key={rate} id={rate}>☆</span>
                      }
                    })
                  }
                </div>
              </div>
              <div className='bookDescription'>
                {book.description}
              </div>
            </div>
            {
              <div className='media-bottom'>
                {
                  (btnTitle === 'Borrow' || btnTitle === 'Return') &&
                  <LoginButton
                    authenticated={authenticated}
                    loginSuccess={(response) => {
                      getMemberDetailsByEmail(response, btnFunction, book)
                    }}
                    loginFailure={(err) => console.log(err)}
                    success = {() => btnFunction(book,ownerDetails)}
                    className='btn btn-default borrow-btn'
                    disabled={isDisabled(book, btnTitle) ? 'disabled' : false}
                    buttonText={btnTitle}
                    logo='' />
                }
                <LoginButton
                  authenticated={authenticated}
                  loginSuccess={(response) => {
                    getMemberDetailsByEmail(response, openModal, book)
                  }}
                  loginFailure={(err) => console.log(err)}
                  success = {() => openModal(book)}
                  className='btn btn-default'
                  disabled={false}
                  buttonText='Rate'
                  logo='' />
              </div>
            }
          </div>
        )
      })}
    </div>
    <Modal
      isOpen={rateModalIsOpen}
      onRequestClose={() => closeModal()}
      role='dialog'
      style={modalStyle}
      shouldCloseOnOverlayClick={false}
      contentLabel='Rate a Book'>
      <RateBook closeModal = {
        () => closeModal()
      }
      rateBook = {
        (rating, comment) => rateBook(rating, comment)
      }
      loading = {
        loading.rateBookLoading
      }
      />
    </Modal>
  </div>
)

export default Book
