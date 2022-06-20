import React, { useState, useEffect } from 'react'
import ReviewForm from '../components/ReviewForm'
import { SingleBeach } from '../components/SingleBeach'
import ReviewFeed from '../components/ReviewFeed'
<<<<<<< HEAD

import { getCookie } from 'utils/cookieHelper'

// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'
=======
import { Header } from '../components/Header'
import { useParams } from 'react-router-dom'
>>>>>>> 5aea4614433dc085c12fb837d4cc5d2e5d08c1b3

const API = process.env.API_URL || 'http://localhost:9090/'

export const Beach = () => {
  const { id } = useParams()
  //fetch reviews
  const [beach, setBeach] = useState({})
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchBeach = async () => {
    try {
      const data = await fetch(`${API}beach/${id}`, {
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
