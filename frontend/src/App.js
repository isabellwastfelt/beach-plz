import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './components/Login'
import { Registration } from './components/Registration'
import Reviews from './components/Reviews'

import { getCookie } from 'utils/cookieHelper'
// const api = 'http://localhost:9090'

export const App = () => {
  const isLoggedIn = () => getCookie('accessToken') || false

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn && (
          <>
            <Route path='/reviews' element={<Reviews />} />
            <Route path='/registration' element={<Registration />} />
          </>
        )}
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
