import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../components/Header'
import { SingleBeach } from '../components/SingleBeach'
import { Favorite } from 'components/Favorite'
import ReviewForm from '../components/ReviewForm'
import ReviewFeed from '../components/ReviewFeed'

import { API_URL } from '../utils/urls'
import { getCookie } from 'utils/cookieHelper'

export const Beach = () => {
  const { id } = useParams()

  const [beach, setBeach] = useState({})
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchBeach = async () => {
    setIsLoading(true)
    try {
      const data = await fetch(`${API_URL('beach')}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('accessToken'),
        },
      })
      const res = await data.json()
      setBeach(res.beach)
      setReviews(res.reviews)
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false)
  }

  const updateFavorite = () => {
    fetch(`${API_URL('beach')}/${beach.id}/favorite`, {
      method: beach.isFavorite ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetchBeach()
      })
  }

  useEffect(() => {
    fetchBeach()
  }, [])

  if (isLoading && !beach) {
    return <div>Laddar..</div>
  }

  return (
    <>
      <Header />
      <div className="beach-page-container">
        <div className="beach-and-form">
          {beach.isFavorite && <h2>Är en favvo beach</h2>}

          <SingleBeach beach={beach} />

          {beach?.id && (
            <Favorite
              beachId={beach.id}
              isFavorite={beach.isFavorite}
              updateFavorite={updateFavorite}
            />
          )}

          <ReviewForm updateReviews={fetchBeach} />
        </div>
        <div className="review-feed-container">
          <ReviewFeed reviews={reviews} />
        </div>
      </div>
    </>
  )
}
