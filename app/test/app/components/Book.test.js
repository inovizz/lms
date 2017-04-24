import React from 'react'
import { render } from 'react-dom'
import { mount, shallow } from 'enzyme'
import Book from '../../../components/Book'

describe('Book', () => {
  //  Test : Components and its child renders without crashing
  it('renders without crashing', () => {
    mount(<Book books='' />)
  })
  describe('render', () => {
    //  Test : Component gets rendered individually
    it('should render the book', () => {
      const data = 
      '1;Title;Author;Publisher;e17272941ba48157483995d4df1746675a45f515;0000000000000000000000000000000000000000;0;1492856301;0|2;Title1;Author2;Publisher3;e17272941ba48157483995d4df1746675a45f515;0000000000000000000000000000000000000000;0;1492856394;0'
      const actual = shallow(<Book books={data} />)
      const expected = (
        <div className='media-body'>
            <h4 className='media-heading'>Title</h4>
            <p><span>Author : </span> Author</p>
            <p><span>Publisher : </span> Publisher</p>
            <p></p>
        </div>
      )
      expect(actual.contains(expected)).toEqual(true)
    })
  })
})
