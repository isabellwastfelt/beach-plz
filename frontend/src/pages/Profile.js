import React from 'react'

import { Header } from '../components/Header'
import { ProfileBeaches } from '../components/ProfileBeaches'
import { ProfileFeed } from '../components/ProfileFeed'

export const Profile = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
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
