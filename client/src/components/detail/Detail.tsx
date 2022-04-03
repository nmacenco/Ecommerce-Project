import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getProductDetail , deleteProductDetail} from '../../redux/actions/productDetail';
import {State} from '../../redux/reducers/index'
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../redux/actions/admin";

import Loading from "../loading/Loading";
import {
  DetailContainer,
  Box,
  DetailImg,
  ImgPriceContainer,
  Price,
  ReviewComentsBox,
  MiniImagesBox,
  MiniImages,
  DeleteEditButton,
  ImagesContainer,
} from "./DetailStyles";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate()
  const product = useSelector((state: State) => state.productDetail);

  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => {
      dispatch(deleteProductDetail());
    };
  }, []);

  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    dispatch(deleteProduct(id));
    alert("Product deleted.");
    navigate("/products");
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
                  <DetailImg
                    src={product.image}
                    alt="product-image"
                  ></DetailImg>
                  <MiniImagesBox>
                    {/* <div className="card">
                  <div className="card-body"> */}
                    <MiniImages
                      src={product.image}
                      alt="product-image"
                    ></MiniImages>
                    <MiniImages
                      src={product.image}
                      alt="product-image"
                    ></MiniImages>
                    {/* </div>
                  </div> */}
                  </MiniImagesBox>
                </ImagesContainer>
                <Price>
                  <h3>$ {product.price}</h3>
                  <p> We have {product.stock} in stock </p>
                  <button type="button" className="btn btn-primary btn-sm">
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
      <ReviewComentsBox>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#home">
              Description
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" data-bs-toggle="tab" href="#profile">
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
          <div className="tab-pane fade" id="home">
            <p>
              {product.description}
            </p>
          </div>
          <div className="tab-pane fade active show" id="profile">
            <p>
              Food truck fixie locavore, accusamus mcsweeney's marfa nulla
              single-origin coffee squid. Exercitation +1 labore velit, blog
              sartorial PBR leggings next level wes anderson artisan four loko
              farm-to-table craft beer twee. Qui photo booth letterpress,
              commodo enim craft beer mlkshk aliquip jean shorts ullamco ad
              vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic
              magna delectus mollit.
            </p>
          </div>
          <div className="tab-pane fade active show" id="questions">
            <p>
              {/* Etsy mixtape wayfarers, ethical wes anderson tofu before they sold
              out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table
              readymade. Messenger bag gentrify pitchfork tattooed craft beer,
              iphone skateboard locavore carles etsy salvia banksy hoodie
              helvetica. DIY synth PBR banksy irony. Leggings gentrify squid
              8-bit cred pitchfork */}
            </p>
          </div>
        </div>
      </ReviewComentsBox>
    </DetailContainer>
  );
}
