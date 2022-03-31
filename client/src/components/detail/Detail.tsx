import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
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
const product = {
  id: 4,
  subcategory_id: [{}],
  name: "Teclado Mecanico",
  brand: "Asus",
  image:
    "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17901_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_71684eb1-grn.jpg",
  price: 48.33,
  description: "Immobilization of Back using Brace",
  weight: 40,
  stock: 27,
};
export default function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const product = useSelector(state )

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
  {/* <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
    <div className="dropdown-menu">
      <a className="dropdown-item" href="#">Action</a>
      <a className="dropdown-item" href="#">Another action</a>
      <a className="dropdown-item" href="#">Something else here</a>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" href="#">Separated link</a>
    </div>
  </li> */}
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
  {/* <div className="tab-pane fade" id="dropdown1">
    <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
  </div>
  <div className="tab-pane fade" id="dropdown2">
    <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>
  </div> */}
</div>
      </ReviewComentsBox>
    </DetailContainer>
  );
}
