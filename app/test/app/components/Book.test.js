import React from 'react'
import { shallow } from 'enzyme'
import Modal from 'react-modal'
import Book from '../../../components/Book'
import RateBook from '../../../components/RateBook'
import BookAction from '../../../components/BookAction'
import Image from '../../../components/utils/Image'
import LoginButton from '../../../components/utils/LoginButton'

describe('Book', () => {
  let component, props;

  beforeEach(() => {
    props = {
      title : 'My Books',
      books : [{
        'id': '1',
        'title': 'Title',
        'author': 'Author',
        'publisher': 'Publisher',
        'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
        'borrower': '0x0000000000000000000000000000000000000000',
        'state': '1',
        'dateAdded': '1493054441',
        'dateIssued': '0',
        'avgRating': 4,
        'imageUrl': 'https://images-eu.ssl-images-amazon.com/images/I/416Hql52NCL.jpg',
        'description': 'description'
      }],
      members: {
        '0xba21a9b09d528b2e1726d786a1d1b861032dba87': {
          name: 'Owner'
        },
        '0x0000000000000000000000000000000000000000': {
          name: 'Borrower'
        },
        '0x1': {
          name: ''
        }
      },
      ownerDetails: '',
      selectedBook: {},
      btnTitle: 'Borrow',
      isOwner: false,
      btnFunction : jest.fn(),
      loading : {
        borrowBooksLoading: false,
        returnBooksLoading: false
      },
      rateBook : jest.fn(),
      openModal : jest.fn(),
      closeModal : jest.fn(),
      rateModalIsOpen : false,
      bookModalIsOpen: false,
      authenticated : true,
      getMemberDetailsByEmail: jest.fn()
    }
    component = shallow(<Book {...props} />)
  })
  it('should display modal "Title"', () => {
    expect(component.find('.lead').text()).toBe(props.title)
  })
  it('should display book image', () => {
    expect(component.find(Image).props().src).toEqual(props.books[0].imageUrl)
  })
  it('should have a Image with type "Borrow"', () => {
    expect(component.find(Image).props().type).toEqual(props.btnTitle)
  })
  it('should display book title', () => {
    expect(component.find('.media-heading').text()).toEqual(props.books[0].title)
  })
  it('should display book author', () => {
    expect(component.find('.author').text()).toEqual('by '+props.books[0].author)
  })
  it('should display book description', () => {
    expect(component.find('.bookDescription').text()).toEqual(props.books[0].description)
  })
  it('should render 4 stars', () => {
    expect(component.find('.active').length).toEqual(4)
  })
  it('should have 2 LoginButton',() => {
    expect(component.find(LoginButton).length).toBe(2)
  })
  it('should have 2 Modals',() => {
    expect(component.find(Modal).length).toBe(2)
  })
  describe('Owner Name',() => {
    let expected
    beforeEach(() => {
      expected = <strong>Owner</strong>
    })
    it('should display Owner name', () => {
      expect(component.contains(expected)).toBe(true)
    })
    it('should not display Owner name if not a member', () => {
      props.books[0].owner = '0x2'
      component = shallow(<Book {...props}/>)
      expect(component.contains(expected)).toBe(false)
    })
    it('should not display Owner name if member but name is empty', () => {
      props.books[0].owner = '0x1'
      component = shallow(<Book {...props}/>)
      expect(component.contains(expected)).toBe(false)
    })
  })
  describe('Borrower Name',() => {
    let expected
    beforeEach(() => {
      expected = <strong>Borrower</strong>
    })
    it('should display Owner name', () => {
      expect(component.contains(expected)).toBe(true)
    })
    it('should not display Borrower name if not a member', () => {
      props.books[0].borrower = '0x2'
      component = shallow(<Book {...props}/>)
      expect(component.contains(expected)).toBe(false)
    })
    it('should not display Borrower name if member but name is empty', () => {
      props.books[0].borrower = '0x1'
      component = shallow(<Book {...props}/>)
      expect(component.contains(expected)).toBe(false)
    })
  })
  describe('LoginButton (Borrow/Return)', () => {
    it('should run getMemberDetailsByEmail on loginSuccess',() => {
      component.find(LoginButton).first().props().loginSuccess()
      expect(props.getMemberDetailsByEmail.mock.calls.length).toBe(1)
    })
    it('should open bookModal',() => {
      component.find(LoginButton).first().props().success()
      expect(props.openModal.mock.calls.length).toBe(1)
    })
    it('should show error when loginFailure',() => {
      component.find(LoginButton).first().props().loginFailure()
      expect(props.openModal.mock.calls.length).toBe(0)
    })
    it('should be disabled',() => {
      expect(component.find(LoginButton).first().props().disabled).toBe('disabled')
    })
    it('should be disabled',() => {
      props.books[0].state = '0'
      props.btnTitle = 'Return'
      component = shallow(<Book {...props} />)
      expect(component.find(LoginButton).first().props().disabled).toBe('disabled')
    })
    it('should not be disabled',() => {
      props.books[0].state = '1'
      props.btnTitle = 'Return'
      component = shallow(<Book {...props} />)
      expect(component.find(LoginButton).first().props().disabled).toBe(false)
    })
    it('should be disabled',() => {
      props.books[0].state = '0'
      props.btnTitle = 'Borrow'
      component = shallow(<Book {...props} />)
      expect(component.find(LoginButton).first().props().disabled).toBe(false)
    })
    it('should have buttonText "Borrow"',() => {
      expect(component.find(LoginButton).first().props().buttonText).toBe('Borrow')
    })
    it('should have buttonText "Return"',() => {
      props.btnTitle = ''
      component = shallow(<Book {...props} />)
      expect(component.find(LoginButton).first().props().buttonText).toBe('Return')
    })
  })
  describe('LoginButton (Rate)', () => {
    it('should run getMemberDetailsByEmail on loginSuccess',() => {
      component.find(LoginButton).last().props().loginSuccess()
      expect(props.getMemberDetailsByEmail.mock.calls.length).toBe(1)
    })
    it('should open bookModal',() => {
      component.find(LoginButton).last().props().success()
      expect(props.openModal.mock.calls.length).toBe(1)
    })
    it('should open bookModal',() => {
      component.find(LoginButton).last().props().success()
      expect(props.openModal.mock.calls.length).toBe(1)
    })
    it('should show error when loginFailure',() => {
      component.find(LoginButton).last().props().loginFailure()
      expect(props.openModal.mock.calls.length).toBe(0)
    })
    it('should not be disabled',() => {
      expect(component.find(LoginButton).last().props().disabled).toBe(false)
    })
  })
  describe('RateModal', () => {
    it('should closeModal onRequestClose',() => {
      component.find(Modal).first().props().onRequestClose()
      expect(props.closeModal.mock.calls.length).toBe(1)
    })
    it('should run rateBook',() => {
      component.find(RateBook).props().rateBook()
      expect(props.rateBook.mock.calls.length).toBe(1)
    })
    it('should run closeModal',() => {
      component.find(RateBook).props().closeModal()
      expect(props.closeModal.mock.calls.length).toBe(1)
    })
  })
  describe('BookAction Modal', () => {
    it('should closeModal onRequestClose',() => {
      component.find(Modal).last().props().onRequestClose()
      expect(props.closeModal.mock.calls.length).toBe(1)
    })
    it('should run closeModal',() => {
      component.find(BookAction).props().closeModal()
      expect(props.closeModal.mock.calls.length).toBe(1)
    })
  })
})
