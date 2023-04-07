import * as TYPES from '../constants/favorite'

// Add item to favorite 
export const AddItemFavorite = (payload) => {
    return {
        type: TYPES.ADD_ITEM_FAVORITE,
        payload
    }
}

// Remove item to favorite 
export const RemoveItemFavorite = (payload) => {
    return {
        type: TYPES.REMOVE_ITEM_FAVORITE,
        payload
    }
}

// Remove all item to favorite 
export const RemoveAllFavorite = () => {
    return {
        type: TYPES.REMOVE_ALL_FAVORITE,
    }
}
