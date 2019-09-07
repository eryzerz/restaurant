export const getCategory = (category) => {
    return {
        type: 'GET_CATEGORY',
        payload: category
    }
}