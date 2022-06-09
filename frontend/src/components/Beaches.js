import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { BASE_URL } from 'utils/urls'

// const url =
//   'https://apigw.stockholm.se/NoAuth/VirtualhittaserviceDMZ/Rest/serviceunits?&filter[servicetype.id]=104&page[limit]=1500&page[offset]=0&sort=name'

// const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

export const Beaches = () => {
  const [beaches, setBeaches] = useState([])
  // const [data, setData] = useState([])

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((json) => {
        setBeaches(json.results)
      })
  }, [])

  // useEffect(() => {
  //   fetch("data.json")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setBeach(json.results);
  //     });
  // }, []);

  // const goToBeach = () => {
  //   setBeach();
  // };

  // const getData = () => {
  //   fetch("data.json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then(function (response) {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then(function (myJson) {
  //       console.log(myJson);
  //       setData(myJson);
  //     });
  // };
  // useEffect(() => {
  //   fetch(BASE_URL, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then(function (response) {
  //       console.log(response)
  //       return response.json()
  //     })
  //     .then(function (myJson) {
  //       console.log(myJson)
  //       setData(myJson)
  //     })
  // }, [])

  return (
    <div className='main-container'>
      <h1>Badplatser i Stockholm</h1>
      {beaches &&
        beaches.map((beach) => (
          <div>
            <Link key={beach.id} to={`/review/${beach.id}`}>
              <h2>{beach.name}</h2>
              <img src={beach.image}></img>
              <h3>{beach.address}</h3>
              <h3>{beach.location}</h3>
            </Link>
            <p>{beach.description}</p>
          </div>
        ))}
    </div>
  )
}
