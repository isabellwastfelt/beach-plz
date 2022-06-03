import { useState, useEffect } from 'react'
const api = 'http://localhost:9090'

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const data = await fetch(`${api}/review`, {
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

    fetchData()
  }, [])

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
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Reviews
