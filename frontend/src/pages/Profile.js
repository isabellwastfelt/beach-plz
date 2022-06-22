import React, { useState, useEffect } from 'react'
import { ProfileBeaches } from '../components/ProfileBeaches'
import { ProfileFeed } from '../components/ProfileFeed'
import { Header } from 'components/Header'
import { API_URL } from '../utils/urls'

import { getCookie } from '../utils/cookieHelper'

// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'
// const API = process.env.API_URL || 'http://localhost:9090/'

export const Profile = ({ beach }) => {
  const [reviews, setReviews] = useState([])
  const [favorites, setFavorites] = useState([])

  const fetchReviews = async () => {
    const accessToken = getCookie('accessToken')

    try {
      const data = await fetch(`${API_URL('profile')}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      })
      const res = await data.json()
      console.log(res)
      setReviews(res.reviews)
      setFavorites(res.favorites)
    } catch (err) {
      console.error(err)
    }
  }

  // Delete reviews
  const onDelete = async (reviewId) => {
    const accessToken = getCookie('accessToken')

    const reviewsPost = await fetch(`${API_URL('review')}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
    const reviewRes = await reviewsPost.json()
    setReviews(reviewRes.reviews)
  }

  // Unsave favorites
  const unSave = async () => {
    const accessToken = getCookie('accessToken')

    const favoritePost = await fetch(`${API_URL('profile')}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
    const favoriteRes = await favoritePost.json()
    setFavorites(favoriteRes.favorites)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <div>
      <Header />
      <>
        <div className="profile-headline">
          <h1>Din profil</h1>
        </div>
        <div>
          <ProfileBeaches unSave={unSave} />
        </div>

        <div>
          <div className="profile-feed-container">
            <ProfileFeed reviews={reviews} onDelete={onDelete} beach={beach} />
          </div>
        </div>
      </>
    </div>
  )
}
