import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions/products";
import { Container } from "./FormCreateStyle";
import validaciones from "./validations";

export interface IProduct_Create {
  id?: number;
  name: string;
  image: string;
  price: number;
  description: string;
  weigth: number;
  stock: number;
  soldCount : number ;
  BrandId : number ;
  brand: string;
  subcategory_id: number;
  subcategory : string ; 
  CategoryId : number ; 
  category : number ; 
}

export default function FromCreate(): JSX.Element {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<IProduct_Create>({
    id: 0,
    name: '',
    image: '',
    price: 0,
    description: '',
    weigth: 0,
    stock: 0,
    soldCount : 0 ,
    BrandId : 0 ,
    brand: '',
    subcategory_id: 0,
    subcategory : '' , 
    CategoryId : 0 , 
    category : 0 , 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    validaciones(product)
      ? dispatch(postProduct(product))
      : alert("No se pudo crear la receta");
  };

  return (
    <Container className="container">
      <h2 className="my-5 text-center">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="staticEmail"
            name="name"
            placeholder="Enter name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label mt-4">
            Brand
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="brand"
            placeholder="Enter brand"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label mt-4">
            Image
          </label>
          {/* <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="image"
            placeholder="Enter image"
            onChange={(e) => handleChange(e)}
          /> */}
          <input
            className="form-control"
            type="file"
            id="formFile"
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea" className="form-label mt-4">
            Description
          </label>
          <input
            type="textarea"
            className="form-control"
            id="exampleTextarea"
            name="description"
            placeholder="Enter one description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="row row-cols-3">
          <div className="form-group">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleTextarea"
              name="price"
              placeholder="Price..."
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Weight
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleTextarea"
              name="weigth"
              placeholder="Weight..."
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleTextarea"
              name="stock"
              placeholder="Stock..."
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="text-center my-5">
          <button type="submit" className="btn btn-primary ">
            Submit
          </button>
        </div>
      </form>
    </Container>
  );
}
