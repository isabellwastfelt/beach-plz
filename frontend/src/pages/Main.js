// Här ska vi fectha alla beaches via API
import React from 'react'
import { Beaches } from '../components/Beaches'

export const Main = () => {
  return (
    <div className='main-container'>
      <h1>
        <Beaches />
      </h1>
    </div>
  )
}
