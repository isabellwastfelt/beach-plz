import React from 'react'
import ReviewForm from '../components/ReviewForm'
import { SingleBeach } from '../components/SingleBeach'
import { ReviewFeed } from '../components/ReviewFeed'

export const Review = () => {
  return (
    <div>
      <SingleBeach />
      <ReviewFeed />
      <ReviewForm />
    </div>
  )
}
