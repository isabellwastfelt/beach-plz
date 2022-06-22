import React, { useState, useEffect } from 'react'
import { ProfileFeed } from '../components/ProfileFeed'
import { Header } from 'components/Header'
import { API_URL } from '../utils/urls'

import { getCookie } from '../utils/cookieHelper'

// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'
// const API = process.env.API_URL || 'http://localhost:9090/'

export const Profile = () => {
  const [reviews, setReviews] = useState([])

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
          <div className="profile-feed-container">
            <ProfileFeed reviews={reviews} onDelete={onDelete} />
          </div>
        </div>
      </>
    </div>
  )
}
