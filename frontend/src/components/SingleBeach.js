import React from 'react'

export const SingleBeach = ({ beach }) => {
  if (!beach) {
    return <div>No beach</div>
  }
  return (
    <div className="single-beach">
      {beach && (
        <div key={beach.name}>
          <div className="beaches-container">
            <h1>{beach.name}</h1>
            <div className="beach-info-box">
              <img className="beach-img" alt={beach.name} src={beach.image} />
              <div className="beach-info">
                <p>{beach.description}</p>
                <h2>{beach.address}</h2>
                <h2>{beach.location}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
