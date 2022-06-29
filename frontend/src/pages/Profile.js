import React, { useState, useEffect } from 'react'

import { ProfileFeed } from '../components/ProfileFeed'
// import { ProfileBeaches } from '../components/ProfileBeaches'
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
        <div className="profile-text">
          Här kan du se dina favoriter och recensioner
        </div>
        <div className="profile-favorite-container">
          <div className="profile-favorite-feed">
            <h2>Dina favorit bad</h2>
            <div className="profile-review-card">
              {beaches.length > 0 ? (
                <div className="favorite-list">
                  {beaches.map((beach) => (
                    <div className="profile-favorite-box">
                      <FavBeachElement key={beach.id} beach={beach} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>Du har inga favoriter ännu</p>
              )}
            </div>
          </div>
        </div>
        <div>
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
    <div className="favorite-card">
      <Link to={`/beach/${beach.id}`}>{beach.name}</Link>
    </div>
  )
}
