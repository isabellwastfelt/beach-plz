import React, { useEffect, useState } from 'react'
import { getCookie } from 'utils/cookieHelper'
import { useParams } from 'react-router-dom'

const API = process.env.API_URL || 'http://localhost:9090/'

export const Favorite = ({ updateFavorite }) => {
  const [newFavorite, setNewFavorite] = useState('')

  const { id } = useParams()

  const handleOnLike = (event) => {
    event.preventDefault()

    const accessToken = getCookie('accessToken')

    fetch(`${API}profile/favorite/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ favorite: newFavorite }),
    })
      .then((res) => res.json())
      .then(() => {
        updateFavorite()
        setNewFavorite('')
      })
  }

  return (
    <div>
      <button onClick={handleOnLike}> Lägg till i favoriter</button>
    </div>
  )
}