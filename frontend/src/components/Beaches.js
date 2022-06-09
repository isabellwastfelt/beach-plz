import React, { useEffect, useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'

// const url =
//   'https://apigw.stockholm.se/NoAuth/VirtualhittaserviceDMZ/Rest/serviceunits?&filter[servicetype.id]=104&page[limit]=1500&page[offset]=0&sort=name'

// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

export const Beaches = () => {
  const [beaches, setBeaches] = useState([])
  const [data, setData] = useState([])

  const getData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        console.log(response)
        return response.json()
      })
      .then(function (myJson) {
        console.log(myJson)
        setData(myJson)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='main-container'>
      <h1>Badplatser i Stockholm</h1>
      {data &&
        data.map((item) => (
          <div key={item.name}>
            <Link to='/review'>
              <h2>{item.name}</h2>
              <img src={item.image}></img>
              <h3>{item.address}</h3>
              <h3>{item.location}</h3>
            </Link>
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  )
}
