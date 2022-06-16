import React, { useEffect, useState } from 'react'
import { Beaches } from '../components/Beaches'
import { Header } from '../components/Header'
// import { Filter } from '..components/Filter'

import { API_URL } from 'utils/urls'
import { BEACH_ID } from 'utils/urls'

export const Main = () => {
  const [allBeaches, setAllBeaches] = useState([])
  const [beachesByArea, setBeachesByArea] = useState({})

  // Find all beaches
  useEffect(() => {
    fetch(API_URL('beaches'))
      .then((res) => res.json())
      .then((json) => {
        setAllBeaches(json.response)
        console.log(allBeaches)
      })
  }, [])

  // Filter beaches by area
  const fetchBeachesByArea = () => {
    fetch(BEACH_ID(''))
      .then((res) => res.json())
      .then((json) => {
        const beaches = json.response
        console.log(json.response)
        const beachesByArea = beaches.filter((entry) => entry.area === value)
        setBeachesByArea(beachesByArea)
      })
  }
  const onAreaChange = (beachesByArea) => {
    setBeachesByArea(beachesByArea)
  }
  useEffect(() => {
    fetchBeachesByArea()
    onAreaChange()
  }, [])
  console.log(beachesByArea)

  return (
    <div>
      <Header />
      {/* <Filter /> */}
      <div>
        <div className='filter'>
          <form className='area-form'>
            <label>Områden:</label>
            <select
              onChange={(event) => onAreaChange(event.target.value)}
              value={beachesByArea}
            >
              <option>Välj område</option>
              <option value='Farsta'>Farsta</option>
              <option value='Skarpnäck'>Skarpnäck</option>
              <option value='Stockholm'>Stockholm</option>
              <option value='Östermalm'>Östermalm</option>
              <option value='Kungsholmen'>Kungsholmen</option>
              <option value='Hässelby-Vällingby'>Hässelby-Vällingby</option>
              <option value='Bromma'>Bromma</option>
              <option value='Skärholmen'>Skärholmen</option>
              <option value='Södermalm'>Södermalm</option>
            </select>
          </form>
        </div>
      </div>
      <Beaches beaches={allBeaches} filterBeaches={beachesByArea} />
    </div>
  )
}
