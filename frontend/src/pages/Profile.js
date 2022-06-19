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

// ProfileBeaches ska ha en feed med likeade stränder.

//lägg in reviewFeed med en kommentar över att den på sikt ska bytas ut till profile feed eftersom funktionen ska skilja sig lite.
//ProfileFeed ska ha delete, men alla stränder
//ReviewFeed ska inte ha delete, men bara specifika stränder
