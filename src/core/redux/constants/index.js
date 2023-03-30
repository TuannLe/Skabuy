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
    },
    product: {
        productsByCategory: [],
        attributes: {},
        isLoading: false,
        error: false
    }
}