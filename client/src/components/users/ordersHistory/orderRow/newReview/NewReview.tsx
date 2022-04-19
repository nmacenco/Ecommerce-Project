import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Container, FormRewie } from "./NewReviewStyle";
import {
  RewieHeader,
  RewiewContainer,
  Rewiewstars,
} from "../../../../detail/reviews/ReviewStyle";
import { State } from "../../../../../redux/reducers";
import { Link } from "react-router-dom";
import { createReview } from "../../../../../redux/actions/productDetail";
import swal from "sweetalert";

function returnStar(id: string) {
  let star = id[id.length - 1];
  switch (star) {
    case "1":
      return 5;
    case "2":
      return 4;
    case "3":
      return 3;
    case "4":
      return 2;
    case "5":
      return 1;
  }
}

const NewReview = (props: any): JSX.Element => {
  const navigate = useNavigate();
  const user = useSelector((state: State) => state.user);
  const [data, setData] = useState<number>();
  const dispatch = useDispatch();
  const User = useSelector((state: State) => state.user);
  const Products = useSelector((state: State) => state.products.products);
  const { userId, productId } = useParams();
  const product = Products.filter((x) => x.id == Number(productId));

  const SendRewie = (event: any) => {
    event.preventDefault();
    let title = event.target.title.value;
    let body = event.target.body.value;

    if (!title || !body || !data) {
        swal({
            title: 'Complete all the fields.',
            icon: 'error'
        })
    } else {
      User &&
        dispatch(
          createReview(title, body, Number(productId), Number(userId), data)
        );
      navigate("/ordersHistory");
    }
  };

  const handleStar = (event: any) => {
    let star = returnStar(event.target.htmlFor);
    setData(star);
  };

  return (
    <Container className="container-fluid">
      {user ? (
        <>
          <h3 className="text-center pt-5 pb-4">Make your review</h3>
          <RewiewContainer className="card border-secondary">
            <RewieHeader className="card-header">
              {product[0] && <p>{product[0].name}</p>}
              <Rewiewstars>
                <input type="radio" name="star" id="star1" />
                <label htmlFor="star1" onClick={handleStar}></label>
                <input type="radio" name="star" id="star2" />
                <label htmlFor="star2" onClick={handleStar}></label>
                <input type="radio" name="star" id="star3" />
                <label htmlFor="star3" onClick={handleStar}></label>
                <input type="radio" name="star" id="star4" />
                <label htmlFor="star4" onClick={handleStar}></label>
                <input type="radio" name="star" id="star5" />
                <label htmlFor="star5" onClick={handleStar}></label>
              </Rewiewstars>
            </RewieHeader>
            <FormRewie className="card-body" onSubmit={SendRewie}>
              <input type="text" placeholder="Title..." name="title" />
              <textarea placeholder="Review..." name="body"></textarea>
              <div className="buttons">
                <Link to="/ordersHistory">
                  <button className="btn btn-primary">Cancel</button>
                </Link>
                <button className="btn btn-primary">Create</button>
              </div>
            </FormRewie>
          </RewiewContainer>
        </>
      ) : (
        <div className="container text-center pt-5">
          <h5 className="mt-5 mb-5">
            You have to buy a product and be logged to make a review.
          </h5>
          <Link to="/products">
            <button className="btn btn-primary">SEE PRODUCTS</button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default NewReview;
