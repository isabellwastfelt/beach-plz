import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { BEACH_ID } from 'utils/urls'

// import BlackGreen from 'assets/BlackGreen.svg'

export const SingleBeach = () => {
  const { id } = useParams()
  const [beach, setBeach] = useState({})
  const navigate = useNavigate()

  const onBackButtonClick = () => {
    navigate(-1)
  }

  // fetches the info from that beach the user clicked on
  useEffect(() => {
    fetch(BEACH_ID(''))
      .then((res) => res.json())
      .then((json) => {
        const beaches = json.response
        const beach = beaches.find((entry) => entry.id === id)
        console.log(beach.name)
        setBeach(beach)
      })
  }, [])

  return (
    <div className='single-beach'>
      {/* <img className='logo-img' src={BlackGreen} alt='Logo' /> */}
      <Link to='/' className='back-button' onClick={onBackButtonClick}>
        <span className='back-icon'>&lt;</span>
        <span className='back-text'> Tillbaka till alla bad</span>
      </Link>
      {beach && (
        <div key={beach.name}>
          <h1>{beach.name}</h1>
          <div className='beaches-container'>
            <img className='beach-img' src={beach.image} />
            <h2>{beach.address}</h2>
            <h2>{beach.location}</h2>
            <p>{beach.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}
