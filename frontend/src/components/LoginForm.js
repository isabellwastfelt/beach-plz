import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { setCookie } from 'utils/cookieHelper'

import BlackWhite from 'assets/BlackWhite.svg'

// .env  API_URL="https://beach-plz.herokuapp.com/"
// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'
const API = process.env.API_URL || 'http://localhost:9090/'

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
          setError(
            'Något gick fel, användarnamn och/eller lösenord stämmer ej. Försök igen!'
          )
        }
      })
  }

  if (isLoggedIn) {
    return <Navigate to="/main" />
  }

  return (
    <main className="main-container">
      <img className="logo-img" src={BlackWhite} alt="Logo" />
      <form className="login-form" onSubmit={onFormSubmit}>
        <h3 className="login-headline">Vänligen logga in</h3>
        <label className="form-label" htmlFor="username">
          Användarnamn:
        </label>
        <input
          type="text"
          id="username"
          placeholder="Användarnamn"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label className="form-label" htmlFor="password">
          Lösenord:
        </label>
        <input
          className="password"
          type="password"
          id="password"
          placeholder="Lösenord"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="error">{error}</div>

        <button
          className="submit-button"
          type="submit"
          id="login"
          disabled={username.length < 8 || username.length > 12}
        >
          Logga in
        </button>
        <Link className="register-link" to="/registration">
          Inget konto? <b>Registrera dig här!</b>
        </Link>
      </form>
    </main>
  )
}
