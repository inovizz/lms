import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App'
import BooksPage from './BooksPage'
import RequestAuthentication from './RequestAuthentication'

const Main = ({ authenticated }) => (
  <Switch>
    <Route exact path='/' component={BooksPage} />
    <Route path='/books' component={RequestAuthentication(App)} />
  </Switch>
)

export default Main
