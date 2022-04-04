import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { putProducts } from "../../../redux/actions/admin";
import { getBrands } from "../../../redux/actions/brands";
import { getCategories, getSubcategories } from "../../../redux/actions/categories";
import { ProductForm, Subcategory } from "../../../redux/interface";
import { State } from "../../../redux/reducers";
import { EditContainer } from "./EditProductStyles";
import editValidations from "./editValidations";

export default function EditProduct(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const productDetail = useSelector((state: State) => state.productDetail);
  const brands = useSelector((state: State) => state.brands.brands)
  const categories = useSelector((state: State) => state.categories.categories)
  const subcategories = useSelector((state: State) => state.categories.subcategories)
  const { id } = useParams<string>();
  const [subcategoriesLoad, setSubcategoriesLoad] = useState<Boolean>(false)
  const [subcategoriesFiltered, setSubcategoriesFiltered] = useState<Subcategory[]>([])
  const [editProduct, setEditProduct] = useState<ProductForm>({
    name: productDetail.name ,
    image: productDetail.image ,
    price: productDetail.price,
    description: productDetail.description ,
    weight: productDetail.weight,
    stock:productDetail.stock ,
    soldCount: productDetail.soldCount,
    BrandId:productDetail.BrandId ,
    SubcategoryId:productDetail.subcategory_id ,
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
    if (editValidations(editProduct, productDetail)) {
       dispatch(putProducts(editProduct, id))
       navigate("/products");
       alert("Product edit successfully")
    } else {
       alert("Something is wrong");
    }
  };

  return (
    <EditContainer>
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
              placeholder={productDetail.name}
              onChange={(e) => handleChange(e)}
              value = {editProduct.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label mt-4">
              Brand
            </label>
            <select
             className="form-select"
             name="BrandId" onChange={(e) => handleChange(e)}>
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
              value = {editProduct.image}
            />
            {/* <input
              className="form-control"
              type="file"
              id="formFile"
              name="image"
              onChange={(e) => handleChange(e)}
            /> */}
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
              value = {editProduct.description}
            />
          </div>
          <div className="d-flex">
          <div className="form-group flex-fill">
            <label className="form-label mt-4">Category</label>
              <select className="form-select" onChange={(e) => handleCategory(e)}>
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
            
            <div className="form-group flex-fill ms-2">
            <label className="form-label mt-4">Subcategory</label>
              <select className="form-select" onChange={(e) => handleChange(e)} name="SubcategoryId">
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
              value = {editProduct.price}
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
              value = {editProduct.weight}
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
              value = {editProduct.stock}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </EditContainer>
  );
}
