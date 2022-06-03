import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    username: null,
    accessToken: null,
    error: null,
    secretMessage: null,
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    // setSecretMessage: (store, action) => {
    //   store.secretMessage = action.payload
    // },
  },
})

export default user
