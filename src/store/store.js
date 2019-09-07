import { createStore, combineReducers, applyMiddleware } from 'redux'

import category from './reducers/category'
import menu from './reducers/menu'
import order from './reducers/order'
import transaction from './reducers/transaction'

import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

const reducers = combineReducers({
    category,
    menu,
    order,
    transaction
})

const store = createStore(
    reducers,
    applyMiddleware(logger, promise)
)

export default store