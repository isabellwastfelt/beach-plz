import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const SingleBeach = () => {
  const { name } = useParams()
  const [item, setItem] = useState()
  const [data, setData] = useState([])
  // const navigate = useNavigate();

  // const onBackButtonClick = () => {
  //   navigate(-1);
  // };

  ///////sparat original
  // useEffect(() => {
  //   fetch("data.json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (json) => {
  //         setItem(json);
  //       },
  //       [name]
  //     );
  // });
  const theBeach = data.json.find((name) => item.name === item.name)

  const getItem = () => {
    fetch('data.json', {
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
        setItem(myJson)
      })
  }

  useEffect(() => {
    getItem()
  }, [theBeach])

  return (
    <div className='single-beach'>
      <p>Här är en strand som du har klickat dig in på. Info nedan:</p>
      {item && (
        <div key={item.name}>
          <h1>{item.name}</h1>
          <img src={item.image} />
          <h2>{item.address}</h2>
          <h2>{item.location}</h2>
          <p>{item.description}</p>

          {/* {data &&
          data.map((item) => (
            <div key={item.name}>
              <Link to='/review'>
                <h1>{item.name}</h1>
                <img src={item.image} /></img>
                <h2>{item.address}</h2>
                <h2>{item.location}</h2>
              </Link>
              <p>{item.description}</p>
            </div>
          ))} */}
        </div>
      )}
    </div>
  )
}
