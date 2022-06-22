import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../components/Header'
import { SingleBeach } from '../components/SingleBeach'
import ReviewForm from '../components/ReviewForm'
import ReviewFeed from '../components/ReviewFeed'

import { API_URL } from '../utils/urls'

export const Beach = () => {
  const { id } = useParams()
  const [beach, setBeach] = useState({})
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchBeach = async () => {
    try {
      const data = await fetch(`${API_URL('beach')}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res = await data.json()
      setBeach(res.beach)
      setReviews(res.reviews)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchBeach()
  }, [])

  if (isLoading) {
    return <div>Laddar..</div>
  }

  return (
    <>
      <Header />
      <div className="beach-page-container">
        <div className="beach-and-form">
          <SingleBeach beach={beach} />
          <ReviewForm updateReviews={fetchBeach} />
        </div>
        <div className="review-feed-container">
          <ReviewFeed reviews={reviews} />
        </div>
      </div>
    </>
  )
}
