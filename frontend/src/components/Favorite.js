import React, { useEffect, useState } from 'react'

export const Favorite = ({ isFavorite, updateFavorite }) => {
  return (
    <div>
      <button onClick={() => updateFavorite()}>
        {isFavorite ? 'Ta bort från favoriter.' : 'Lägg till i favoriter'}
      </button>
    </div>
  )
}
