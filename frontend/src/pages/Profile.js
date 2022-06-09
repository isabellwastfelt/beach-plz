import React from 'react'
import { ProfileBeaches } from '../components/ProfileBeaches'
import { ProfileFeed } from '../components/ProfileFeed'

export const Profile = () => {
  return (
    <div>
      <>
        <h1>Din profil</h1>
        <div>
          <ProfileBeaches />
        </div>
        <div>
          <ProfileFeed />
        </div>
      </>
    </div>
  )
}
