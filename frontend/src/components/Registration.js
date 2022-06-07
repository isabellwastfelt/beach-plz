import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// .env  API_URL="https://beach-plz.herokuapp.com/"
const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

export const Registration = () => {
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
      <div>
        <h2>
          Now continue to <Link to='/'>Login</Link>!
        </h2>
      </div>
    )
  }

  return (
    <main className='login-container'>
      <form onSubmit={onRegister} className='form-container'>
        <h3>Register </h3>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          placeholder='enter username'
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          placeholder='enter password'
          onChange={(event) => setPassword(event.target.value)}
        />
        {/* ADD REPEAT PASSWORD */}

        <div className='error'>{error}</div>

        <button className='submit-button' type='submit' id='registration'>
          <p>Sign up</p>
        </button>
        <Link to='/'>Already have an account? Login</Link>
      </form>
    </main>
  )
}
