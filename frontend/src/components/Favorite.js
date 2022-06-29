import React, { useEffect, useState } from 'react'

export const Favorite = ({ isFavorite, updateFavorite }) => {
  return (
    <div>
      <button className="favorite-button" onClick={() => updateFavorite()}>
        {isFavorite ? 'Ta bort som favorit' : '❤️ Lägg till i favoriter'}
      </button>
    </div>
  )
}
