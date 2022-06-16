import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { API_URL } from 'utils/urls'


import BlackGreen from 'assets/BlackGreen.svg'



export const Beaches = ({ beaches }) => {


  return (
    <main>
      {/* <img className='logo-img' src={BlackGreen} alt='Logo' /> */}
      {/* <div className='head-contatiner'>
        <h1>Badplatser i Stockholm</h1> */}
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
      {/* </div> */}
    </main>
  )
}
