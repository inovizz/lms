import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { App } from '../../../components/App'

describe('App', () => {
  describe('render', () => {
    //  Test : Component gets rendered individually
    it('should render the App', () => {
      const actual = shallow(<App getOwnerDetails={() => { }} ownerDetails={[]} loading={ { ownerDetailsLoading:true } }/>)
      const expected = (
        <div>Loading...</div>
      )
      expect(actual.contains(expected)).toEqual(true)
    })
  })
})
