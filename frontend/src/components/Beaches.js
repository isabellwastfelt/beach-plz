import React from 'react'
import { Link } from 'react-router-dom'

export const Beaches = ({ beaches }) => {
  return (
    <main>
      <div className="main-beaches-container">
        {beaches &&
          beaches.map((beach) => (
            <div className="beaches-boxes">
              <Link key={beach.id} to={`/beach/${beach.id}`}>
                <h2>{beach.name}</h2>
                <img className="main-beaches-img" src={beach.image}></img>
                <h3>{beach.address}</h3>
                <h3>{beach.area}</h3>
              </Link>
            </div>
          ))}
      </div>
    </main>
  )
}
