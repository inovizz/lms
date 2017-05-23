import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'
import Loader from './Loader'

export class BookAction extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault();
    const actionType = this.checkActionType();
    if(actionType === 1) { this.props.borrowBook(this.props.book, this.props.ownerDetails) }
    else if(actionType === 2) { this.props.returnBook(this.props.book) }
    this.props.closeModal()
  }
  checkActionType () {
    if (this.props.book.state === '0') {
      return 1 // User is borrowing book
    } else if(this.props.isOwner) {
      return 2 // Owner is returning book
    } else {
      return 3 // Borrower is returning book
    }
  }
  componentDidMount () {
    const actionType = this.checkActionType();
    const account = (actionType === 1 || actionType === 3) ? this.props.book.owner : this.props.book.borrower
    this.props.getMemberDetailsByAccount(account)
  }
  renderBookAction () {
    const actionType = this.checkActionType();
    const info = actionType === 1
                 ? 'Please contact the book owner for pick up.'
                 : actionType === 2
                    ? 'Click "Return" to confirm that the book has been returned to you.'
                    : 'Please return book to the owner.'
    const buttonText = actionType === 1
                       ? 'Borrow'
                       : actionType === 2
                          ? 'Return'
                          : 'Close'
    return (
      <form className='form-horizontal' onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>
            {actionType === 1 ? "Borrow Book" : "Return Book"}
            <span className='glyphicon glyphicon-remove close-btn' onClick={() => this.props.closeModal()}></span>
          </legend>
          <div className='row'>
            <p className='lead'>{info}</p>
            {
              this.props.accounts && this.props.accounts.member &&
              <table className='table table-striped'>
                {
                  actionType === 2 &&
                  <tbody>
                    <tr>
                      <td>Book Title</td>
                      <td>{this.props.book.title}</td>
                    </tr>
                    <tr>
                      <td>Author</td>
                      <td>{this.props.book.author}</td>
                    </tr>
                    <tr>
                      <td>Publisher</td>
                      <td>{this.props.book.publisher}</td>
                    </tr>
                    <tr>
                      <td>Borrowed By</td>
                      <td>{this.props.accounts.member.name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{this.props.accounts.member.email}</td>
                    </tr>
                  </tbody>
                }
                {
                  actionType !== 2 &&
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{this.props.accounts.member.name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{this.props.accounts.member.email}</td>
                    </tr>
                  </tbody>
                }
              </table>
            }
          </div>
          <div className='form-group'>
            <div className='col-sm-6 text-right'>
              <button type='submit' className='btn btn-default'>
              { buttonText }
              </button>
            </div>
            {
              (actionType === 1 || actionType === 2) &&
              <div className='col-sm-6 text-left'>
                <button className='btn btn-default' onClick={() => this.props.closeModal()}>
                  Close
                </button>
              </div>
            }
          </div>
        </fieldset>
      </form>
    )
  }
  render () {
    return this.props.loading
            ? <Loader text='Retrieving Information' />
            : this.renderBookAction()
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    loading: state.loading.getMemberDetailsLoader
  }
}

export default connect(mapStateToProps, libraryActions)(BookAction)
