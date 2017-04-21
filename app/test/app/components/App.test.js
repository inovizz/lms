import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { App } from '../../../components/App'

describe('App', () => {
  describe('render', () => {
    //  Test : Component gets rendered individually
    it('should render the App', () => {
      const props = {
        getMemberDetailsByEmail: jest.fn(),
        logout: jest.fn(),
        session: {
          authenticated: false,
          user: {}
        }
      }
      const actual = shallow(<App {...props}/>)
      const expected = (
        <div>Logged out</div>
      )
      expect(actual.contains(expected)).toEqual(true)
    })
  })
})
