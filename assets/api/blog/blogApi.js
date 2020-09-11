/* eslint-disable no-useless-catch */
import Config from '~/config'
import { setJwtHeader } from '~/assets/util/helper'

const BLOG_URL = `${Config.API_URL}/blog`

export const GET_ALL_BLOGS = (axios, token, query = '') => {
  return axios.$get(`${BLOG_URL}?${query}`, setJwtHeader(token))
}

export const GET_BLOGS_BY_AUTHOR_ID = (axios, token, userId, query = '') => {
  // const Console = console
  // Console.log('Query', `${Blog_URL}/${userId}?${query}`, setJwtHeader(token))
  return axios.$get(
    `${BLOG_URL}/author/${userId}?${query}`,
    setJwtHeader(token)
  )
}

// Create Blog By Author ( Author Only )
export const CREATE_BLOG_BY_AUTHOR = (axios, token, payloads) => {
  // const Console = console
  return axios.$post(`${BLOG_URL}`, payloads, setJwtHeader(token))
}

// Edit Blog By Author ( Author Only )
export const UPDATE_BLOG_BY_AUTHOR = (axios, token, id, payloads) => {
  // const Console = console
  return axios.$put(`${BLOG_URL}/${id}`, payloads, setJwtHeader(token))
}

// Get Blog Detail by Blog Id
export const GET_BLOG_BY_ID = (axios, blogId, token) => {
  return axios.$get(`${BLOG_URL}/${blogId}`, setJwtHeader(token))
}

// Deleted Blog By Author
export const DELETED_BLOG_BY_AUTHOR = (axios, token, id) => {
  return axios.$delete(`${BLOG_URL}/${id}`, setJwtHeader(token))
}
