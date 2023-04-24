import AXIOS from './index'

const url = '/shop'

export const getSuperSaleItems = async (payload) => {
    try {
        const res = await AXIOS.get(`/product/sale/${payload.percent}/0/${payload.encode}`)
        return res.data
    } catch (error) {
        return error;
    }
}

export const getProductAll = async (payload) => {
    console.log('hihi', payload)
    try {
        const res = await AXIOS.get(`/product/sale/${payload.percent}/1/${payload.encode}`)
        return res.data
    } catch (error) {
        return error;
    }
}

export const getBestSellingItems = async (payload) => {
    try {
        const res = await AXIOS.post(`/product/getTopsaleProduct`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const getPopularItems = async (payload) => {
    try {
        const res = await AXIOS.get(`/product/top/0/${payload}`)
        return res.data
    } catch (error) {
        return error
    }
}

export const getPopularAll = async (payload) => {
    try {
        const res = await AXIOS.get(`/product/top/1/${payload}`)
        return res.data
    } catch (error) {
        return error
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