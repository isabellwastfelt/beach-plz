import React from 'react'
import { Beaches } from '../components/Beaches'
import { Filter } from '../components/Filter'

export const Main = () => {
  return (
    <div>
        <Filter />
        <Beaches />
    </div>
  )
}
