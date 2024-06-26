import axios from 'axios'
import useCookies from 'universal-cookie'

export const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Validation */
export const validators = {
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(v) || 'Please enter a valid email address'
  },
  required: (v: any) => !!v || 'This field is required',
}

/** Cookies */
new useCookies(['changer']).addChangeListener((cookie) => {
  Axios.defaults.headers.myCookie = cookie.value
})

const cookies = new useCookies(['cookie']).get('cookie')

console.log(cookies)

/** Axios init */
export const Axios = axios.create({
  baseURL: 'http://192.168.0.103:1337/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    myCookie: cookies,
  },
})
