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
        if(this.props.user[0]) {
          this.props.login(this.password.value)
        } else {
          this.props.createAccount(this.password.value)
        }
        this.props.closeModal()
        this.refs.authForm.reset()
      }}>
        <fieldset>
          <legend>
            Sign In
            <span className='glyphicon glyphicon-remove close-btn' onClick={() => this.props.closeModal()}></span>
          </legend>
          <div className='form-group row'>
                <p className='text-center text-info col-sm-8 col-sm-offset-2'>
                  Enter password to create account or log in to the existing account
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
