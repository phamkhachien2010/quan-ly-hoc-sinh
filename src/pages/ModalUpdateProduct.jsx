import { Button, Input, Modal, Select } from 'antd'
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_MODAL_UPDATE } from '../redux/Constants/ConstAction';
import { UPDATE_PRODUCT_API } from '../redux/Constants/ConstSaga';
import { UPDATE_PRODUCT } from '../util/Constant/settingSystem';

const { Option } = Select;

export default function ModalUpdateProduct(props) {

    const { visibleModalUpdate, sanPhamUpdate, buttonTitle } = useSelector(state => state.ProductReducer);

    const dispatch = useDispatch();

    const handleOk = () => {
        dispatch({
            type: CLOSE_MODAL_UPDATE
        })
    };

    const handleCancel = () => {
        dispatch({
            type: CLOSE_MODAL_UPDATE
        })
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: sanPhamUpdate.name,
            amount: sanPhamUpdate.amount,
            price: sanPhamUpdate.price,
            sale: sanPhamUpdate.sale
        },
        onSubmit: values => {
            dispatch({
                type: UPDATE_PRODUCT_API,
                id: sanPhamUpdate.id,
                sanPham: values
            })
        },
    });

    const handChangeSelect = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const defaultValueSelect = () => {
        if (sanPhamUpdate.sale) {
            return "Sale"
        } else {
            return "Không"
        }
    }

    return (
        <>
            <Modal
                title={UPDATE_PRODUCT}
                visible={visibleModalUpdate}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={[
                    <Button className='btn btn-default' onClick={() => {
                        dispatch({
                            type: CLOSE_MODAL_UPDATE
                        })
                    }}>Đóng</Button>,
                    <Button type='primary' key='submit' className='btn btn-primary' onClick={formik.handleSubmit}>{buttonTitle}</Button>
                ]}
            >
                <form action="" onSubmit={formik.handleSubmit}>
                    <Input key='1' name='name' value={formik.values.name} placeholder="Tên sản phẩm" className='mb-3' onChange={formik.handleChange} />
                    <Input key='2' name='amount' value={formik.values.amount} placeholder="Số lượng sản phẩm" className='mb-3' onChange={formik.handleChange} />
                    <Input key='3' name='price' value={formik.values.price} placeholder="Giá sản phẩm" className='mb-3' onChange={formik.handleChange} />
                    <Select defaultValue={defaultValueSelect} name='sale' className='w-100' onChange={handChangeSelect('sale')}>
                        <Option key='1' value={true}>sale</Option>
                        <Option key='2' value={false}>Không</Option>
                    </Select>
                </form>
            </Modal>
        </>
    )
}
