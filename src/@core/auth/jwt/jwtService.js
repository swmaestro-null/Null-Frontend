import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'
export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  //jwtconfig를 사용
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  //refresh token을 이용하기 위해
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  //refresh token을 이용하기 위해
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // ** Request Interceptor
    //request 요청을 가로챔
    axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage
        //로컬에 저장된 접근 토큰을 가져온다
        const accessToken = this.getToken()

        // ** If token is present add it to request's Authorization Header
        //토큰이 존재하면 요청의 인증헤더로 추가
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          //config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // ** Add request/response interceptor
    //request를 추가하거나 response를 가로채는 곳
    axios.interceptors.response.use(
      response => response,
      error => {
        // ** const { config, response: { status } } = error
        //가져온 응답이 Error면
        const { config, response } = error
        const originalRequest = config

        //상태가 401이면
        // ** if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then(r => {
              this.isAlreadyFetchingAccessToken = false

              // ** Update accessToken in localStorage
              //accessToken을 localStorage에 업데이트 하는곳
              this.setToken(r.data.accessToken)
              this.setRefreshToken(r.data.refreshToken)

              this.onAccessTokenFetched(r.data.accessToken)
            })
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              // ** Make sure to assign accessToken according to your response.
              // ** Check: https://pixinvent.ticksy.com/ticket/2413870
              // ** Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axios(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    const data = axios.post(this.jwtConfig.loginEndpoint, {
      email: args[0].email,
      password: args[0].password
    })
    return data
  }

  SendEmail(args) {
    console.log(args)
    return axios.post('/api/v1/user/sendCode', {
      email: args.email
    })
  }

  SendImage(data) {
    console.log(`Bearer ${localStorage.accessToken}`)
    console.log(data)
    return axios.post('/api/v1/paint/upload', data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      })
  }

  SendConfirm(args) {
    return axios.post('/api/v1/user/checkCode', {
      code: args.authenticationNumber,
      email: args.email
    })
  }

  register(...args) {
    console.log(args[0].email, args[0].password, args[0].phoneNumber, args[0].username)
    return axios.post(this.jwtConfig.registerEndpoint, {
      email: args[0].email,
      name: args[0].username,
      password: args[0].password,
      phoneNumber: args[0].phoneNumber
    })
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }
}
