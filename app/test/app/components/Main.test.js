import React from 'react'
import { mount, shallow } from 'enzyme'
import { Main } from '../../../components/Main'

describe('Main', () => {
  //  Test : Components and its child renders without crashing
  it('renders without crashing', () => {
    mount(<Main account='0xb' books={[]} getAllBooks={() => { }} />)
  })
  describe('render', () => {
    //  Test : Component gets rendered individually
    it('should render the Main', () => {
      const actual = shallow(<Main account='0xb' books={[]} getAllBooks={() => { }} />)
      const expected = (
        <p> There are no books available </p>
      )
      expect(actual.contains(expected)).toEqual(true)
    })
  })
})
