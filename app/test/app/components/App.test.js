import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { App } from '../../../components/App'

describe('App', () => {
  //  Test : Components and its child renders without crashing
  it('renders without crashing', () => {
    mount(<App getOwnerDetails={() => { }} getAllBooks={() => { }} books={[]} />)
  })
  describe('render', () => {
    //  Test : Component gets rendered individually
    it('should render the App', () => {
      const actual = shallow(<App getOwnerDetails={() => { }} getAllBooks={() => { }}  books={[]}/>)
      const expected = (
        <div>Loading...</div>
      )
      expect(actual.contains(expected)).toEqual(true)
    })
  })
})

