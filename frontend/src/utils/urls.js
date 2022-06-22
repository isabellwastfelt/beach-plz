export const BASE_URL =
  process.env.BASE_URL || 'https://beach-plz.herokuapp.com'
export const BEACH_ID = (id) => `https://beach-plz.herokuapp.com/beaches/${id}`

export const API_URL = (slug) => `${BASE_URL}/${slug}`
