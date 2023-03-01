import { INIT_STATE } from "../constants";
import * as TYPES from '../constants/auth'

export default function authReducers(state = INIT_STATE.auth, action) {
    switch (action.type) {
        case TYPES.LOG_IN_START:
            return {
                ...state,
                isLoading: true,
            }
        case TYPES.LOG_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isLoading: false,
                error: false
            }
        case TYPES.LOG_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true
            }
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
        case TYPES.LOGOUT:
            return {
                ...state,
                currentUser: {}
            }
        default:
            return state
    }
}