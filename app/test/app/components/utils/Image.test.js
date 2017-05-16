import React from 'react'
import { render } from 'react-dom'
import { mount, shallow } from 'enzyme'
import Image from '../../../../components/utils/Image'

describe('Image', () => {

  it('renders without crashing', () => {
    mount(<Image type={true} src='https://placehold.it/450x550' />)
  })
  describe('render', () => {
    let component;
    beforeEach(() => {
      component = shallow(<Image type={true} src='https://placehold.it/450x550' />)
    })
    it('should have a class imgContainer', () => {
      expect(component.find('.imgContainer').exists()).toEqual(true)
    })
    it('should have a class loader', () => {
      expect(component.find('.loader').exists()).toEqual(true)
    })
    it('should have a img element', () => {
      expect(component.find('img').exists()).toEqual(true)
    })
    it('should have a img element with imgLarge class', () => {
      expect(component.find('img.imgLarge').exists()).toEqual(true)
    })
    it('should set new src on error', () => {
      component.find('img').simulate('error');
      expect(component.find('img').props().src).toEqual('https://placehold.it/400x500')
    })
    it('should hide the loaded on image load', () => {
      component.find('img').simulate('load');
      expect(component.find('.loader').exists()).toEqual(false)
    })
  })

  describe('render when type is false',() => {
    let component;
    beforeEach(() => {
      component = shallow(<Image type={false} src='https://placehold.it/450x550' />)
    })
    it('show have a img element with imgMedium class', () => {
      expect(component.find('img.imgMedium').exists()).toEqual(true)
    })
  })
})
