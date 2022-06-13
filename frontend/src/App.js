import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getCookie } from 'utils/cookieHelper'

//COMPONENTS
import { Footer } from './components/Footer'

//PAGES
import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { Review } from './pages/Review'
import { Profile } from './pages/Profile'

export const App = () => {
  const isLoggedIn = () => getCookie('accessToken') || false

  // React.useEffect(() => {
  //   const menuWrap = document.querySelector('.bm-menu-wrap')
  //   if (menuWrap) {
  //     menuWrap.setAttribute('aria-hidden', true)
  //   }
  // }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          {isLoggedIn && (
            <>
              <Route path='/main' element={<Main />} />
              <Route path='/review/:id' element={<Review />} />
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
