import { all } from 'redux-saga/effects'
import authSaga from './auth'
import productSaga from './product'
import userSaga from './user'

export default function* mySaga() {
    yield all([
        ...authSaga,
        ...productSaga,
        ...userSaga
    ])
}