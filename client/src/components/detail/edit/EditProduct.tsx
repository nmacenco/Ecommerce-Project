import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { displayPartsToString } from "typescript";
import { putProducts } from "../../../redux/actions/admin";
import { getBrands } from "../../../redux/actions/brands";
import {
  getCategories,
  getSubcategories,
} from "../../../redux/actions/categories";
import { getProductDetail } from "../../../redux/actions/productDetail";
import { Brand, ProductForm, Subcategory } from "../../../redux/interface";
import { State } from "../../../redux/reducers";
import { EditContainer, Textarea } from "./EditProductStyles";
import editValidations from "./editValidations";

export default function EditProduct(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetail = useSelector((state: State) => state.productDetail);
  const brands = useSelector((state: State) => state.brands.brands);
  const categories = useSelector((state: State) => state.categories.categories);
  const subcategories = useSelector(
    (state: State) => state.categories.subcategories
  );
  const { id } = useParams<string>();
  const [brandSelected, setBrandSelected] = useState<Boolean>(false);
  const [subcategorySelected, setSubcategorySelected] = useState<Boolean>(
    false
  );
  const [subcategoriesFiltered, setSubcategoriesFiltered] = useState<
    Subcategory[]
  >([]);
  const [editProduct, setEditProduct] = useState<ProductForm>({
    name: productDetail.name,
    image: productDetail.image,
    price: productDetail.price,
    description: productDetail.description,
    weight: productDetail.weight,
    stock: productDetail.stock,
    soldCount: productDetail.soldCount,
    BrandId: productDetail.BrandId,
    SubcategoryId: productDetail.SubcategoryId,
  });

  useEffect(() => {
    dispatch(getProductDetail(id));
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getSubcategories());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    if (e.target.name == "BrandId") setBrandSelected(true);
    if (e.target.name == "SubcategoryId") setSubcategorySelected(true);
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const subcategoriesFiltered = subcategories.filter(
      (s: Subcategory) => Number(s.CategoryId) == Number(e.target.value)
    );
    setSubcategoriesFiltered(subcategoriesFiltered);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(editProduct);
    if (editValidations(editProduct, productDetail)) {
      dispatch(putProducts(editProduct, id));
      alert("Product edit successfully");
      navigate("/products");
    } else {
      alert("Something is wrong");
    }
  };

  return (
    <EditContainer>
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Edit Product</h3>
        <p className="text-center mt-4">{productDetail.name}</p>
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
            value={editProduct.name}
          />
        </div>
        <div className="form-group me-1">
          <label className="form-label mt-4">Brand</label>
          <select
            className="form-select"
            name="BrandId"
            onChange={(e) => handleChange(e)}
          >
            <option hidden>Select brand</option>
            {brands.map((brand) => {
              return (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              );
            })}
          </select>
          {!brandSelected ? (
            <p className=" mt-2 fs-5">
              Current brand: {productDetail.brand}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label mt-4">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="image"
            placeholder="Enter image URL"
            onChange={(e) => handleChange(e)}
            value={editProduct.image}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea" className="form-label mt-4">
            Description
          </label>
          <Textarea
            className="form-control"
            id="exampleTextarea"
            name="description"
            placeholder="Enter description"
            onChange={(e) => handleChange(e)}
            value={editProduct.description}
          />
        </div>
        <div className="d-flex">
          <div className="form-group flex-fill">
            <label className="form-label mt-4">Category</label>
            <select className="form-select" onChange={(e) => handleCategory(e)}>
              <option>Select category</option>
              {categories.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group flex-fill ms-2">
            <label className="form-label mt-4">Subcategory</label>
            <select
              className="form-select"
              onChange={(e) => handleChange(e)}
              name="SubcategoryId"
            >
              <option>Select subcategory</option>
              {subcategoriesFiltered.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            {!subcategorySelected ? (
              <p className=" mt-2 fs-5">
                Current subcategory: {productDetail.subcategory}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="form-group mr-1 mr-md-2">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleTextarea"
              name="price"
              placeholder="Enter price"
              onChange={(e) => handleChange(e)}
              value={editProduct.price}
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
              placeholder="Enter weight"
              onChange={(e) => handleChange(e)}
              value={editProduct.weight}
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
              placeholder="Enter stock number"
              onChange={(e) => handleChange(e)}
              value={editProduct.stock}
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-outline-primary mt-5 ">
            Submit
          </button>
        </div>
      </form>
    </EditContainer>
  );
}
