import { getCookie } from 'utils/cookieHelper'

// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'
const API = process.env.API_URL || 'http://localhost:9090/'

// const ReviewFeed = ({ reviews, reviewId }) => {
//   return (
//     <div className='review-feed'>
//       Review Feed
//       <div className='review-card'>
//         <p className='review-text'>{reviews.message}</p>
//         {reviews.length > -1 && (
//           <ul>
//             {reviews.map((review) => (
//               <li key={review._id}>
//                 {review.message} {review.rate}
//                 <button
//                   type='button'
//                   onClick={() => {
//                     reviewId(review._id)
//                   }}
//                 >
//                   Ta bort
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ReviewFeed

const ReviewFeed = ({ reviews, onDelete }) => {
  return (
    <main>
      {/* head-container */}
      <div className='review-feed'>
        <h3>Review Feed</h3>
        {/* beaches-container */}
        <div className='review-card'>
          {reviews.length > -1 &&
            reviews.map((review) => (
              //  beaches-boxes
              <div key={review._id} className='review-box'>
                <p>
                  {review.message} {review.rate}
                </p>
                <button
                  type='button'
                  onClick={() => {
                    onDelete(review._id)
                  }}
                >
                  Ta bort
                </button>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
export default ReviewFeed
