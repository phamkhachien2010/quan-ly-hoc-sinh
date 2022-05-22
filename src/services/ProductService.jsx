import { baseService } from './baseService'

export class ProductService extends baseService {
    constructor() {
        super();
    }

    getAllProduct = () => {
        return this.get(`/`)
    }

    createProduct = (sanPham) => {
        return this.post('/', sanPham)
    }

    updateProduct = (id, sanPham) => {
        return this.put(`/${id}`, sanPham)
    }

    deleteProduct = (id)=>{
        return this.delete(`/${id}`)
    }

    buyProduct = (id)=>{
        return this.put(`/buy-product/${id}`)
    }
}

export const productService = new ProductService();