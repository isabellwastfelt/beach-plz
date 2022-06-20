import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import BlackGreen from 'assets/BlackGreen.svg'

// .env  API_URL="https://beach-plz.herokuapp.com/"
// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

const API = process.env.API_URL || 'http://localhost:9090/'

export const RegistrationForm = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [result, setResult] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const onRegister = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    }

    fetch(`${API}registration`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResult(true)
        } else {
          setError('Sorry, registration didnt go through')
        }
      })
  }

  if (result) {
    return (
      <main className="main-container">
        <img className="logo-img" src={BlackGreen} alt="Logo" />
        <div className='continue-container'>
          <p>
          <Link to="/">Fortsätt till login</Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="main-container">
      <img className="logo-img" src={BlackGreen} alt="Logo" />
      <form className="login-form" onSubmit={onRegister}>
        <h3 className='login-headline'>Registrera dig här</h3>
        <label className='form-label' htmlFor="username">Användarnamn:</label>
        <input
          type="text"
          id="username"
          placeholder="Användarnamn"
          onChange={(event) => setUsername(event.target.value)}
        />

        <label className='form-label' htmlFor="password">Lösenord:</label>
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
