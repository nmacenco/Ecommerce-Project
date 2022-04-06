import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  deleteProductDetail,
} from "../../redux/actions/productDetail";
import { State } from "../../redux/reducers/index";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../redux/actions/admin";
import Rewies from "./reviews/Review";
import Loading from "../loading/Loading";
import {
  DetailContainer,
  Box,
  ImgPriceContainer,
  Price,
  DeleteEditButton,
  ImagesContainer,
} from "./DetailStyles";
import { resetFilterProducts } from "../../redux/actions/filterByCategory";
import swal from "sweetalert";
import Question from "./questions/Question";
// import { isConditionalExpression } from "typescript";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const product = useSelector((state: State) => state.productDetail);

  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => {
      dispatch(deleteProductDetail());
      dispatch(resetFilterProducts());
    };
  }, []);

  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: true
      }
    }).then((value) => {
      if (value) {
        dispatch(deleteProduct(id));
        navigate("/products");
        // dispatch(resetPoducts())
        swal({
          text: "Product deleted",
          icon: "success"
        })
      }
    })
  }

  return (
    <DetailContainer>
      {product.name.length > 0 ? (
        <Box>
          <div>
            <h3>{product.name}</h3>
          </div>
          <div className="card">
            <div className="card-body">
              <ImgPriceContainer>
                <ImagesContainer>
                  <img
                    src={product.image}
                    alt="product-image"
                    className="w-75"
                  ></img>
                </ImagesContainer>
                <Price>
                  <h3>$ {product.price}</h3>
                  <p>Current stock: {product.stock}</p>
                  <button type="button" className="btn btn-primary btn">
                    Add to cart
                  </button>
                  <DeleteEditButton>
                    <button
                      onClick={deleteHandler}
                      type="button"
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                    <Link to={`/editProduct/${product.id}`}>
                      <button type="button" className="btn btn-warning btn-sm">
                        Edit
                      </button>
                    </Link>
                  </DeleteEditButton>
                </Price>
              </ImgPriceContainer>
            </div>
          </div>
          <div></div>
        </Box>
      ) : (
        <Loading></Loading>
      )}
      <Box className="mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-bs-toggle="tab" href="#home">
              Description
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#profile">
              Reviews
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link " data-bs-toggle="tab" href="#questions">
              Questions
            </a>
          </li>
        </ul>
        <div id="myTabContent" className="tab-content">
          <div className="tab-pane fade active show m-2" id="home">
            <p>{product.description}</p>
          </div>
          <div className="tab-pane fade m-2" id="profile">
            <Rewies/>
          </div>
          <div className="tab-pane fade m-2" id="questions">
            <Question/>
            <Question />
            <Question />
          </div>
        </div>
      </Box>
    </DetailContainer>
  );
}
function resetPoducts(): any {
  throw new Error("Function not implemented.");
}
