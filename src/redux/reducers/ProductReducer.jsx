import { CLOSE_MODAL, CLOSE_MODAL_UPDATE, GET_ALL_PRODUCT, OPEN_MODAL, OPEN_MODAL_UPDATE } from "../Constants/ConstAction"

const initialState = {
    visibleModal: false,
    visibleModalUpdate: false,
    buttonTitle: 'Ok',
    title:'Title của modal',
    listSanPham:[],
    sanPhamUpdate:{}
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_MODAL: {
            return { ...state, visibleModal: true, buttonTitle: action.buttonTitle, title: action.title }
        }

        case OPEN_MODAL_UPDATE:{
            return {...state, visibleModalUpdate: true, buttonTitle: action.buttonTitle, title: action.title, sanPhamUpdate: action.sanPhamUpdate}
        }

        case CLOSE_MODAL: {
            return { ...state, visibleModal: false }
        }

        case CLOSE_MODAL_UPDATE: {
            return { ...state, visibleModalUpdate: false }
        }

        case GET_ALL_PRODUCT:{
            return {...state, listSanPham: action.listSanPham}
        }

        default:
            return { ...state }
    }
}
