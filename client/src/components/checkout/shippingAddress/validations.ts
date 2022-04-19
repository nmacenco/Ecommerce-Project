// import { ProductForm } from "../../redux/interface";

export interface Errors {
  // name : string,
  address : string,
  city : string,
  postalCode : string,

}

export function errorsCheck(props: any): Errors | Boolean{
  let errors: Errors = {
    // name : '',
    address : '',
    city : '',
    postalCode : '',

  };
  let flag: boolean = false;

  //NAME
  // if (!props.name) {
  //   flag = true;
  //   errors.name = "Name required.";
  // }

  //BRAND
  if (!props.address) {
    flag = true;
    errors.address = "Brand required.";
  }

  //IMAGE
  if (!props.city) {
    flag = true;
    errors.city = "Image required.";
  }

  //DESCRIPTION
  if (!props.postalCode) {
    flag = true;
    errors.postalCode = "Description required.";
  }

  let errorsCheckResult: boolean | Errors = false;

  if (flag) errorsCheckResult = errors;

  return errorsCheckResult;
}
