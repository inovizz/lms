import React from 'react'
import { mount } from 'enzyme'
import { mapStateToProps, BooksForm } from '../../../components/BooksForm'

describe('BooksForm', () => {
  let component, props
  beforeEach(function () {
    props = {
      loading: {
        addBooksLoading: true
      },
      closeModal: jest.fn(),
      ownerDetails: {},
      addBook: jest.fn()
    }
    component = mount(<BooksForm {...props} />)

  })
  it('should submit form',() => {
    const e = { preventDefault: jest.fn() }
    component.find('form').simulate('submit', e)
    expect(e.preventDefault.mock.calls.length).toBe(1)
    expect(props.closeModal.mock.calls.length).toBe(1)
    expect(props.addBook.mock.calls.length).toBe(1)
  })
  it('should close form on click of "X" icon',() => {
    component.find('.close-btn').simulate('click')
    expect(props.closeModal.mock.calls.length).toBe(1)
  })
  it('should have a loader',() => {
    expect(component.find('p.text-info.text-center').text()).toBe('Adding a new book.')
  })
  it('should not have a loader',() => {
    props.loading.addBooksLoading = false
    component = mount(<BooksForm {...props} />)
    expect(component.find('p.text-info.text-center').exists()).toBe(false)
  })
  it('should test if props are mapped correctly', () => {
    const state = {
      loading: { addBooksLoading: false },
      session: {
        user: {}
      }
    }
    const output = mapStateToProps(state)
    expect(output).toEqual({
      loading: { addBooksLoading: false },
      ownerDetails: {}
    })
  })

})
