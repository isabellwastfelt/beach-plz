import React, { useEffect, useState } from 'react'
import { getCookie } from 'utils/cookieHelper'
import { useParams } from 'react-router-dom'

import { API_URL } from '../utils/urls'

export const Favorite = ({ updateFavorites }) => {
  const [newFavorite, setNewFavorite] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()

  const handleOnLike = (event) => {
    event.preventDefault()

    const accessToken = getCookie('accessToken')

    fetch(`${API_URL('beach')}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ favorite: newFavorite }),
    })
      .then((res) => res.json())
      .then(() => {
        updateFavorites()
        setNewFavorite('')
      })
  }

  if (isLoading) {
    return <div>Laddar..</div>
  }

  return (
    <div>
      <button onClick={handleOnLike}> Lägg till i favoriter</button>
    </div>
  )
}
