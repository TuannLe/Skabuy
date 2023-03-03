import { takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/auth'
import * as apis from '../../api/authAPI'
import * as TYPES from '../constants/auth'

function* fetchLoginSaga(action) {
    try {
        console.log('Fetching login running...')
        const res = yield call(apis.login, action.payload)
        if (res.status === 204) {
            console.log("Login success")
            yield put(actions.LoginSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.LoginFailure(error))
    }
}

function* registerSaga(action) {
    try {
        console.log('Register running...')
        const res = yield call(apis.register, action.payload)
        console.log(res)
        if (res) {
            console.log('Register succeeded')
            yield put(actions.RegisterSuccess(res.data))
        }
    } catch (error) {
        console.log(error)
        yield put(actions.RegisterFailure(error))
    }
}

const authSaga = [
    takeLatest(TYPES.LOG_IN_START, fetchLoginSaga),
    takeLatest(TYPES.REGISTER_START, registerSaga),
]

export default authSaga