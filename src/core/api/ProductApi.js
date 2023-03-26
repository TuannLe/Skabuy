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