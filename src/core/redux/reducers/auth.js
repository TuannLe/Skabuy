import { INIT_STATE } from "../constants";
import * as TYPES from '../constants/auth'

export default function authReducers(state = INIT_STATE.auth, action) {
    switch (action.type) {
        // login
        case TYPES.LOG_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.data,
                token: action.payload.token,
                isLoading: false,
                error: false
            }
        // register
        case TYPES.REGISTER_START:
            return {
                ...state,
                isLoading: true,
            }
        case TYPES.REGISTER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                message: "Đăng ký thành công",
                isLoading: false,
                error: false
            }
        case TYPES.REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        // get user
        case TYPES.GET_USER_START:
            return {
                ...state,
                isLoading: true,
            }
        case TYPES.GET_USER_SUCCESS:
            return {
                ...state,
                infoUser: action.payload,
                isLoading: false,
                error: false
            }
        case TYPES.GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        // Edit user
        case TYPES.EDIT_USER_START:
            return {
                ...state,
                isLoading: true,
            }
        case TYPES.EDIT_USER_SUCCESS:
            return {
                ...state,
                infoUser: action.payload,
                isLoading: false,
                error: false
            }
        case TYPES.EDIT_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        // log out
        case TYPES.LOGOUT:
            return {
                ...state,
                currentUser: {},
                token: ''
            }
        default:
            return state
    }
}