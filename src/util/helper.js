export const formatNumber = (q) => {
    return q.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export const discountPrice = (total, discount) => {
    return total - (total / 100) * discount;
};