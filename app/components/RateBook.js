import React from 'react'

export class RateBook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rating: '1',
      comment: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.changeComment = this.changeComment.bind(this)
    this.rateBook = this.rateBook.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.loading) {
      nextProps.closeModal()
    }
  }
  handleChange (e) {
    this.setState({
      rating: e.target.value
    })
  }
  changeComment (e) {
    this.setState({
      comment: e.target.value
    })
  }
  rateBook (e) {
    e.preventDefault()
    const rating = this.state.rating
    const comment = this.state.comment
    this.props.rateBook(rating, comment)
    this.props.closeModal()
    this.setState({
      rating: '1',
      comment: ''
    })
  }
  render () {
    return (
      <form className='form-horizontal' ref='rateForm' onSubmit={this.rateBook}>
        <fieldset>
          <legend>
            Rate
            <span className='glyphicon glyphicon-remove close-btn' onClick={() => this.props.closeModal()}></span>
          </legend>
          <div className='form-group'>
            <label htmlFor='rate' className='col-sm-3 control-label'>Ratings</label>
            <div className='col-sm-9'>
            <select className='form-control' id='rate' onChange={this.handleChange} value={this.state.rating}>
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
              <textarea
                className = 'form-control'
                id = 'comment'
                placeholder = 'Comment'
                onChange={this.changeComment}
                rows = '9'
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
