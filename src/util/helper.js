export const formatNumber = (q) => {
    return q.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export const discountPrice = (total, discount) => {
    return total - (total / 100) * discount;
};

export const calculateTotalPrice = (cart) => {
    let total = 0;
    if (cart != undefined) {
        cart.map((item) => {
            total += item.totalprice;
        });
    }
    return total;
};