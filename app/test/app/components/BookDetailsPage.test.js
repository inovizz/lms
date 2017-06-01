import React from 'react'
import { shallow } from 'enzyme'
import { BookDetailsPage, mapStateToProps } from '../../../components/BookDetailsPage'
import BookInfo from '../../../components/utils/BookInfo'
import CommentList from '../../../components/utils/CommentList'

describe('BookDetailsPage',() => {
  let component, props;
  beforeEach(() => {
    props = {
      accounts: { members: { '0x0': { name: 'User' } } },
      books: { allBooks: [{ title: 'Book', id: '1', comments:['c'] }] },
      match: { params: { id: '1' } }
    }
    component = shallow(<BookDetailsPage {...props} />)
  })
  it('mapStateToProps',() => {
    const state = { accounts: props.accounts, books: props.books }
    expect(mapStateToProps(state)).toEqual({ accounts: props.accounts, books: props.books })
  })
  it('should have a BookInfo Component', () => {
    expect(component.find(BookInfo).exists()).toBe(true)
  })
  it('should have a CommentList Component', () => {
    expect(component.find(CommentList).exists()).toBe(true)
  })
  it('No Books matching id',() => {
    props.match.params.id = '2'
    component = shallow(<BookDetailsPage {...props} />)
    expect(component.find(BookInfo).exists()).toBe(false)
    expect(component.find(CommentList).exists()).toBe(false)
  })
  it('comments undefined',() => {
    props.books.allBooks[0].comments = undefined
    component = shallow(<BookDetailsPage {...props} />)
    expect(component.find(BookInfo).exists()).toBe(true)
    expect(component.find(CommentList).exists()).toBe(false)
  })
  it('No Comments',() => {
    props.books.allBooks[0].comments = []
    component = shallow(<BookDetailsPage {...props} />)
    expect(component.find(BookInfo).exists()).toBe(true)
    expect(component.find(CommentList).exists()).toBe(false)
  })
  it('No Account',() => {
    props.accounts = undefined
    component = shallow(<BookDetailsPage {...props} />)
    expect(component.find(CommentList).props().members).toBe('')
  })
})
