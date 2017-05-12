import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Dashboard from './Dashboard'
import Header from './Header'

const mapStateToProps = (state, ownProps) => {
  return {
    session: state.session
  }
}

export class App extends React.Component {
  componentDidMount () {
    // disabling the Loader screen screen
    const loader = document.getElementById('loader')
    if (loader) {
      loader.style.display = 'none'
    }
  }
  render () {
    return (
      <div>
        <Header
          loginSuccess = {
            (response) => this.props.getMemberDetailsByEmail(response)
          }
          loginFailure = {
            (response) => { console.log(response) }
          }
          session={ this.props.session }
          logout = {
            () => this.props.logout()
          } />
        <div className='container'>
          {
            this.props.session.authenticated
            ? <Dashboard owner={this.props.session.user}/>
            : <div>Logged out</div>
          }
        </div>
      </div>)
  }
}

export default connect(mapStateToProps, libraryActions)(App)
