import { getCookie } from 'utils/cookieHelper'
import { formatDistance } from 'date-fns'

// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'
const API = process.env.API_URL || 'http://localhost:9090/'

const ReviewFeed = ({ reviews, onDelete }) => {
  return (
    <main>
      {/* head-container */}
      <div className='review-feed'>
        <h3>Recensioner</h3>
        {/* beaches-container */}
        <div className='review-card'>
          {reviews.length > -1 &&
            reviews.map((review) => (
              //  beaches-boxes
              <div key={review._id} className='review-box'>
                <p>
                  {review.message} {review.rate}
                </p>

                <p className='date'>
                  {formatDistance(new Date(review.createdAt), Date.now(), {
                    addSuffix: true,
                  })}
                </p>
                <button
                  className='delete-button'
                  type='button'
                  onClick={() => {
                    onDelete(review._id)
                  }}
                >
                  ✖️
                </button>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
export default ReviewFeed
