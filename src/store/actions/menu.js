import axios from 'axios'

export const getMenu = () => {
    return {
        type: 'GET_MENU',
        payload: axios.get('http://192.168.1.15:3000/api/v1/menus')
    }
}

export const getMenuByCategory = (id) => {
    return {
        type: 'GET_MENU_BY_CATEGORY',
        payload: axios.get(`http://192.168.1.15:3000/api/v1/menus/${id}`)
    }
}