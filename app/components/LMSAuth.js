import React from 'react'

class LMSAuth extends React.Component {
  constructor (props) {
    super(props)
    this.password = ''
  }
  render () {
    return (
      <form className='form-horizontal' ref='authForm' onSubmit={(e) => {
        e.preventDefault()
        this.props.createAccount(this.password.value)
        this.props.closeModal()
        this.refs.authForm.reset()
      }}>
        <fieldset>
          <legend>
            Create Account
            <span className='glyphicon glyphicon-remove close-btn' onClick={() => this.props.closeModal()}></span>
          </legend>
          <div className='form-group row'>
                <p className='text-center text-info col-sm-8 col-sm-offset-2'>
                  Provide password to create account on blockchain
                </p>
              </div>
          <div className='form-group'>
            <label htmlFor='password' className='col-sm-3 control-label'>Password</label>
            <div className='col-sm-9'>
              <input type = 'password'
                className = 'form-control'
                id = 'password'
                placeholder = 'password'
                ref = {
                  (node) => {
                    this.password = node
                  }
                }
                required />
            </div>
          </div>
          <div className='form-group'>
            <div className='text-center'>
              <button type='submit' className='btn btn-default'>Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default LMSAuth
