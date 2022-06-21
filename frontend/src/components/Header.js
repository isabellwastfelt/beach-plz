import React from 'react'
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
            <a href="/main">
              <img className="nav-logo-img" src={BlackWhite} alt="Logo" />
            </a>
          </div>
          <ul className="menu-items">
            <li>
              <a href="/main">Alla bad</a>
            </li>
            <li>
              <a href="/profile">Din Profil</a>
            </li>
            <li>
              <a href="/Logout">Logga ut</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
