import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Provider } from 'react-redux'

export const App = () => {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/beaches' element={<Beaches />} />
        <Route path='/review' element={<Review />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    // </Provider>
  )
}
