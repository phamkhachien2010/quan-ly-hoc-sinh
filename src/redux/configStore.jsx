import {applyMiddleware, combineReducers, createStore} from 'redux'


import createMiddleWareSaga from 'redux-saga'
import { ProductReducer } from './reducers/ProductReducer';
import { rootSaga } from './saga/rootSaga';

const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    ProductReducer
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga)

export default store;