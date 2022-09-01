import axios from 'axios'
const api = axios.create({ baseURL: 'http://34.238.252.230:5000' })
export { axios, api }