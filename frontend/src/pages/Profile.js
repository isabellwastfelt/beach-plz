import React, { useState, useEffect } from 'react'
import { ProfileBeaches } from '../components/ProfileBeaches'
import { ProfileFeed } from '../components/ProfileFeed'
import ReviewFeed from '../components/ReviewFeed'
import { Header } from 'components/Header'
import { API_URL } from '../utils/urls'

import { getCookie } from '../utils/cookieHelper'

export const Profile = () => {
  const [reviews, setReviews] = useState([])

  const fetchReviews = async () => {
    const accessToken = getCookie('accessToken')

    try {
      const data = await fetch(`${API_URL('review')}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      })
      const res = await data.json()
      setReviews(res)
    } catch (err) {
      console.error(err)
    }
  }

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
        <h1>Din profil</h1>
        <div>
          <ProfileBeaches />
        </div>
        <div>
          <ReviewFeed reviews={reviews} onDelete={onDelete} />
        </div>
        <div>
          <ProfileFeed />
        </div>
      </>
    </div>
  )
}
