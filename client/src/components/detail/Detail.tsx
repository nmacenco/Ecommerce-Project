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
import NewRewie from './reviews/NewRewie';
import Loading from "../loading/Loading";
import { DetailContainer, Box, ImgPriceContainer, Price, DeleteEditButton, ImagesContainer, } from "./DetailStyles";
import { resetFilterProducts } from "../../redux/actions/filterByCategory";
import swal from "sweetalert";
import Question from "./questions/Question";
import NewQ from "./questions/NewQ";
import { addProductCart } from "../../redux/actions/cart";
import { Product } from "../../redux/interface";
import { useLocalStorage } from "../../helpers/useLocalStorage";
import TrashIMG from "../../icons/white-trash.png"
import EditIMG from "../../icons/edit.png"
import { resetPoducts } from "../../redux/actions/products";


export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const product = useSelector((state: State) => state.productDetail);
  const user = useSelector((state: State) => state.user);
  const productsCart = useSelector((state: State) => state.cart.cart);
  const [userInStorage, setuserInStorage] = useLocalStorage('USER_LOGGED', '')
  const productInCart = productsCart.find((x: Product) => x.id === product.id);




  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => {
      dispatch(deleteProductDetail());
      dispatch(resetFilterProducts());
      dispatch(resetPoducts());
    };
  }, []);

  function addCartHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    const count = productInCart ? productInCart.count + 1 : 1;
    if (Number(count) <= Number(product.stock)) {
      product.count = count;
      dispatch(addProductCart(product));
    }
  }

  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((value) => {
      if (value) {
        dispatch(deleteProduct(id, userInStorage.token));
        navigate("/products");
        // dispatch(resetPoducts())
        swal({
          text: "Product deleted",
          icon: "success",
        });
      }
    });
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

                  {product.count === product.stock || productInCart && productInCart.count === product.stock ? (
                    <button
                      type="button"
                      className="btn btn-primary btn"
                      disabled
                    >
                      No stock
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn"
                      onClick={(e) => addCartHandler(e)}
                    >
                      Add to cart
                    </button>
                  )}

                  {
                    userInStorage && userInStorage.role === 'admin' ?
                      <DeleteEditButton>
                        <button
                          onClick={deleteHandler}
                          type="button"
                          className="btn btn-danger btn-sm"
                        >
                          <img src={TrashIMG} alt="delete"></img>
                        </button>
                        <Link to={`/editProduct/${product.id}`}>
                          <button type="button" className="btn btn-warning btn-sm">
                            <img src={EditIMG} alt="edit"></img>
                          </button>
                        </Link>
                      </DeleteEditButton> :
                      <div></div>
                  }
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
            {
              user ?
                <NewRewie />
                : null
            }
            {console.log('rewies: ', product.reviews)}
            {
              product.reviews && product.reviews.map((rew, i) => {
                // console.log(rew.review)
                return (
                  <Rewies title={rew.review.title} stars={rew.review.stars} key={i} texto={rew.review.description} />
                )
              })
            }
          </div>
          <div className="tab-pane fade m-2" id="questions">
            {user ? <NewQ ProductId={product.id!} /> : null}
            {/* {console.log('QUESTIONS: ', product.questions)} */}
            {
              product.questions && product.questions.map((question, i) => {
                // console.log(question);
                return (
                  <Question title={question.question.title} body={question.question.description} key={i} answer={question.question.answer} user={user} idA={question.question.id} />
                )

              })
            }
          </div>
        </div>
      </Box>
    </DetailContainer>
  );
}
