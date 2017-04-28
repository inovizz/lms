import React from 'react'
import { render } from 'react-dom'
import { mount, shallow } from 'enzyme'
import Book from '../../../components/Book'

describe('Book', () => {
  //  Test : Components and its child renders without crashing
  it('renders without crashing', () => {
    mount(<Book loading={{borrowBooksLoading : false, returnBooksLoading: false}} title='' books={[]} btnTitle='' btnFunction='' />)
  })
  describe('render', () => {
    //  Test : Component gets rendered individually
    it('should render the book', () => {
      const book = [{
        'id': '1',
        'title': 'Title',
        'author': 'Author',
        'publisher': 'Publisher',
        'owner': '0xba21a9b09d528b2e1726d786a1d1b861032dba87',
        'borrower': '0x0000000000000000000000000000000000000000',
        'state': '0',
        'dateAdded': '1493054441',
        'dateIssued': '0'
      }]
      const loading = {
        borrowBooksLoading : false,
        returnBooksLoading : false
      }
      const btnTitle = '';
      const actual = shallow(<Book loading={loading} title='My Books' books={book} btnTitle='' btnFunction='' />)
      const expected = (
          <p className='lead'>My Books</p>
      )
      expect(actual.contains(expected)).toEqual(true)
    })
  })
})
