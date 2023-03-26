import { all } from 'redux-saga/effects'
import authSaga from './auth'
import cartSaga from './cart'
import productSaga from './product'

export default function* mySaga() {
    yield all([
        ...authSaga,
        // ...cartSaga
        ...productSaga,
    ])
}