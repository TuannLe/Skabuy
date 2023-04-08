import AXIOS from './index'

const url = '/user'

export const login = async (payload) => {
    try {
        const res = await AXIOS.post(`${url}/login`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}


export const register = async (payload) => {
    try {
        const res = await AXIOS.post(`${url}/register`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const verifyAccount = async (payload) => {
    try {
        const res = await AXIOS.post(`/auth/verify-email`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const generatePin = async (payload) => {
    try {
        const res = await AXIOS.post(`/auth/generate-pin`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const getUser = async (payload) => {
    try {
        const res = await AXIOS.post(`${url}/getUser`, payload)
        return res
    } catch (error) {
        return error
    }
}

export const editUser = async (payload) => {
    try {
        const res = await AXIOS.post(`${url}/editUser`, payload, {
            headers: {
                'token': `Bearer ${payload.token}`
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}