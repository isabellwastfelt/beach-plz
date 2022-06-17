import React, { useState, useEffect } from 'react'
import { getCookie } from 'utils/cookieHelper'

// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'
const API = process.env.API_URL || 'http://localhost:9090/'

const ReviewForm = ({ updateReviews }) => {
  const [newReview, setNewReview] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const accessToken = getCookie('accessToken')

    fetch(`${API}review/beachId`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ message: newReview }),
    })
      .then((res) => res.json())
      .then(() => {
        updateReviews()
        setNewReview('')
      })
  }

  if (isLoading) {
    return <div>Laddar..</div>
  }

  return (
    <div className="main-form">
      <div className="form-container">
      <form className="review-form" onSubmit={handleFormSubmit}>
        <label htmlFor="newReview">Vad tycker du om badplatsen?</label>
        <textarea
          className={newReview.length > 140 ? 'red-text' : ''}
          id="newReview"
          type="text"
          rows="5"
          columns="150"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Skriv din recension här..."
        />
        <button className="review-button" type="submit">
          Lägg till din recension
        </button>
      </form>
      </div>
    </div>
  )
}

export default ReviewForm
