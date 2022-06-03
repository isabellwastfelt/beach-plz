import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import user from '../reducers/user'
const api = 'http://localhost:9090'

export const Registration = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('registration')
  const [error, setError] = useState('')

  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    }
    fetch(`${api}/registration`(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            const userId = data.userId
            const accessToken = data.accessToken
            const username = data.username
            dispatch(user.actions.setUserId(userId))
            dispatch(user.actions.setAccessToken(accessToken))
            dispatch(user.actions.setUsername(username))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response))
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setUsername(null))
          })
          setError('Sorry, this is an invalid username or password')
        }
      })
  }

  return (
    <>
      <main className='login-container'>
        <form onSubmit={onFormSubmit} className='form-container'>
          <label htmlFor='username'>Register </label>
          <h3>Username:</h3>
          <input
            type='text'
            id='username'
            placeholder='enter username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <h3>Password:</h3>
          <input
            type='password'
            id='password'
            placeholder='enter password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className='error'>{error}</div>
          {/* <button
            className='submit-button'
            type='submit'
            id='login'
            onClick={() => setMode('login')}
          >
            <p>Log in</p>
          </button> */}
          <button
            className='submit-button'
            type='submit'
            id='registration'
            onClick={() => setMode('registration')}
          >
            <p>Sign up</p>
          </button>
        </form>
      </main>
    </>
  )
}
