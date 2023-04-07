import { combineReducers } from 'redux'
import auth from './auth'
import cart from './cart'
import product from './product'
import favorite from './favorite'
import user from './user'

export default combineReducers({
    auth,
    cart,
    product,
    favorite,
    user
})