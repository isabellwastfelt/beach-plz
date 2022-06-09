import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { BEACH_ID } from 'utils/urls'

export const SingleBeach = () => {
  const { id } = useParams()
  const [beach, setBeach] = useState(null)
  // const [data, setData] = useState([])
  const navigate = useNavigate()

  const onBackButtonClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    fetch(BEACH_ID(''))
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setBeach(json.response)
      })
  }, [id])

  // if (beach === null) {
  //   return <p>byby</p>
  // }

  return (
    <div className='single-beach'>
      <p>Här är en strand som du har klickat dig in på. Info nedan:</p>
      <Link to='/' className='back-button' onClick={onBackButtonClick}>
        {/* <span className='back-icon'>&lt;</span> */}
        <span className='back-text'> Tillbaka till alla bad</span>
      </Link>
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
