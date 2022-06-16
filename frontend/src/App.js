import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getCookie } from 'utils/cookieHelper'

//CSS
import './navbar.css'

//COMPONENTS
import { Footer } from './components/Footer'
import { Header } from './components/Header'

//PAGES
import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { Beach } from './pages/Beach'
import { Profile } from './pages/Profile'

export const App = () => {
  const isLoggedIn = () => getCookie('accessToken') || false

  return (
    <>
      <div className='header-container'>
        <Header />
      </div>
      <BrowserRouter>
        <Routes>
          {isLoggedIn && (
            <>
              <Route path="/main" element={<Main />} />
              <Route path="/beach/:id" element={<Beach />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
          <>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </>
        </Routes>
      </BrowserRouter>
      <div>
        <Footer />
      </div>
    </>
  )
}
