import axios from 'axios'

export const getTransaction = (transactionId) => {
    return {
        type: 'GET_TRANSACTION',
        payload: axios.get(`http://192.168.1.15:3000/api/v1/transaction/order/${transactionId}`)
    }
}

export const addTransaction = (data) => {
    return {
        type: 'ADD_TRANSACTION',
        payload: axios({
            url: 'http://192.168.1.15:3000/api/v1/transactions',
            method: 'POST',
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}

export const updateTransaction = (data, id) => {
    return {
        type: 'UPDATE_TRANSACTION',
        payload: axios({
            url: `http://192.168.1.15:3000/api/v1/transaction/${id}`,
            method: 'PATCH',
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}