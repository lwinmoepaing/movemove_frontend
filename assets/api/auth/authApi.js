/* eslint-disable no-useless-catch */
import Config from '~/config'
import { setJwtHeader } from '~/assets/util/helper'

const AUTH_URL = `${Config.API_URL}/auth`

export const LOGIN_REQUEST = (axios, payloads) => {
  return axios.$post(`${AUTH_URL}/login`, payloads)
}

export const GET_PROFILE_REQUEST = (axios, token) => {
  return axios.$get(`${AUTH_URL}/profile`, setJwtHeader(token))
}

export const REGISTER_REQUEST = (axios, payloads) => {
  return axios.$post(`${AUTH_URL}`, payloads)
}
