import React from 'react'
import { shallow } from 'enzyme'
import { Dashboard } from '../../../components/Dashboard'
import Book from '../../../components/Book'
import Loader from '../../../components/Loader'
import BooksForm from '../../../components/BooksForm'
import Modal from 'react-modal'

describe('Dashboard', () => {
  let component, props
  beforeEach(() => {
    props = {
      allBooks: [],
      ownerDetails: { account: '0x1' },
      loading: {
        allbooksloading: true,
        addBooksLoading: false,
        returnBooksLoading: false,
        rateBookLoading: false
      },
      session: {},
      error: {},
      accounts: null,
      rateBook: jest.fn(),
      getAllBooks: jest.fn(),
      getAllMembers: jest.fn()
    }
    component = shallow(<Dashboard {...props} />)
  })

  it('should show loader', () => {
    expect(component.find(Loader).exists()).toBe(true)
  })

  describe('Add Book', () => {
    beforeEach(() => {
      component.find('.add-btn button').simulate('click')
    })
    it('should open addBook modal', () => {
      expect(component.state().modalIsOpen).toBe(true)
    })
    it('should close addBook modal', () => {
      component.find(BooksForm).props().closeModal()
      expect(component.state().modalIsOpen).toBe(false)
    })
    it('should close addBook modal', () => {
      component.find(Modal).first().props().onRequestClose()
      expect(component.state().modalIsOpen).toBe(false)
    })
  })

  describe('My Books',() => {
    beforeEach(() => {
      props.allBooks = [{ owner: '0x1' }]
      component = shallow(<Dashboard {...props} />)
    })
    it('should rateBook',() => {
      component.find(Book).first().props().rateBook()
      expect(props.rateBook.mock.calls.length).toBe(1)
    })

    describe('rateModal', () => {
      beforeEach(() => {
        component.find(Book).first().props().openModal('rateBook',{})
      })
      it('should open rateModal',() => {
        expect(component.state().rateModalIsOpen).toBe(true)
      })
      it('should close rateModal',() => {
        component.find(Book).first().props().closeModal('rateBook')
        expect(component.state().rateModalIsOpen).toBe(false)
      })
    })

    describe('bookModal', () => {
      beforeEach(() => {
        component.find(Book).first().props().openModal('bookModal',{})
      })
      it('should open bookModal',() => {
        expect(component.state().bookModalIsOpen).toBe(true)
      })
      it('should close bookModal',() => {
        component.find(Book).first().props().closeModal('bookModal')
        expect(component.state().bookModalIsOpen).toBe(false)
      })
    })

  })

  describe('Borowed Books',() => {
    beforeEach(() => {
      props.allBooks = [{ borrower: '0x1' }]
      component = shallow(<Dashboard {...props} />)
    })
    it('should rateBook',() => {
      component.find(Book).last().props().rateBook()
      expect(props.rateBook.mock.calls.length).toBe(1)
    })

    describe('rateModal', () => {
      beforeEach(() => {
        component.find(Book).last().props().openModal('rateBook',{})
      })
      it('should open rateModal',() => {
        expect(component.state().rateModalIsOpen).toBe(true)
      })
      it('should close rateModal',() => {
        component.find(Book).last().props().closeModal('rateBook')
        expect(component.state().rateModalIsOpen).toBe(false)
      })
    })

    describe('bookModal', () => {
      beforeEach(() => {
        component.find(Book).last().props().openModal('bookModal',{})
      })
      it('should open bookModal',() => {
        expect(component.state().bookModalIsOpen).toBe(true)
      })
      it('should close bookModal',() => {
        component.find(Book).last().props().closeModal('bookModal')
        expect(component.state().bookModalIsOpen).toBe(false)
      })
    })

  })
})
