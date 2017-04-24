import React from 'react'
import { render } from 'react-dom'
import { mount, shallow } from 'enzyme'
import OwnerDetails from '../../../components/OwnerDetails'

describe('OwnerDetails', () => {
  //  Test : Components and its child renders without crashing
  it('renders without crashing', () => {
    mount(<OwnerDetails data={[]} />)
  })
  describe('render', () => {
    //  Test : Component gets rendered individually
    it('should render the book', () => {
      const data = ['Anurag', 'Ox12', '', '']
      const actual = shallow(<OwnerDetails data={data} />)
      const expected = (
        <strong>{data[0]}</strong>
      )
      expect(actual.contains(expected)).toEqual(true)
    })
  })
})
