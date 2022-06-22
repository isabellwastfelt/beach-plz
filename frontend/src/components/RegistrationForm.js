import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { API_URL } from '../utils/urls'

//LOGO
import BlackWhite from 'assets/BlackWhite.svg'

export const RegistrationForm = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [result, setResult] = useState(false)
  const [error, setError] = useState(null)

  const onRegister = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    }

    fetch(`${API_URL('registration')}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResult(true)
        } else {
          setError('Tyvärr, det gick inte att registera denna användare.')
        }
      })
  }

  if (result) {
    return <Navigate to="/" />
    //  ( <main className="main-container">
    //     <img className="logo-img" src={BlackWhite} alt="Logo" />
    //     <div className="continue-container">
    //       <p>
    //         <Link to="/">Fortsätt till login</Link>
    //       </p>
    //     </div>
    //   </main>
    // )
  }

  return (
    <main className="main-container">
      <img className="logo-img" src={BlackWhite} alt="Logo" />
      <p className="tagline">Var ska du bada idag?</p>
      <form className="login-form" onSubmit={onRegister}>
        <h3 className="login-headline">Registrera dig här</h3>
        <label className="form-label" htmlFor="username">
          Användarnamn:
        </label>
        <input
          type="text"
          id="username"
          placeholder="Användarnamn"
          onChange={(event) => setUsername(event.target.value)}
        />

        <label className="form-label" htmlFor="password">
          Lösenord:
        </label>
        <input
          type="password"
          id="password"
          placeholder="Lösenord"
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="error">{error}</div>

        <button className="submit-button" type="submit" id="registration">
          Registrera
        </button>
        <Link className="register-link" to="/">
          Har du redan ett konto? <b>Logga in här!</b>
        </Link>
      </form>
    </main>
  )
}
