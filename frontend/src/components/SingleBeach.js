import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { BEACH_ID } from 'utils/urls'

export const SingleBeach = () => {
  const { name } = useParams()
  const [beach, setBeach] = useState(null)
  // const [data, setData] = useState([])
  const navigate = useNavigate()

  const onBackButtonClick = () => {
    navigate(-1)
  }

  ///////sparat original
  // useEffect(() => {
  //   fetch("data.json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (json) => {
  //         setItem(json);
  //       },
  //       [name]
  //     );
  // });
  // const theBeach = data.json.find((name) => item.name === item.name)

  // const getItem = () => {
  //   fetch('data.json', {
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
  //       setItem(myJson)
  //     })
  // }

  useEffect(() => {
    fetch(BEACH_ID('beach'))
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setBeach(json.response)
      })
  }, [name])

  return (
    <div className='single-beach'>
      <p>Här är en strand som du har klickat dig in på. Info nedan:</p>
      {beach && (
        <div key={beach.name}>
          <h1>{beach.name}</h1>
          <img src={beach.image} />
          <h2>{beach.address}</h2>
          <h2>{beach.location}</h2>
          <p>{beach.description}</p>

          {/* {data &&
          data.map((item) => (
            <div key={item.name}>
              <Link to='/review'>
                <h1>{item.name}</h1>
                <img src={item.image} /></img>
                <h2>{item.address}</h2>
                <h2>{item.location}</h2>
              </Link>
              <p>{item.description}</p>
            </div>
          ))} */}
        </div>
      )}
    </div>
  )
}
