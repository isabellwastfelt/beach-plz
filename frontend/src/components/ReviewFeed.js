import { formatDistance } from 'date-fns'

const ReviewFeed = ({ reviews }) => {
  if (!reviews) {
    return <h2>Du har ännu inte gjort några recensioner</h2>
  }

  return (
    <main>
      <div className="review-feed">
        <h3>Recensioner</h3>
        <div className="review-card">
          {reviews &&
            reviews.length > -1 &&
            reviews.map((review) => (
              <div key={review._id} className="review-box">
                <p className="message-text">{review.message}</p>
                <div className="date-delete">
                  <div>
                    <p className="date">
                      {formatDistance(new Date(review.createdAt), Date.now(), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
export default ReviewFeed
