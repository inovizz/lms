import React from 'react'

export class RateBook extends React.Component {
  constructor (props) {
    super(props)
    this.rate = {
      rating: '',
      comment: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.loading) {
      nextProps.closeModal()
    }
  }
  rateBook () {
    const rating = this.rate.rating.value
    const comment = this.rate.comment.value
    this.props.rateBook(rating, comment)
  }
  render () {
    return (
      <form className='form-horizontal' ref='rateForm' onSubmit={(e) => {
        e.preventDefault()
        this.rateBook()
        this.refs.rateForm.reset()
      }}>
        <fieldset>
          <legend>
            Rate
            <span className='glyphicon glyphicon-remove close-btn' onClick={() => this.props.closeModal()}></span>
          </legend>
          {
            this.props.loading
            ? <div className='form-group'>
                <p className='text-center text-info'>
                  Submitting ratings.
                </p>
              </div>
            : ''
          }
          <div className='form-group'>
            <label htmlFor='rate' className='col-sm-3 control-label'>Ratings</label>
            <div className='col-sm-9'>
            <select className='form-control' id='rate' onChange={(e) => { this.rate.rating = e.target }}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='comment' className='col-sm-3 control-label'>Comment</label>
            <div className='col-sm-9'>
              <input type = 'text'
                className = 'form-control'
                id = 'comment'
                placeholder = 'Comment'
                ref = {
                  (node) => {
                    this.rate.comment = node
                  }
                }
                required />
            </div>
          </div>
          <div className='form-group'>
            <div className='text-center'>
              <button type='submit' className='btn btn-default' disabled={this.props.loading}>Rate</button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default RateBook
