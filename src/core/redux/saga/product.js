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

const productSaga = [
    takeLatest(TYPES.GET_PRODUCT_BY_CATEGORY_START, getProductByCategory),
]

export default productSaga