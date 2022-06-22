import React from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from 'utils/cookieHelper'

import BlackWhite from 'assets/BlackWhite.svg'

export const Header = () => {
  const isLoggedIn = () => getCookie('accessToken')

  if (!isLoggedIn) {
    return null
  }
  return (
    <div className="header-container">
      <nav className="navbar">
        <div className="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <div className="navbar-logo">
            <Link to="/main">
              <img className="nav-logo-img" src={BlackWhite} alt="Logo" />
            </Link>
          </div>
          <ul className="menu-items">
            <li>
              <Link to="/main">Alla bad</Link>
            </li>
            <li>
              <Link to="/profile">Din Profil</Link>
            </li>
            <li>
              <Link to="/Logout">Logga ut</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
