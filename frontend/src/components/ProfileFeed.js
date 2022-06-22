import React from 'react'
import { formatDistance } from 'date-fns'

/// HÄR SKA ENDAST DINA REVIEW SYNAS
/// HÄR SKA REVIEW DELETE LIGGA

export const ProfileFeed = ({ reviews, onDelete }) => {
  if (!reviews) {
    return <div>Inga reviews.</div>
  }

  return (
    <main>
      <div className="profile-review-feed">
        <h3>Dina recensioner</h3>
        <div className="profile-card">
          <div className="profile-review-card">
            {reviews &&
              reviews.length > -1 &&
              reviews.map((review) => (
                <div key={review._id} className="profile-review-box">
                  <p className="message-text">
                    {review.message} {review.rate}
                  </p>
                  <div className="date-delete">
                    <div>
                      <p className="date">
                        {formatDistance(
                          new Date(review.createdAt),
                          Date.now(),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      {onDelete && (
                        <button
                          className="delete-button"
                          type="button"
                          onClick={() => {
                            onDelete(review._id)
                          }}
                        >
                          ✖️
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}
