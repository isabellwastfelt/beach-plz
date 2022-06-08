import { useEffect, useState } from 'react'

// const url =
//   'https://apigw.stockholm.se/NoAuth/VirtualhittaserviceDMZ/Rest/serviceunits?&filter[servicetype.id]=104&page[limit]=1500&page[offset]=0&sort=name'

export const Beaches = () => {
  const [beaches, setBeaches] = useState([])

  const fetchData = async () => {
    fetch('beaches.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        console.log(response)
        return response.json()
      })
      .then(function (myJson) {
        console.log(myJson)
        setBeaches(myJson)
      })

    // const req = await fetch(url)
    // const jes = await req.json()

    // const enrichedBeaches = await jes.data.map(async (beach) => {
    //   const detailsReq = await fetch(beach.links.self);
    //   const details = await detailsReq.json();

    //   return { ...beach, details };
    // });

    // setBeaches(jes.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='App'>
      {beaches &&
        beaches.map((beach) => (
          <div key={beach.id}>
            <h2>{beach.name}</h2>
            <h3>{beach.attributes.address}</h3>
            {/* <div>
              <img src={beach.attributes} />
            </div> */}
          </div>
        ))}
    </div>
  )
}
