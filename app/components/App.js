import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Main from './Main'

const mapStateToProps = (state, ownProps) => {
  return {
    accounts: state.accounts,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAccounts: () => {
      dispatch(libraryActions.getAccounts())
    }
  }
}

export class App extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.getAccounts()
  }

  render () {
    const Body = this.props.accounts.length
      ? (<Main accounts={this.props.accounts[0]}></Main>)
      : (<div>Loading...</div>)
    return (
      <div>
        <nav className='navbar navbar-default'>
        <div className='container-fluid'>
            <div className='navbar-header'>
                <a className='navbar-brand' href='#'>LMS</a>
            </div>
        </div>
        </nav>
        <div className='container'>
            {Body}
        </div>
      </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
