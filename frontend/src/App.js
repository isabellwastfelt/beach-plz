import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Login } from './components/Login'
import { Registration } from './components/Registration'
import Reviews from './components/Reviews'
// const api = 'http://localhost:9090'

import user from './reducers/user'

const reducer = combineReducers({
  user: user.reducer,
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Reviews />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
