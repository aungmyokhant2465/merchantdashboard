import axios from 'axios';

export let token = null

export const setToken = (newToken) => {
    token = newToken
}

const BACKEND_URL = 'https://api.aicpass.com'

export let user = {}

export const setUser = (newUser) => {
    user = newUser
}

const login = async (credentials) => {
    const response = await axios.post(`${BACKEND_URL}/auth/api/merchant/login`, credentials)
    return response
}

const changePassword = async (credentials) => {
    const config = {
        headers: { authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }
    }
    const response = await axios.post(`${BACKEND_URL}/merchant/merchantPasswordChange`, credentials, config)
    return response
}

export default {
    login,
    changePassword,
}