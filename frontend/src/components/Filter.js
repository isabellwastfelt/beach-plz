import React, { useEffect, useState } from 'react'

import { BEACH_ID } from 'utils/urls'


export const Filter = () => {

const [area, setArea] = useState({})

    useEffect(() => {
        fetch(BEACH_ID(''))
          .then((res) => res.json())
          .then((json) => {
            const beaches = json.response
            const beach = beaches.filter((entry) => entry.area === area )
            console.log(beach.area)
            setArea(beach)
          })
        }, [])


    return (
        <div>
            <form>
                Områden: 
                <select>
                    <option value="hallå" selected="selected">hallå</option>
                </select>
            </form>
        </div>
    )
}