import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import login from './login'

const rootReducer = (history) => combineReducers({
    login,
    router: connectRouter(history)
})

export default rootReducer
