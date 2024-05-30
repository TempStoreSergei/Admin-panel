import axios from 'axios'

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

/** Axios init */
export const Axios = axios.create({
  baseURL: 'http://192.168.0.1/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})
