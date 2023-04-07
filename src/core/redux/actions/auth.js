import * as TYPES from '../constants/auth'

// Login
export const LoginStart = (payload) => {
    return {
        type: TYPES.LOG_IN_START,
        payload
    }
}

export const LoginSuccess = (payload) => {
    return {
        type: TYPES.LOG_IN_SUCCESS,
        payload
    }
}

export const LoginFailure = (error) => {
    return {
        type: TYPES.LOG_IN_FAILURE,
        error: error
    }
}

// Register
export const RegisterStart = (payload) => {
    return {
        type: TYPES.REGISTER_START,
        payload
    }
}

export const RegisterSuccess = (payload) => {
    return {
        type: TYPES.REGISTER_SUCCESS,
        payload
    }
}

export const RegisterFailure = (error) => {
    return {
        type: TYPES.REGISTER_FAILURE,
        error: error
    }
}


export const logout = () => {
    return {
        type: TYPES.LOGOUT,
    }
}

// Register
export const GetUserStart = (payload) => {
    return {
        type: TYPES.GET_USER_START,
        payload
    }
}

export const GetUserSuccess = (payload) => {
    return {
        type: TYPES.GET_USER_SUCCESS,
        payload
    }
}

export const GetUserFailure = (error) => {
    return {
        type: TYPES.GET_USER_FAILURE,
        error
    }
}

export const editUserStart = (payload) => {
    return {
        type: TYPES.EDIT_USER_START,
        payload
    }
}

export const editUserSuccess = (payload) => {
    return {
        type: TYPES.EDIT_USER_SUCCESS,
        payload
    }
}

export const editUserFailure = (error) => {
    return {
        type: TYPES.EDIT_USER_FAILURE,
        error
    }
}