import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../../components/Header'

describe('Header', () => {
  let component
  beforeEach(() => {
    const props = {
      loginSuccess: jest.fn(),
      loginFailure: jest.fn(),
      session: {
        authenticated: false,
        user: ''
      }
    }
    component = shallow(<Header {...props}/>)
  })
  it('has a navbar brand', () => {
    expect(component.find('.navbar-brand').exists()).toEqual(true)
  })
  it('has a company logo', () => {
    expect(component.find('img').props().src).toEqual('test_file_stub')
  })
  it('has a li',() => {
    expect(component.find('li').length).toEqual(2)
  })
  it('has a login class',() => {
    expect(component.find('.glyphicon-user').exists()).toEqual(true)
  })
})
