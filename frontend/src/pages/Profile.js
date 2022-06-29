import React, { useState, useEffect } from 'react'

import { ProfileFeed } from '../components/ProfileFeed'
import { ProfileBeaches } from '../components/ProfileBeaches'
import { Header } from 'components/Header'
import { Link } from 'react-router-dom'

import { API_URL } from '../utils/urls'
import { getCookie } from '../utils/cookieHelper'

export const Profile = ({ beach }) => {
  const [reviews, setReviews] = useState([])
  const [favorites, setFavorites] = useState([])
  const [beaches, setAllBeaches] = useState([])

  const fetcProfile = async () => {
    const accessToken = getCookie('accessToken')

    try {
      const data = await fetch(`${API_URL('profile')}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      })
      const res = await data.json()
      setReviews(res.reviews)
      setFavorites(res.favorites)
    } catch (err) {
      console.error(err)
    }
  }

  // Delete reviews
  const onDelete = async (reviewId) => {
    const accessToken = getCookie('accessToken')

    const reviewsPost = await fetch(`${API_URL('review')}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
    const reviewRes = await reviewsPost.json()
    setReviews(reviewRes.reviews)
  }

  useEffect(() => {
    fetcProfile()
  }, [])

  // Find all beaches
  useEffect(() => {
    fetch(API_URL('beaches'), {
      headers: {
        Authorization: getCookie('accessToken'),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const favoriteBeaches = res.response.filter((beach) => beach.isFavorite)
        setAllBeaches(favoriteBeaches)
      })
  }, [])

  return (
    <div>
      <Header />
      <>
        <div className="profile-headline">
          <h1>Välkommen till din profil</h1>
        </div>

        <div>
          {beaches.length > 0 ? (
            <>
              <h2>Favorit strander</h2>
              <ul>
                {beaches.map((beach) => (
                  <FavBeachElement key={beach.id} beach={beach} />
                ))}
              </ul>
            </>
          ) : (
            <p>Du har inga favoriter aennu</p>
          )}
        </div>
        <div>
          <div className="profile-text">Här kan du se dina recensioner</div>
          <div className="profile-feed-container">
            <ProfileFeed reviews={reviews} onDelete={onDelete} beach={beach} />
          </div>
        </div>
      </>
    </div>
  )
}

const FavBeachElement = ({ beach }) => {
  return (
    <li>
      <Link to={`/beach/${beach.id}`}>{beach.name}</Link>
    </li>
  )
}
