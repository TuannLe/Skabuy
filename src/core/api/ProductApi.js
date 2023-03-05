import AXIOS from './index'

const url = '/product'

export const getPromotionalProducts = async () => {
    try {
        const res = await AXIOS.get(`${url}/promotional`)
        return res.data;
    } catch (error) {
        return error;
    }
}