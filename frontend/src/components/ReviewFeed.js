import { useState, useEffect } from 'react'
import { getCookie } from 'utils/cookieHelper'

const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

const ReviewFeed = () => {
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
        getCookie(accessToken), fetchData(''), setReviews('')
      })
  }

  if (isLoading) {
    return <div>Laddar..</div>
  }

  return (
    <div className='review-form'>
      <p>Review Feed</p>
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
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ReviewFeed
