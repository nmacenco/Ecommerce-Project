import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { postProduct } from "../../redux/actions/admin";
import { getBrands } from "../../redux/actions/brands";
import {
  getCategories,
  getSubcategories,
} from "../../redux/actions/categories";
import {
  Brand,
  Category,
  ProductForm,
  Subcategory,
} from "../../redux/interface";
import { State } from "../../redux/reducers";
import { FormContainer } from "./FormCreateStyles";
import validations from "./validations";

export default function FromCreate(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductForm>({
    name: "",
    image: "",
    price: 0,
    description: "",
    weight: 0,
    stock: 0,
    soldCount: 0,
    BrandId: 0,
    SubcategoryId: 0,
  });
  const categoriesList = useSelector((state: State) => state.categories);
  const brandsList = useSelector((state: State) => state.brands);
  const subcategoriesList = useSelector(
    (state: State) => state.categories.subcategories
  );
  const [subcategoriesLoaded, setSubcategoriesLoaded] = useState<Boolean>(
    false
  );
  const [subcategoriesFiltered, setSubcategoriesFiltered] = useState<
    Subcategory[]
  >([]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubcategories());
    dispatch(getBrands());
  }, [dispatch]);

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const subcategoriesFiltered = subcategoriesList.filter(
      (s: Subcategory) => Number(s.CategoryId) == Number(e.target.value)
    );
    setSubcategoriesLoaded(true);
    setSubcategoriesFiltered(subcategoriesFiltered);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validations(product) === true) {
      dispatch(postProduct(product));
      alert("Product created successfully.");
      navigate("/products");
    } else {
      alert("Form not completed.");
    }
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
            value={product.name}
            placeholder="Enter name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group me-1">
          <label className="form-label mt-4">Brand</label>
          <select
            onChange={(e) => handleChange(e)}
            className="form-select"
            id="exampleSelect1"
            name="BrandId"
          >
            <option>Select brand</option>
            {brandsList.brands.map((brand: Brand) => {
              return <option value={brand.id}>{brand.name}</option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label mt-4">
            Image
          </label>
          <input
            className="form-control"
            type="text"
            id="formFile"
            name="image"
            placeholder="Enter image URL"
            value={product.image}
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
            value={product.description}
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
            <select
              className="form-select"
              id="exampleSelect1"
              name="SubcategoryId"
              onChange={(e) => handleChange(e)}
            >
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
              value={product.price}
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
              name="weight"
              placeholder="Weight"
              value={product.weight}
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
              value={product.stock}
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
