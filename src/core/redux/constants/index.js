export const INIT_STATE = {
    auth: {
        currentUser: {},
        token: '',
        infoUser: {},
        isLoading: false,
        error: false
    },
    cart: {
        products: [],
        productsCheckout: [],
    },
    product: {
        productsByCategory: [],
        productsSearch: [],
        attributes: {},
        isLoading: false,
        error: false
    },
    favorite: {
        favorite: []
    },
    user: {
        orders: [],
    }
}