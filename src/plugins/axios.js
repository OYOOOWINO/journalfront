import axios from 'axios'
const api = axios.create({ baseURL: 'http://ec2-34-238-252-230.compute-1.amazonaws.com:5000' })
export { axios, api }