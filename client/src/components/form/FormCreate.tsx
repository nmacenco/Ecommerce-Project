import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../redux/actions/admin";
import {
  getCategories,
  getSubCategories,
} from "../../redux/actions/categories";
import { Category, Product, Subcategory } from "../../redux/interface";
import { State } from "../../redux/reducers";
import { FormContainer } from "./FormCreateStyles";
import validations from "./validations";

export default function FromCreate(): JSX.Element {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product>({
    name: "",
    subcategory_id: [],
    brand: "",
    image: "",
    price: 0,
    description: "",
    weigth: 0,
    stock: 0,
  });
  const categoriesList = useSelector((state: State) => state.categories);
  const subcategoriesList = useSelector((state: State) => state.categories.subcategories);
  const [subcategoriesLoaded, setSubcategoriesLoaded] = useState<Boolean>(
    false
  );
  const [subcategoriesFiltered, setSubcategoriesFiltered ] = useState<Subcategory[]>([]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  function handleCategory(
    e: React.ChangeEvent<HTMLSelectElement>
  ): void {
    e.preventDefault();
    const subcategoriesFiltered = subcategoriesList.filter(
      (s: Subcategory) => Number(s.CategoryId) == Number(e.target.value)
    );
    setSubcategoriesLoaded(true);
    setSubcategoriesFiltered(subcategoriesFiltered)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    validations(product)
      ? dispatch(postProduct(product))
      : alert("Product not created.");
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Create Product</h3>
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
            placeholder="Enter description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div className="form-group me-1">
            <label className="form-label mt-4">Category</label>
            <select
              onChange={(e) => handleCategory(e)}
              className="form-select"
              id="exampleSelect1"
            >
              <option>Select category</option>
              {categoriesList.categories.map((category: Category) => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
          </div>
          <div className="form-group ms-1">
            <label className="form-label mt-4">Subcategory</label>
            <select className="form-select" id="exampleSelect1">
              <option>Select subcategory</option>
              {subcategoriesLoaded &&
                subcategoriesFiltered.map((subcategory: Subcategory) => {
                  return (
                    <option value={subcategory.id}>{subcategory.name}</option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="form-group mr-1 mr-md-2">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Price
            </label>
            <input
              type="number"
              className="form-control "
              id="exampleTextarea"
              name="price"
              placeholder="Price"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group mx-2 mx-md-3">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Weight
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleTextarea"
              name="weigth"
              placeholder="Weigth"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group ml-1 ml-md-2">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleTextarea"
              name="stock"
              placeholder="Stock"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-outline-primary mt-5 ">
            Submit
          </button>
        </div>
      </form>
    </FormContainer>
  );
}
