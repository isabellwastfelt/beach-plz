import React, { useEffect, useState } from 'react'
import { Beaches } from '../components/Beaches'
import { Header } from '../components/Header'
//import { Filter } from '..components/Filter'

import { API_URL } from 'utils/urls'
import { BEACH_ID } from 'utils/urls'

export const Main = () => {
  const [allBeaches, setAllBeaches] = useState([])
  const [beachesByArea, setBeachesByArea] = useState({})
  const [areaFilter, setAreaFilter] = useState('')
  const [areas, setAreas] = useState([])

  // Find all beaches
  useEffect(() => {
    fetch(API_URL('beaches'))
      .then((res) => res.json())
      .then((json) => {
        setAllBeaches(json.response)

        //https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
        //skapa en array med alla areas
        const beachAreas = json.response.map((beach) => beach.area)
        const filteredAreas = beachAreas
          .filter((a, index) => beachAreas.indexOf(a) === index)
          .sort()

        setAreas(filteredAreas)
      })
  }, [])

  // Filter beaches by area
  const filterBeachesByArea = () => {
    if (areaFilter) {
      const beachesByArea = allBeaches.filter(
        (entry) => entry.area === areaFilter
      )
      setBeachesByArea(beachesByArea)
    } else {
      setBeachesByArea(allBeaches)
    }
  }
  console.log(beachesByArea)

  useEffect(() => {
    filterBeachesByArea()
  }, [areaFilter])

  return (
    <div>
      <div className='head-contatiner'>
        <h1>Badplatser i Stockholm</h1>
        <div>
          <div className='filter'>
            <form className='area-form'>
              <label>Områden: </label>
              <select onChange={(event) => setAreaFilter(event.target.value)}>
                <option value=''>Välj område</option>
                {areas.map((area, index) => (
                  <option value={area} key={index}>
                    {area}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
        <Beaches beaches={!areaFilter ? allBeaches : beachesByArea} />
      </div>
    </div>
  )
}
