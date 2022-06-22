import React from 'react'
import { Favorite } from 'components/Favorite'

export const ProfileBeaches = ({ favorites }) => {
  if (!favorites) {
    return <div>Inga favoriter.</div>
  }
  return (
    <div>
      <div className="favorite-list">
        <h3>Favoriter</h3>
        <div className="favorite-card">
          {favorites &&
            favorites.length > -1 &&
            favorites.map((favorites) => (
              <div key={favorites._id} className="favorite-box">
                <p className="favorite-text">{favorites.favorites}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
