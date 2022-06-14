import React, { useState, useEffect } from 'react'
import ReviewForm from '../components/ReviewForm'
import { SingleBeach } from '../components/SingleBeach'
import ReviewFeed from '../components/ReviewFeed'
import { Header } from '../components/Header'

const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

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

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <div>
      <Header />
      <SingleBeach />
      <ReviewFeed reviews={reviews} />
      <ReviewForm updateReviews={fetchReviews} />
    </div>
  )
}
