import React from 'react'
import { render } from 'react-dom'
import { mount, shallow } from 'enzyme'
import { Dashboard } from '../../../components/Dashboard'

describe('Dashboard', () => {
  describe('render', () => {
    //  Test : Component gets rendered individually
    it('should render the Dashboard', () => {
      const actual = shallow(<Dashboard allBooks={[]} ownerDetails={{}} getMyBooks={() => {}}/>)
      const expected = <div>Fetching details of the books.</div>
      expect(actual.contains(expected)).toEqual(true)
    })
  })
})
