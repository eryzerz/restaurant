initialState = {
    data: '',
    message: '',
    isLoading: true
}

export default transaction = (state = initialState, action) => {
switch (action.type) {
    case 'ADD_TRANSACTION_PENDING':
    return {
        ...state,
        isLoading: true
    }
    
    case 'ADD_TRANSACTION_FULFILLED':
    return {
        ...state,
        data: action.payload.data,
        message: action.payload.data.message,
        isLoading: false
    }
    
    case 'ADD_TRANSACTION_REJECTED':
    return {
        ...state,
        message: action.payload.data.message,
        isLoading: false
    }
    
    case 'GET_TRANSACTION_PENDING':
    return {
        ...state,
        isLoading: true
    }
    
    case 'GET_TRANSACTION_FULFILLED':
    return {
        ...state,
        data: action.payload.data,
        message: action.payload.data.message,
        isLoading: false
    }
    
    case 'GET_TRANSACTION_REJECTED':
    return {
        ...state,
        message: action.payload.data.message,
        isLoading: false
    }
    case 'UPDATE_TRANSACTION_PENDING':
    return {
        ...state,
        isLoading: true
    }
    
    case 'UPDATE_TRANSACTION_FULFILLED':
    return {
        ...state,
        data: action.payload.data,
        isLoading: false
    }
    
    case 'UPDATE_TRANSACTION_REJECTED':
    return {
        ...state,
        error: payload.message,
        isLoading: false
    }
    default:
        return state
    
}
}