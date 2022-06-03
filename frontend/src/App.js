import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Reviews from './components/Reviews'

export const App = () => {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Reviews />} />
      </Routes>
    </BrowserRouter>
    // </Provider>
  )
}
