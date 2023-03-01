import { all } from 'redux-saga/effects'
import authSaga from './auth'

export default function* mySaga() {
    yield all([
        ...authSaga,
    ])
}