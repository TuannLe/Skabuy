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

export const getVoucherStatus = (id) => {
    switch (id) {
        case 0:
            return "Invalid voucher";
        case 1:
            return "It's not time to use the voucher yet";
        case 2:
            return "Expired voucher";
        case 3:
            return "Successfully applied voucher";
        case 4:
            return "Voucher is out";
        default:
            return ""
            break;
    }
};

export const divPriceToArray = (maximum) => {
    var maximum_price = maximum;
    const convert_const = Math.pow(10, Math.floor(Math.log10(maximum_price)));
    maximum_price = Math.round(maximum_price / convert_const) * convert_const;
    const step = maximum_price / 4;
    var price_arr = [];
    for (let index = 0; index <= maximum_price; index += step) {
        if (index + step >= maximum_price) {
            price_arr.push({
                text: `Over $${index}`,
                data: { min: index, max: 0 },
            });
            break;
        }
        price_arr.push({
            text: `$${index} - $${index + step}`,
            data: { min: index, max: index + step },
        });
    }
    return price_arr;
};

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const validatePassword = (password) => {
    return passwordRegex.test(password);
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateEmail = (email) => {
    return emailRegex.test(email);
};

export const formatdate = (date) => {
    var d = new Date(date);

    return (
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds() +
        " " +
        d.getDate() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getFullYear()
    );
};

export const formatbirddate = (date) => {
    var d = new Date(date);

    return (
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        "-" +
        d.getFullYear()
    );
};

export const formatPostbirddate = (date) => {
    var d = new Date(date);

    return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate()
    );
};
