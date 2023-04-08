import AXIOS from './index'

const url = '/shop'

export const getPromotionalProducts = async () => {
    try {
        const res = await AXIOS.get(`${url}/promotional`)
        return res.data;
    } catch (error) {
        return error;
    }
}

export const getProductByCategory = async (payload) => {
    try {
        const res = await AXIOS.get(`${url}/getProductsByCategoryID/${payload}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res
    } catch (error) {
        return error
    }
}

export const getAttributeByCategory = async (payload) => {
    try {
        const res = await AXIOS.get(`${url}/getAttributeByCategoryID/${payload}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res
    } catch (error) {
        return error
    }
}

export const getProductsWithFilter = async (payload) => {
    try {
        const res = await AXIOS.get(`${url}/getProductsWithFilter/${payload}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const searchProduct = async (payload) => {
    console.log(payload)
    try {
        const res = await AXIOS.get(`${url}/search/${payload}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}