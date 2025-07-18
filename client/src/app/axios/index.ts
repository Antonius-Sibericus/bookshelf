import axios from 'axios'
import { type AuthResponseType } from '../../types/responsesTypes/authResponse.type'

const API_URL = `http://localhost:3000`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<AuthResponseType>(`${API_URL}/auth/refresh`, { withCredentials: true })
            localStorage.setItem('accessToken', response.data.accessToken)
            return api.request(originalRequest)
        } catch (err) {
            console.log(err)
        }
    }
    throw error
})

export { api, $api }