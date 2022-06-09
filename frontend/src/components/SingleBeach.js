import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { BEACH_ID } from 'utils/urls'

export const SingleBeach = () => {
  const { id } = useParams()
  const [beach, setBeach] = useState(null)
  // const [data, setData] = useState([])
  const navigate = useNavigate()

  const onBackButtonClick = () => {
    navigate(-1)
  }

  console.log(id)

  useEffect(() => {
    fetch(BEACH_ID(id))
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setBeach(json.response)
      })
  }, [id])

  return (
    <div className='single-beach'>
      <p>Här är en strand som du har klickat dig in på. Info nedan:</p>
      {beach &&
        beach.map((single) => (
          <div key={single.name}>
            <h1>{single.name}</h1>
            <img src={single.image} />
            <h2>{single.address}</h2>
            <h2>{single.location}</h2>
            <p>{single.description}</p>

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
        ))}
    </div>
  )
}
