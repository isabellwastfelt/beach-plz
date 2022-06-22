export const BASE_URL = process.env.BASE_URL || 'http://localhost:9090'
export const BEACH_ID = (id) => `http://localhost:9090/beaches/${id}`

export const API_URL = (slug) => `${BASE_URL}/${slug}`
