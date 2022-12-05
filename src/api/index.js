import axios from "axios"

const apiConfig = {
  returnRejectedPromiseOnError: true,
  baseURL: "https://rko-bot.spaaace.io/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}

const apiConfigMultipartFormdata = {
  returnRejectedPromiseOnError: true,
  baseURL: "https://rko-bot.spaaace.io/",
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
}

class Axios {
  _axios
  constructor(config) {
    this._axios = axios.create(config)
  }
}

class BaseApi extends Axios {
  constructor(config) {
    super(config)
  }

  success = (response) => {
    return response.data
  }

  error = (error) => {
    throw error
  }

  get = (url) => {
    return this._axios
      .get(url)
      .then(this.success)
      .catch(this.error)
  }
  post = (url, data) => {
    return this._axios
      .post(url, data)
      .then(this.success)
      .catch(this.error)
  }
}

class UserApi extends BaseApi {
  constructor(config) {
    super(config)
  }

  getInfo = (tel="") => {
    return this.get(`/api/loan-application/current/${tel}/`)
  }
  postInfo = (values, tel="") => {
    return this.post(`/api/loan-application/current/${tel}/`, values)
  }
}

class PassportApi extends BaseApi {
  constructor(config) {
    super(config)
  }

  uploadPassport = (file) => {
    return this.post("/api/passport-load/", { passport: file })
  }
}

export const userApi = new UserApi(apiConfig)
export const passportApi = new PassportApi(apiConfigMultipartFormdata)

