import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { API_URL } from 'utils/urls'
// import { Filter } from '../components/Filter'

import BlackGreen from 'assets/BlackGreen.svg'

// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

export const Beaches = ({ beaches, filterBeaches }) => {
  // const [beaches, setBeaches] = useState([])

  // useEffect(() => {
  //   fetch(API_URL('beaches'))
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setBeaches(json.response)
  //     })
  // }, [])

  return (
    <main>
      <img className='logo-img' src={BlackGreen} alt='Logo' />
      <div className='head-contatiner'>
        <h1>Badplatser i Stockholm</h1>
        {/* <Filter /> */}
        <div className='beaches-container'>
          {beaches &&
            beaches.map((beach) => (
              <div className='beaches-boxes'>
                <Link key={beach.id} to={`/beach/${beach.id}`}>
                  <h2>{beach.name}</h2>
                  <img className='beaches-img' src={beach.image}></img>
                  <h3>{beach.address}</h3>
                  <h3>{beach.area}</h3>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
