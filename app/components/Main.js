import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import App from './App'
import BooksPage from './BooksPage'

const Main = () => (
  <Switch>
    <Route exact path='/' component={BooksPage} />
    <Route path='/books' component={App} />
  </Switch>
)

export default Main
