import React, { useEffect, useState } from 'react'

import { BEACH_ID } from 'utils/urls'

export const Filter = () => {
  const [area, setArea] = useState({})

  useEffect(() => {
    fetch(BEACH_ID(''))
      .then((res) => res.json())
      .then((json) => {
        const beaches = json.response
        const beach = beaches.filter((entry) => entry.area === area)
        console.log(beach.area)
        setArea(beach)
      })
  }, [])

  return (
    <div>
      <div className='filter'>
        Områden:
        <select>
          <option value='Område' selected='selected'>
            Välj område
          </option>
          <option value='Farsta'>Farsta</option>
          <option value='Skarpnäck'>Skarpnäck</option>
          <option value='Stockholm'>Stockholm</option>
          <option value='Östermalm'>Östermalm</option>
        </select>
      </div>
    </div>
  )
}
