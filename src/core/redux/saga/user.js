import { takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/user'
import * as apis from '../../api/cartAPI'
import * as TYPES from '../constants/user'

function* getOrder(action) {
    try {
        console.log('running...')
        const res = yield call(apis.getOrder, action.payload)
        if (res.status === 'success') {
            console.log("Get order success")
            yield put(actions.getOrderSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.getOrderFailure(error))
    }
}

const productSaga = [
    takeLatest(TYPES.GET_ORDER_START, getOrder),
]

export default productSaga