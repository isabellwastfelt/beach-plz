import { useState, useEffect } from 'react'
import { getCookie } from 'utils/cookieHelper'

const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

const ReviewForm = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await fetch(`${API}review`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res = await data.json()
      console.log(res)
      setReviews(res)
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onDelete = (reviewId) => {
    fetch(`${API}review/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => fetchData())
  }

  if (isLoading) {
    return <div>Laddar..</div>
  }

  return (
    <div>
      <h1>Sick reviews</h1>
      {reviews.length > -1 && (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              {review.message} {review.rate}
              <button
                type='button'
                onClick={() => {
                  onDelete(review._id)
                }}
              >
                KLICKA HÄR
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ReviewForm
