import React from 'react'
import { ProfileBeaches } from '../components/ProfileBeaches'
import { ProfileFeed } from '../components/ProfileFeed'

export const Profile = () => {
  return (
    <div>
      <>
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
