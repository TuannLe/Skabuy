import AXIOS from './index'

export const onApplyVoucher = async (payload) => {
    console.log(payload)
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