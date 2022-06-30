import React, { useEffect, useState } from 'react'
import { Beaches } from '../components/Beaches'
import { Header } from '../components/Header'

import { API_URL } from 'utils/urls'
import { getCookie } from 'utils/cookieHelper'

export const Main = () => {
  const [allBeaches, setAllBeaches] = useState([])
  const [beachesByArea, setBeachesByArea] = useState({})
  const [areaFilter, setAreaFilter] = useState('')
  const [areas, setAreas] = useState([])

  // Find all beaches
  useEffect(() => {
    fetch(API_URL('beaches'), {
      headers: {
        Authorization: getCookie('accessToken'),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setAllBeaches(json.response)

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

  useEffect(() => {
    filterBeachesByArea()
  }, [areaFilter])

  return (
    <>
      <Header />
      <div>
        <div className="head-contatiner">
          <h1>Badplatser i Stockholm</h1>
          <div>
            <div className="filter">
              <form className="area-form">
                <label className="area-label">Områden: </label>
                <select onChange={(event) => setAreaFilter(event.target.value)}>
                  <option value="">Välj område</option>
                  {areas.map((area, index) => (
                    <option value={area} key={index}>
                      {area}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            <Beaches beaches={!areaFilter ? allBeaches : beachesByArea} />
          </div>
        </div>
      </div>
    </>
  )
}
