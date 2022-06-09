import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getCookie } from 'utils/cookieHelper'

//COMPONENTS
import { Footer } from './components/Footer'
import { Header } from './components/Header'

//PAGES
import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { Review } from './pages/Review'
import { Profile } from './pages/Profile'

export const App = () => {
  const isLoggedIn = () => getCookie('accessToken') || false

  return (
    <>
      <div>
        <Header />
      </div>
      <BrowserRouter>
        <Routes>
          {isLoggedIn && (
            <>
              <Route path='/main' element={<Main />} />
              <Route path='/review/:beach' element={<Review />} />
              <Route path='/profile' element={<Profile />} />
            </>
          )}
          <>
            <Route path='/' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
          </>
        </Routes>
      </BrowserRouter>
      <div>
        <Footer />
      </div>
    </>
  )
}
