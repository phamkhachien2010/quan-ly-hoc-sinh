import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OPEN_MODAL, OPEN_MODAL_UPDATE } from '../redux/Constants/ConstAction';
import { BUY_PRODUCT_PRODUCT_API, DELETE_PRODUCT_API, GET_ALL_PRODUCT_API } from '../redux/Constants/ConstSaga';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../util/Constant/settingSystem';
import ModalProducts from './ModalProducts'
import { Table } from 'antd';
import './index.css'
import ModalUpdateProduct from './ModalUpdateProduct';
import { Popconfirm, message } from 'antd';

export default function Home(props) {

    const { listSanPham } = useSelector(state => state.ProductReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_ALL_PRODUCT_API
        })

        return () => {

        }
    }, [])

    const columns = [
        {
            title: 'Thứ tự',
            key: 'tt',
            render: (text, record, index) => {
                return index + 1
            },
            width: 150,
            align: 'center'
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 300,
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => {
                return amount.toLocaleString()
            },
            align: 'center',
            width: 300
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => {
                return price.toLocaleString()
            },
            sorter: (a, b) => a.price - b.price,
            align: 'center',
            width: 300
        },
        {
            title: 'Sale',
            key: 'sale',
            dataIndex: 'sale',
            render: (sale) => {
                if (sale) {
                    return <i className="fa fa-check" />
                } else {
                    return <i className="fa fa-times"></i>
                }
            },
            align: 'center',
            width: 300
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, sanPham, index) => {

                return <div>
                    <button className='btn btn-success mr-3' onClick={() => {
                        dispatch({
                            type: OPEN_MODAL_UPDATE,
                            buttonTitle: 'Update',
                            title: UPDATE_PRODUCT,
                            sanPhamUpdate: sanPham
                        })
                    }}>Sửa</button>

                    <button className='btn btn-danger mr-3' onClick={() => {
                        dispatch({
                            type: DELETE_PRODUCT_API,
                            id: sanPham.id
                        })
                    }}>Xoá</button>

                    <button className='btn btn-secondary' onClick={()=>{
                        dispatch({
                            type:BUY_PRODUCT_PRODUCT_API,
                            id: sanPham.id
                        })
                    }}>
                        Nhập hàng
                    </button>
                </div>
            },
            align: 'center',
            width: 300
        },
    ];

    const bgImgPath = require('../assets/img/geran-de-klerk-bKhETeDV1WM-unsplash.jpg')

    return (
        <div style={{ background: `url(${bgImgPath})`, backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='h-screen' >
            <div className='container text-center relative'>
                <h1 className='text-5xl pt-5 text-white'>Quản lý sản phẩm</h1>
                <button className='btn btn-primary absolute top-12 right-0' onClick={() => {
                    dispatch({
                        type: OPEN_MODAL,
                        buttonTitle: CREATE_PRODUCT,
                        title: CREATE_PRODUCT
                    })
                }}>Thêm sản phẩm</button>
                <Table style={{ backgroundColor: 'transparent' }} columns={columns} dataSource={listSanPham} />
            </div>
            <ModalProducts />
            <ModalUpdateProduct />
        </div>
    )
}
