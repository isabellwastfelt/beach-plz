import React from 'react'
import { Link } from 'react-router-dom'

export const Beaches = ({ beaches }) => {
  return (
    <main>
      <div className="main-beaches-container">
        {beaches.length > 0 &&
          beaches.map((beach) => (
            <div key={beach.id} className="beaches-boxes">
              <Link to={`/beach/${beach.id}`}>
                <h2>{beach.name}</h2>
                <img className="main-beaches-img" src={beach.image}></img>
                {beach.isFavorite && <h3>Din favorit ❤️</h3>}
                <h3>{beach.address}</h3>
                <h3>{beach.area}</h3>
              </Link>
            </div>
          ))}
      </div>
    </main>
  )
}
