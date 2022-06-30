import React from 'react'

export const Favorite = ({ isFavorite, updateFavorite }) => {
  return (
    <div className="parent-button">
      <button className="favorite-button" onClick={() => updateFavorite()}>
        {isFavorite ? '✘ Ta bort favorit' : '✓ Spara som favorit'}
      </button>
    </div>
  )
}
