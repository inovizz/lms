import React from 'react'
import { render } from 'react-dom'
import { mount, shallow } from 'enzyme'
import Book from '../../../components/Book'

describe('Book', () => {
  //  Test : Components and its child renders without crashing
  it('renders without crashing', () => {
    mount(<Book loading={{ borrowBooksLoading : false, returnBooksLoading: false }} title='' books={[]} btnTitle='' btnFunction='' />)
  })
  describe('render', () => {
    let component;

    beforeEach(() => {
        const props = {
          title : 'My Books',
          books : [{
            'id': '1',
            'title': 'Title',
            'author': 'Author',
            'publisher': 'Publisher',
            'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
            'borrower': '0x0000000000000000000000000000000000000000',
            'state': '0',
            'dateAdded': '1493054441',
            'dateIssued': '0',
            'rating': 4,
            'imageUrl': 'https://images-eu.ssl-images-amazon.com/images/I/416Hql52NCL.jpg',
            'description': 'description'
          }],
          btnTitle : 'Borrow',
          btnFunction : jest.fn(),
          loading : {
            borrowBooksLoading: false,
            returnBooksLoading: false
          },
          rateBook : jest.fn(),
          openModal : jest.fn(),
          closeModal : jest.fn(),
          rateModalIsOpen : false,
          authenticated : true
        }
        component = mount(<Book {...props} />)
    })
    it('should render the book', () => {
      const expected = (
          <div className='lead'>My Books</div>
      )
      expect(component.contains(expected)).toEqual(true)
    })
    it('should display book image', () => {
      expect(component.find('img').props().src).toEqual('https://images-eu.ssl-images-amazon.com/images/I/416Hql52NCL.jpg')
    })
    it('should display book title', () => {
      expect(component.find('.media-heading').text()).toEqual('Title')
    })
    it('should display book author', () => {
      expect(component.find('.author').text()).toEqual('by Author')
    })
    it('should display book description', () => {
      expect(component.find('.bookDescription').text()).toEqual('description')
    })
    it('should render 4 stars', () => {
      expect(component.find('.active').length).toEqual(4)
    })
    
  })
})
