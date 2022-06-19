// export const BASE_URL = 'https://beach-plz.herokuapp.com'

// export const BEACH_ID = (id) => `https://beach-plz.herokuapp.com/beaches/${id}`

export const BASE_URL = "http://localhost:9090";
export const BEACH_ID = (id) => `http://localhost:9090/beaches/${id}`;

// export const SIGNUP = 'signup'

// export const LOGIN = 'profile'

// export const EDIT_USER = (id) => `https://restaurants-backend-database.herokuapp.com/profile/${id}`

export const API_URL = (slug) => `${BASE_URL}/${slug}`;

/* 
     @TODO
     1. Cleanup unused
     2. get BASE_URL from .env files
*/
