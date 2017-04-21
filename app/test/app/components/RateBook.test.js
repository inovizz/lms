import React from 'react'
import { render } from 'react-dom'
import { mount, shallow } from 'enzyme'
import RateBook from '../../../components/RateBook'

describe('RateBook', () => {
  //  Test : Components and its child renders without crashing
  it('renders without crashing', () => {
    mount(<RateBook loading={false}/>)
  })
  describe('render', () => {
    //  Test : Component gets rendered individually
    it('should render the book form', () => {
      const actual = shallow(<RateBook loading={false}/>)
      const expected = (
        <label htmlFor='comment' className='col-sm-3 control-label'>Comment</label>
      )
      expect(actual.contains(expected)).toEqual(true)
    })
  })
})
