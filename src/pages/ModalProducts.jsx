import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL } from '../redux/Constants/ConstAction';
import { useFormik } from 'formik';

import { Modal,Input, Button,Select, InputNumber} from 'antd';
import { CREATE_PRODUCT_API } from '../redux/Constants/ConstSaga';

const { Option } = Select;

export default function ModalProducts(props) {

    const { visibleModal, buttonTitle, title } = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()

    const handleOk = () => {
        dispatch({
            type: CLOSE_MODAL
        })
    };

    const handleCancel = () => {
        dispatch({
            type: CLOSE_MODAL
        })
    };

    const formik = useFormik({        
        initialValues: {
            name: '',
            amount: '',
            price: '',
            sale: false
        },
        onSubmit: values => {
            dispatch({
                type: CREATE_PRODUCT_API,
                sanPham: values
            })
        },
    });

    const handChangeSelect = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    return (
        <>
            <Modal
                title={title}
                visible={visibleModal}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={[
                    <Button className='btn btn-default' onClick={() => {
                        dispatch({
                            type: CLOSE_MODAL
                        })
                    }}>Đóng</Button>,
                    <Button type='primary' key='submit' className='btn btn-primary' onClick={formik.handleSubmit}>{buttonTitle}</Button>
                ]}
            >
                <form action="" onSubmit={formik.handleSubmit}>
                        <Input name='name' value={formik.values.name} placeholder="Tên sản phẩm" className='mb-3' onChange={formik.handleChange} />
                        <Input type='number' className='w-full mb-3' name='amount' value={formik.values.amount} placeholder="Số lượng sản phẩm" onChange={formik.handleChange} />
                        <br />
                        <Input type='number' name='price' value={formik.values.price} placeholder="Giá sản phẩm" className='mb-3' onChange={formik.handleChange} />
                        <Select defaultValue="Sale hay không" name='sale' className='w-100' onChange={handChangeSelect('sale')}>
                            <Option key='1' value={true}>Sale</Option>
                            <Option key='2' value={false}>Không</Option>
                        </Select>
                    </form>
            </Modal>
        </>
    )
}
