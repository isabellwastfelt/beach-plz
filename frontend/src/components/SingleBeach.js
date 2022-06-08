import React from 'react'
import { Beaches } from '../components/Beaches'

export const SingleBeach = () => {
  return (
    <div className='single-beach'>
      <p>Här är en strand som du har klickat dig in på</p>
      <div className='App'>
        <Beaches />
        {/* {data &&
          data.map((item) => (
            <div key={item.name}>
              <Link to='/review'>
                <h1>{item.name}</h1>
                <img src={item.image}></img>
                <h2>{item.address}</h2>
                <h2>{item.location}</h2>
              </Link>
              <p>{item.description}</p>
            </div>
          ))} */}
      </div>
    </div>
  )
}
