import React, { useState, useEffect } from 'react'
import { getCookie } from 'utils/cookieHelper'

const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

const ReviewForm = () => {
  const [review, setReview] = useState([])
  const [newReview, setNewReview] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = () => {
    fetch(`${API}review`)
      .then((res) => res.json())
      .then((data) => setReview([data, review]))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const accessToken = getCookie('accessToken')

    fetch(`${API}review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ message: newReview }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchReviews()
        setNewReview('')
      })
  }

  if (isLoading) {
    return <div>Laddar..</div>
  }

  return (
    <main>
      <form
        className='form card'
        onSubmit={handleFormSubmit}
        // newReview={newReview}
        // setNewReview={setNewReview}
      >
        <label htmlFor='newReview'>Vad tycker du om stranden?</label>
        <textarea
          className={newReview.length > 140 ? 'red-text' : ''}
          id='newReview'
          type='text'
          rows='5'
          columns='150'
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder='Skriv din recension här...'
        />
        <button type='submit'>Lägg till din recension</button>
      </form>
    </main>
  )
}

export default ReviewForm
