import { Actions, Product, TYPES_DETAIL } from '../interface';

const INITIAL_PRODUCT = {
  id: 0,
  name: "",
  image: "",
  price: 0,
  description: "",
  weight: 0,
  stock: 0,
  soldCount: 0,
  BrandId: 0,
  brand: "",
  SubcategoryId: 0,
  subcategory: "",
  CategoryId: 0,
  category: 0,
  questions: [],
  reviews: [],
  count: 0,
};

export const productDetailReducer = (state: Product = INITIAL_PRODUCT, action: Actions): Product => {

  switch (action.type) {
    case TYPES_DETAIL.PRODUCT_DETAIL:
      console.log('Producto is: ',action.payload);
      return action.payload as Product;

    case TYPES_DETAIL.DELETE_PRODUCT_DETAIL:
      return action.payload as Product;

    case TYPES_DETAIL.CREATE_QUESTION:
      // console.log('PAYLOAD QUESTION: ',action.payload);
      let newArray=[];
      newArray.push(action.payload);
      return {
        ...state,
        questions: newArray.concat(state.questions),
      };
    case TYPES_DETAIL.CREATE_REWIE:
      console.log("state de rewies ", state.reviews);
      let newArrayRewies = [];
      newArrayRewies.push(action.payload);
      return {
        ...state,
        reviews: newArrayRewies.concat(state.reviews),
      };

    case TYPES_DETAIL.UPDATE_QUESTION:

        let arrayQ=state.questions;

        let indexQ=arrayQ.findIndex(question=>question.question.id === action.payload.id);
        console.log(arrayQ);

        let newQ=arrayQ[indexQ].question;
        newQ.answer = action.payload.answer;
        console.log(newQ);
        arrayQ[indexQ]={
          question:newQ
        };

        return {
          ...state,
          questions:[...arrayQ]
        }



    default:
      return state;
  }
};
