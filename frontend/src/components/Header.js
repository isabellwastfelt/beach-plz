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

// import { slide as Menu } from 'react-burger-menu'

// const toggleMenu = ({ isOpen }) => {
//   const menuWrap = document.querySelector('.bm-menu-wrap')
//   isOpen
//     ? menuWrap.setAttribute('aria-hidden', false)
//     : menuWrap.setAttribute('aria-hidden', true)
// }

// export const BurgerMenu = () => {
//   return (
//     <Menu noOverlay onStateChange={toggleMenu}>
//       <a className='menu-item' href='/'>
//         Home
//       </a>
//       <a className='menu-item' href='/about'>
//         About
//       </a>
//       <a className='menu-item' href='/contact'>
//         Contact
//       </a>
//     </Menu>
//   )
// }
