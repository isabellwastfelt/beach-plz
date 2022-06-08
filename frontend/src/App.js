import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginForm } from './components/LoginForm'
import { RegistrationForm } from './components/RegistrationForm'
import ReviewForm from './components/ReviewForm'
import { Main } from './pages/Main'

import { getCookie } from 'utils/cookieHelper'

export const App = () => {
  const isLoggedIn = () => getCookie('accessToken') || false

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn && (
          <>
            <Route path='/main' element={<Main />} />
            <Route path='/reviews' element={<ReviewForm />} />
            <Route path='/registration' element={<RegistrationForm />} />
          </>
        )}
        <Route path='/' element={<LoginForm />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
