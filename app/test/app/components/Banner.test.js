import React from 'react'
import { shallow } from 'enzyme'
import Banner from '../../../components/Banner'

describe('Banner', () => {
  let component
  beforeEach(() => {
    component = shallow(<Banner />)
  })
  it('has a yogalogo class', () => {
    expect(component.find('.yogalogo').exists()).toEqual(true)
  })
  it('has a company logo', () => {
    expect(component.find('img').props().src).toEqual('http://www.pramati.com/wp-content/uploads/2017/03/Triad-01.png')
  })
  it('has a header',() => {
    expect(component.find('h1').text()).toEqual('Yoga for the mind')
  })
  it('has a sub header',() => {
    expect(component.find('h4').text()).toEqual('Get Rewarded for Reading')
  })
})
