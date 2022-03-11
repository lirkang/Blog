import { combineReducers, createStore } from 'redux'
import article from 'redux/reducers/article'

export default createStore(combineReducers({ article }))
