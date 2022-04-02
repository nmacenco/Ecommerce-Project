import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { putProducts } from '../../../redux/actions/products'
import { Product } from '../../../redux/interface'
import { State } from '../../../redux/reducers'
import editValidations from './editValidations'

export default function EditProduct(): JSX.Element {
    const dispatch = useDispatch()
    const productDetail = useSelector((state: State) => state.productDetail)
    const { id } = useParams<string>()
    const [editProduct, setEditProduct] = useState<Product>({
        name: "",
        subcategory_id: [],
        brand: "",
        image: "",
        price: 0,
        description: "",
        weigth: 0,
        stock: 0
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditProduct({
            ...editProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        editValidations(editProduct, productDetail)
            ? dispatch(putProducts(editProduct, id))
            : alert('Something is wrong')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Edit Product - {productDetail.name}</legend>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name of product</label>
                        <input type="text" className="form-control" id="staticEmail" name='name' placeholder="Enter name" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="form-label mt-4">Brand</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="brand" placeholder="Enter brand" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="form-label mt-4">Image</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name="image" placeholder="Enter image" onChange={(e) => handleChange(e)} />
                        <input className="form-control" type="file" id="formFile" name="image" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTextarea" className="form-label mt-4">Description</label>
                        <input type="textarea" className="form-control" id="exampleTextarea" name="description" placeholder="Enter one description" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTextarea" className="form-label mt-4">Price</label>
                        <input type="number" className="form-control" id="exampleTextarea" name="price" placeholder="Enter price" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTextarea" className="form-label mt-4">Weight</label>
                        <input type="number" className="form-control" id="exampleTextarea" name="weigth" placeholder="Enter weigth" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTextarea" className="form-label mt-4">Stock</label>
                        <input type="number" className="form-control" id="exampleTextarea" name="stock" placeholder="Enter stock number" onChange={(e) => handleChange(e)} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </fieldset>
            </form>
        </div>
    )
}