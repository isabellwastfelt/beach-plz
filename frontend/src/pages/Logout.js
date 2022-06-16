import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { setCookie } from 'utils/cookieHelper'

const Logout = () => {
  useEffect(() => {
    setCookie('accessToken', null, 0)
  }, [])

  return <Navigate to="/" />
}

export default Logout
