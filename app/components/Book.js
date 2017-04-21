import React from 'react'
import Modal from 'react-modal'
import RateBook from './RateBook'

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
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

const Book = ({
    title,
    books,
    btnTitle,
    btnFunction,
    loading,
    rateBook,
    openModal,
    closeModal,
    rateModalIsOpen,
    authenticated
  }) => (
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
                      if(rate <= book.rating) {
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
              authenticated
              ? <div className='media-bottom'>
                  {
                    btnTitle
                    ? <button
                        className='btn btn-default'
                        style={ { 'marginLeft': '15px' }}
                        onClick={() => btnFunction(book)}>{btnTitle}</button>
                    : ''
                  }
                  <button className='btn btn-default' onClick={() => openModal(book)}>Rate</button>
                </div>
              : ''
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
