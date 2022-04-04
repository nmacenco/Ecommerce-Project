import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { putProducts } from "../../../redux/actions/admin";
import { getBrands } from "../../../redux/actions/brands";
import { getCategories, getSubcategories } from "../../../redux/actions/categories";
import { ProductForm, Subcategory } from "../../../redux/interface";
import { State } from "../../../redux/reducers";
import editValidations from "./editValidations";

export default function EditProduct(): JSX.Element {
  const dispatch = useDispatch();
  const productDetail = useSelector((state: State) => state.productDetail);
  const brands = useSelector((state: State) => state.brands.brands)
  const categories = useSelector((state: State) => state.categories.categories)
  const subcategories = useSelector((state: State) => state.categories.subcategories)
  const { id } = useParams<string>();
  const [subcategoriesLoad, setSubcategoriesLoad] = useState<Boolean>(false)
  const [subcategoriesFiltered, setSubcategoriesFiltered] = useState<Subcategory[]>([])
  const [editProduct, setEditProduct] = useState<ProductForm>({
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

  useEffect(() => {
    dispatch(getBrands())
    dispatch(getCategories())
    dispatch(getSubcategories())
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
      setEditProduct({
        ...editProduct,
        [e.target.name]: e.target.value,
      })
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const subcategoriesFiltered = subcategories.filter(
      (s: Subcategory) => Number(s.CategoryId) == Number(e.target.value)
    );
    setSubcategoriesLoad(true);
    setSubcategoriesFiltered(subcategoriesFiltered);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(editProduct)
    editValidations(editProduct, productDetail)
      ? dispatch(putProducts(editProduct, id))
      : alert("Something is wrong");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit Product - {productDetail.name}</legend>
          <div className="form-group row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Name of product
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
            <select name="BrandId" onChange={(e) => handleChange(e)}>
              <option>Select brand</option>
              {
                (brands.length !== 0) 
                  ? brands.map(e => {
                    return <option key={e.id} value={e.name}>{e.name}</option>
                  })
                  : <p>No se han cargado las marcas aun</p>
              }
            </select>
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
              placeholder="Enter image"
              onChange={(e) => handleChange(e)}
            />
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
          <div className="form-group">
              <select onChange={(e) => handleCategory(e)}>
              <option>Select categorie</option>
              {
                (categories.length !== 0)
                ? categories.map(e => {
                  return <option key={e.id} value={e.id}>{e.name}</option>
                })
                : <p>Wait, chargin the categories</p>
              }
              </select>
            </div>
            
            <div>
              <select onChange={(e) => handleChange(e)} name="SubcategoryId">
                <option>Select subcategorie</option>
                {
                  (subcategoriesLoad === true)
                    ? subcategoriesFiltered.map(e => {
                      return <option key={e.id} value={e.name}>{e.name}</option>
                    })
                    : <p>Dont select one categorie</p>
                }
              </select>

            </div>
              
          <div className="form-group">
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
              placeholder="Enter weigth"
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
              placeholder="Enter stock number"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
