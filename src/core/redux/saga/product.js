import { takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/product'
import * as apis from '../../api/ProductApi'
import * as TYPES from '../constants/product'

function* getProductByCategory(action) {
    try {
        console.log('running...')
        const res = yield call(apis.getProductByCategory, action.payload)
        if (res.status === 200) {
            console.log("Get product by category success")
            yield put(actions.GetProductByCategorySuccess(res.data))
        }
    } catch (error) {
        yield put(actions.GetProductByCategoryFailure(error))
    }
}

function* getAttributeByCategory(action) {
    try {
        console.log('running...')
        const res = yield call(apis.getAttributeByCategory, action.payload)
        if (res.status === 200) {
            console.log("Get attribute by category success")
            yield put(actions.GetAttributeByCategorySuccess(res.data.data))
        }
    } catch (error) {
        yield put(actions.GetProductByCategoryFailure(error))
    }
}

function* getProductsWithFilter(action) {
    try {
        console.log('running...')
        const res = yield call(apis.getProductsWithFilter, action.payload)
        if (res.status === 'success') {
            console.log("Get product with filter success")
            yield put(actions.getProductsWithFilterSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.getProductsWithFilterFailure(error))
    }
}

function* searchProducts(action) {
    try {
        console.log('running...')
        const res = yield call(apis.searchProduct, action.payload)
        console.log(res.data)
        console.log(res.status)
        if (res.status === 'success') {
            console.log("Search product success")
            yield put(actions.searchProductSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.searchProductFailure(error))
    }
}

const productSaga = [
    takeLatest(TYPES.GET_PRODUCT_BY_CATEGORY_START, getProductByCategory),
    takeLatest(TYPES.GET_ATTRIBUTE_BY_CATEGORY_START, getAttributeByCategory),
    takeLatest(TYPES.GET_PRODUCT_WITH_FILTER_START, getProductsWithFilter),
    takeLatest(TYPES.SEARCH_PRODUCTS_START, searchProducts),
]

export default productSaga