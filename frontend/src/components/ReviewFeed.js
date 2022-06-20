import { formatDistance } from "date-fns";

const ReviewFeed = ({ reviews, onDelete }) => {
  if (!reviews) {
    return <div>Inga reviews.</div>;
  }

  return (
    <main>
      <div className="review-feed">
        <h3>Recensioner</h3>
        <div className="card">
          <div className="review-card">
            {reviews &&
              reviews.length > -1 &&
              reviews.map((review) => (
                <div key={review._id} className="review-box">
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
                            onDelete(review._id);
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
  );
};
export default ReviewFeed;
