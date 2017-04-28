import React from 'react'
import OwnerDetails from './OwnerDetails'
import { NavLink } from 'react-router-dom'

const Header = ({ ownerDetails }) => (
  <nav className='navbar'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <a href='http://www.pramati.com/' className='navbar-brand'>
          <img className='logo logo-light' alt='Pramati Technologies' src='http://www.pramati.com/wp-content/uploads/2016/11/logo_pramati_trans_152.png' />
        </a>
      </div>
      <div id='navbar' className='navbar-collapse collapse navbar-right'>
        <ul className='nav navbar-nav'>
          <li>
            <NavLink exact to='/' activeClassName='active'>Home</NavLink>
          </li>
          <li>
            <NavLink exact to='/books' activeClassName='active'>Dashboard</NavLink>
          </li>
        </ul>
        {
          ownerDetails
            ? <OwnerDetails data={ownerDetails} />
            : ''
        }
      </div>
    </div>
  </nav>
)

export default Header