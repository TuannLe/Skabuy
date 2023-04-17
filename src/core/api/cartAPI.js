import AXIOS from './index'

const url = '/order'

export const onApplyVoucher = async (payload) => {
    try {
        const res = await AXIOS.get(`/voucher/getVoucherByCode/${payload}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const getOrder = async (payload) => {
    try {
        const res = await AXIOS.get(`${url}/get-orders-by-user-id/${payload}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const getOrderDetail = async (payload) => {
    try {
        const res = await AXIOS.get(`${url}/${payload}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}
