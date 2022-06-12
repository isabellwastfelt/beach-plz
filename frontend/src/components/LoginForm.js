import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { setCookie } from 'utils/cookieHelper'

import BlackGreen from 'assets/BlackGreen.svg'

// .env  API_URL="https://beach-plz.herokuapp.com/"
const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

export const LoginForm = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    }

    fetch(`${API}login`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // make login actions
          setCookie('accessToken', data.accessToken)
          setIsLoggedIn(true)
        } else {
          setError('Sorry, this is an invalid username or password')
        }
      })
  }

  if (isLoggedIn) {
    return <Navigate to='/main' />
  }

  return (
    <main className='login-container'>
      <img className='logo-img' src={BlackGreen} alt='Logo' />
      <form onSubmit={onFormSubmit}>
        <h3>Vänligen logga in</h3>
        <label htmlFor='username'>Användarnamn:</label>
        <input
          type='text'
          id='username'
          placeholder='Användarnamn'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor='password'>Lösenord:</label>
        <input
          className='password'
          type='password'
          id='password'
          placeholder='Lösenord'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className='error'>{error}</div>
        <button className='submit-button' type='submit' id='login'>
          Logga in
        </button>
        <Link className='register-link' to='/registration'>
          Inget konto? Registrera dig här!
        </Link>
      </form>
    </main>
  )
}
