import React from 'react'

const OwnerDetails = ({ data, logout }) => {
  return (
    <div className='dropdown nav navbar-left' style={{ verticalAlign: 'bottom' }}>
      <button
        className='btn btn-default'
        id='dLabel'
        type='button'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'>
        <span className='glyphicon glyphicon glyphicon-user'></span>&nbsp;&nbsp;
        <strong>{data.name}</strong> &nbsp; &nbsp;
        <span className='caret'></span>
      </button>
      <ul className='dropdown-menu' aria-labelledby='dLabel' style={{ height: '50px', textAlign: 'center', cursor: 'pointer' }}>
        <li onClick={() => logout()} style={{ lineHeight: '40px', verticalAlign: 'middle' }}>
          <span className='glyphicon glyphicon glyphicon-off'></span>
          &nbsp;&nbsp;
          <strong>Logout</strong>
        </li>
      </ul>
    </div>
  )
}

export default OwnerDetails
