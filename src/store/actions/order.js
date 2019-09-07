import axios from 'axios'

export const addOrder = (data) => {
    return {
        type: 'ADD_ORDER',
        payload: data
    }
}

export const updateOrder = (data) => {
    return {
        type: 'UPDATE_ORDER',
        payload: data
    }
}

export const postOrder = (data) => {
    return {
        type: 'POST_ORDER',
        payload: axios({
            url: 'http://192.168.1.15:3000/api/v1/orders',
            method: 'POST',
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }) 
    }
}

export const patchOrder = (data, id) => {
    return {
        type: 'PATCH_ORDER',
        payload: axios({
            url: `http://192.168.1.15:3000/api/v1/order/${id}`,
            method: 'PATCH',
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }) 
    }
}

export const getOrderByTrans = (id) => {
    return {
        type: 'GET_ORDER_BY_TRANSACTION',
        payload: axios.get(`http://192.168.1.15:3000/api/v1/order/transaction/${id}`)
    }
}   
