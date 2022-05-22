import {all} from 'redux-saga/effects'
import { theoDoiCreateProduct, theoDoiDeleteProduct, theoDoiGetAllProductSaga, theoDoiUpdateProduct } from './ProductSaga'

export function* rootSaga(){

    yield all([
        theoDoiGetAllProductSaga(),
        theoDoiCreateProduct(),
        theoDoiUpdateProduct(),
        theoDoiDeleteProduct()
    ])
}