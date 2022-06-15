// NOT IN USE! MOVED TO MAIN

import React, { useEffect, useState } from 'react'

import { BEACH_ID } from 'utils/urls'

export const Filter = () => {
  const [beachesByArea, setBeachesByArea] = useState({})

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
  )
}
