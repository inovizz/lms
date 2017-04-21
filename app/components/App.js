import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Dashboard from './Dashboard'
import Header from './Header'

const mapStateToProps = (state, ownProps) => {
  return {
    ownerDetails : state.ownerDetails,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerDetails: () => {
      dispatch(libraryActions.getOwnerDetails())
    }
  }
}

export class App extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    if (!this.props.ownerDetails) {
      this.props.getOwnerDetails()
    }
  }

  render () {
    const ownerDetails = this.props.loading.ownerDetailsLoading ? '' : this.props.ownerDetails
    return (
      <div>
        <Header ownerDetails={ownerDetails} />
        <div className='container'>
          {
            ownerDetails
            ? <Dashboard owner={ownerDetails}/>
            : <div>Loading...</div>
          }
        </div>
      </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
