import React from 'react'

import { ProfileBeaches } from '../components/ProfileBeaches'
import { ProfileFeed } from '../components/ProfileFeed'
import ReviewFeed from '../components/ReviewFeed'

export const Profile = () => {
  return (
    <div>
      <>
        <h1>Din profil</h1>
        <div>
          <ProfileBeaches />
        </div>
        <div>
          <ReviewFeed />
        </div>
        <div>
          <ProfileFeed />
        </div>
      </>
    </div>
  )
}
