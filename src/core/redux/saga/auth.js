import { takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/auth'
import * as apis from '../../api/authAPI'
import * as TYPES from '../constants/auth'

function* getUserSaga(action) {
    try {
        console.log('running...')
        const res = yield call(apis.getUser, action.payload)
        if (res.status === 200) {
            console.log('get user success')
            yield put(actions.GetUserSuccess(res.data[0]))
        }
    } catch (error) {
        console.log(error)
        yield put(actions.GetUserFailure(error))
    }
}

function* editUser(action) {
    try {
        console.log('Edit user running...')
        const res = yield call(apis.editUser, action.payload)
        console.log(res.data)
        console.log(res.status)
        if (res.status === 200) {
            console.log('edit success')
            yield put(actions.editUserSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.editUserFailure(error))
    }
}

const authSaga = [
    takeLatest(TYPES.GET_USER_START, getUserSaga),
    takeLatest(TYPES.EDIT_USER_START, editUser)
]

export default authSaga