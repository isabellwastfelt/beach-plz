import React from 'react'

export const Header = () => {
  return (
    <div className='header'>
      <ul>
        <li>
          <a href='/main'>Alla bad</a>
        </li>
        <li>
          <a href='/profile'>Din profil</a>
        </li>
        <li>
          <a href='/'>Logga ut</a>
        </li>
      </ul>
    </div>
  )
}
