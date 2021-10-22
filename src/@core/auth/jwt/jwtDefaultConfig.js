// ** Auth Endpoints
import axios from 'axios'
axios.defaults.baseURL = 'http://3.36.243.130:8080'

export default {
  loginEndpoint: '/api/v1/user/login',
  registerEndpoint: '/api/v1/user/signup',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  //storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
