const initialState = {
    data: [],
    isLoading: true,
}

const menu = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_MENU':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_MENU_PENDING':
            return {
                ...state,
                data: null,
                isLoading: true,
            }
        case 'GET_MENU_FULFILLED':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }
        case 'GET_MENU_REJECTED':
            return {
                ...state,
                error: payload.message
            }
        case 'GET_MENU_BY_CATEGORY':
            return {
                ...state,
                data: action.payload.data
            }
        case 'GET_MENU_BY_CATEGORY_PENDING':
                return {
                    ...state,
                    data: null,
                    isLoading: true,
                }
        case 'GET_MENU_BY_CATEGORY_FULFILLED':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }
        case 'GET_MENU__BY_CATEGORY_REJECTED':
            return {
                ...state,
                error: payload.message
            }
        default: 
            return state
    }
}

export default menu