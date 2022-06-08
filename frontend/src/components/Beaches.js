import React, { useEffect, useState } from 'react'

// const url =
//   'https://apigw.stockholm.se/NoAuth/VirtualhittaserviceDMZ/Rest/serviceunits?&filter[servicetype.id]=104&page[limit]=1500&page[offset]=0&sort=name'

const API = process.env.API_URL || 'https://beach-plz.herokuapp.com/'

export const Beaches = () => {
  const [beaches, setBeaches] = useState([])

  //   const fetchData = async () => {
  //     fetch(API, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ message: beaches }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setBeaches(data))

  //     useEffect(() => {
  //       fetchData()
  //     }, [])

  const fetchData = async () => {
    const req = await fetch(API)
    const jes = await req.json()

    // const enrichedBeaches = await jes.data.map(async (beach) => {
    //   const detailsReq = await fetch(beach.links.self);
    //   const details = await detailsReq.json();

    //   return { ...beach, details };
    // });

    setBeaches(jes.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='main-container'>
      {beaches &&
        beaches.map((beach) => (
          <div key={beach.id}>
            <h2>{beach.attributes.name}</h2>
          </div>
        ))}
    </div>
  )
}
