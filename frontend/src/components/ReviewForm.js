import React, { useState, useEffect} from 'react'
import { BASE_URL } from 'utils/urls'



 const ReviewForm = () => {
    const [review, setReview] = useState([])
    const [newReview, setNewReview] = useState("")

    const onFormSubmit = (event) => {
      event.preventDefault()

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({message: newReview})
      }

      useEffect(() => {
        fetch(BASE_URL('/review', options))
          .then((res) => res.json())
          .then((data) => setReview([data, review])) 
           
          })

    }


  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label>What do you think of this beach?</label>
        <textarea 
        rows="5"
        value={newReview}
        maxLength="300"
        onChange={event => setNewReview(event.target.value)}
        />
        <button type="submit">Submit your review</button>
        </form>


    
    
    </>
    
  )
}


export default ReviewForm