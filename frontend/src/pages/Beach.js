import React, { useState, useEffect } from 'react'
import ReviewForm from '../components/ReviewForm'
import { SingleBeach } from '../components/SingleBeach'
import ReviewFeed from '../components/ReviewFeed'
import { Header } from '../components/Header'

import { getCookie } from 'utils/cookieHelper'

// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

const API = process.env.API_URL || 'http://localhost:9090/'

export const Beach = () => {
  //fetch reviews
  const [reviews, setReviews] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const fetchReviews = async () => {
    setIsLoading(true)
    try {
      const data = await fetch(`${API}review`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res = await data.json()

      setReviews(res)
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false)
  }

  const onDelete = (reviewId) => {
    setIsLoading(true)
    const accessToken = getCookie('accessToken')

    fetch(`${API}review/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetchReviews()
      })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  if (isLoading) {
    return <div>Laddar..</div>
  }

  return (
    <div>
      <Header />
      <SingleBeach />
      <ReviewForm updateReviews={fetchReviews} />
      <ReviewFeed reviews={reviews} onDelete={onDelete} />
    </div>
  )
}
