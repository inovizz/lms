import React from 'react'
import { render } from 'react-dom'
import { mount, shallow } from 'enzyme'
import { BooksForm } from '../../../components/BooksForm'

describe('BooksForm', () => {
  //  Test : Components and its child renders without crashing
  it('renders without crashing', () => {
    mount(<BooksForm isBookAdded='' addBook={[]} loading={{addBooksLoading:false}}/>)
  })
  describe('render', () => {
    //  Test : Component gets rendered individually
    it('should render the book form', () => {
      const actual = shallow(<BooksForm isBookAdded='' addBook={[]} loading={{addBooksLoading:false}} />)
      const expected = <legend>Add a book</legend>
      expect(actual.contains(expected)).toEqual(true)
    })
  })
})
