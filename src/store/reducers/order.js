const initialState = {
    addedMenu: [],
    orderData: []
}

const order = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_ORDER':
            return {
                ...state,
                addedMenu: [...state.addedMenu, action.payload]
            }
        case 'UPDATE_ORDER':
            return {
                ...state,
                addedMenu: [...action.payload]
            }
        case 'POST_ORDER_PENDING':
            return {
                ...state
            }
        case 'POST_ORDER_FULFILLED':
            return {
                ...state,
                orderData: [...state.orderData, action.payload.data]
            }
        case 'POST_ORDER_REJECTED':
            return {
                ...state,
                error: payload.message
            }
        case 'PATCH_ORDER_PENDING':
            return {
                ...state
            }
        case 'PATCH_ORDER_FULFILLED':
            return {
                ...state,
                orderData: action.payload.data
            }
        case 'PATCH_ORDER_REJECTED':
            return {
                ...state,
                error: payload.message
            }
        case 'GET_ORDER_PENDING':
            return {
                ...state
            }
        case 'GET_ORDER_FULFILLED':
            return {
                ...state,
                orderData: action.payload.data
            }
        case 'GET_ORDER_REJECTED':
            return {
                ...state,
                error: payload.message
            }
        default:
            return state
    }
}

export default order