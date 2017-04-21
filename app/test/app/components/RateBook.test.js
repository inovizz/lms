import React from 'react'
import { render } from 'react-dom'
import { mount, shallow } from 'enzyme'
import RateBook from '../../../components/RateBook'

describe('RateBook', () => {
  //  Test : Components and its child renders without crashing
  it('renders without crashing', () => {
    mount(<RateBook loading={false} rate/>)
  })
  describe('render', () => {
    let component, rating, comment;
    beforeEach(() => {
      const props = {
        rateBook: (r, c) => {
          rating = r
          comment = c
        },
        loading: false
      }
      component = shallow(<RateBook {...props} />)
    })
    //  Test : Component gets rendered individually
    it('should render the book form', () => {
      const expected = (
        <label htmlFor='comment' className='col-sm-3 control-label'>Comment</label>
      )
      expect(component.contains(expected)).toEqual(true)
    })

    it('has a select option',() => {
      expect(component.find('select').exists()).toEqual(true)
    })

    it('has a input for comment',() => {
      expect(component.find('input').exists()).toEqual(true)
    })

    it('has a submit button',() => {
      expect(component.find('button').exists()).toEqual(true)
    })
  })
})
