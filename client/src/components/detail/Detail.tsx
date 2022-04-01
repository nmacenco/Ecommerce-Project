import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetail } from '../../redux/actions/productDetail';
import { State } from '../../redux/reducers/index'
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
  ImagesContainer
} from "./DetailStyles";

export default function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>()
  const product = useSelector((state: State) => state.productDetail)

  // const product = useSelector(state )

  useEffect(() => {
    dispatch(getProductDetail(id))
    return () => {

    }
  }, [])

  return (
    <DetailContainer>
      <Box>
        <div>
          <h3>{product.name}</h3>
        </div>
        <div className="card">
          <div className="card-body">
            <ImgPriceContainer>
              <ImagesContainer>
                <DetailImg src={product.image} alt="product-image"></DetailImg>
                <MiniImagesBox>
                  {/* <div className="card">
                  <div className="card-body"> */}
                  <MiniImages src={product.image} alt="product-image"></MiniImages>
                  <MiniImages src={product.image} alt="product-image"></MiniImages>
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
                  <button type="button" className="btn btn-danger btn-sm">Delete</button>
                  <button type="button" className="btn btn-warning btn-sm">Edit</button>
                </DeleteEditButton>

              </Price>
            </ImgPriceContainer>
          </div>
        </div>
        <div></div>
      </Box>
      <ReviewComentsBox>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#home">Description</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" data-bs-toggle="tab" href="#profile">Reviews</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " data-bs-toggle="tab" href="#questions">Questions</a>
          </li>
        </ul>
        <div id="myTabContent" className="tab-content">
          <div className="tab-pane fade" id="home">
            <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
          </div>
          <div className="tab-pane fade active show" id="profile">
            <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
          </div>
          <div className="tab-pane fade active show" id="questions">
            <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork</p>
          </div>

        </div>
      </ReviewComentsBox>
    </DetailContainer>
  );
}
