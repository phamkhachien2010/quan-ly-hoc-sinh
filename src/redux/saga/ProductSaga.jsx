import { takeLatest, call, put } from 'redux-saga/effects'
import { productService } from '../../services/ProductService'
import { STATUS_CODE } from '../../util/Constant/settingSystem';
import { CLOSE_MODAL, CLOSE_MODAL_UPDATE, GET_ALL_PRODUCT } from '../Constants/ConstAction';
import { CREATE_PRODUCT_API, DELETE_PRODUCT_API, GET_ALL_PRODUCT_API, UPDATE_PRODUCT_API } from '../Constants/ConstSaga'

/** Lấy toàn bộ sản phẩm */
function* getAllProductSaga(action) {
    try {
        const { data, status } = yield call(() => productService.getAllProduct());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PRODUCT,
                listSanPham: data
            })
        } else {
            console.log(status);
        }

    } catch (error) {
        console.log(error);
    }
}

export function* theoDoiGetAllProductSaga() {
    yield takeLatest(GET_ALL_PRODUCT_API, getAllProductSaga)
}

/** Thêm sản phẩm */
function* createProduct(action) {
    try {
        const { data, status } = yield call(() => productService.createProduct(action.sanPham));
        if (status === STATUS_CODE.CREATE_SUCCESS) {
            alert('Thêm mới sản phẩm thành công!')
            yield put({
                type: GET_ALL_PRODUCT_API
            })
            yield put({
                type: CLOSE_MODAL
            })
            window.location.reload()
        } else {
            alert('Không thêm mới sản phẩm được!')
        }
    } catch (error) {
        alert(error.response.data)
    }

}

export function* theoDoiCreateProduct() {
    yield takeLatest(CREATE_PRODUCT_API, createProduct)
}

/** Updat san pham */
function* updateProductSaga (action){
    try {
        const {data, status} = yield call(()=>productService.updateProduct(action.id, action.sanPham));
        if(status===STATUS_CODE.SUCCESS){
            alert('Sửa sản phẩm thành công!')
            yield put({
                type: GET_ALL_PRODUCT_API
            })
            yield put({
                type: CLOSE_MODAL_UPDATE
            })
        }else{
            alert(data.response.data)
        }
    } catch (error) {
        alert(error.response.data)
    }
}

export function* theoDoiUpdateProduct (){
    yield takeLatest(UPDATE_PRODUCT_API, updateProductSaga)
}

/** DELETE PRODUCT */
function* deleteProductSaga(action){
    try {
        const {data, status}= yield call(()=>productService.deleteProduct(action.id))
        if(status===STATUS_CODE.SUCCESS){
            window.confirm('Bạn có muốn xoá sản phẩm này ?')
            yield put({
                type: GET_ALL_PRODUCT_API
            })
        }else{
            console.log(status);
        }
    } catch (error) {
        console.log(error);
    }
}

export function* theoDoiDeleteProduct(){
    yield takeLatest(DELETE_PRODUCT_API, deleteProductSaga)
}