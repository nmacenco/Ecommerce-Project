import { Dispatch } from "redux";
import {TYPES} from '../interface' ;

const URL = "expample.com";

export const getProductDetail = (id : string | undefined ) => {
  // return async (dispatch: Dispatch) => {
  //   //Ponemos el dispatch para tener mayor control del dispatch
  // };
  return {
    type : TYPES.PRODUCT_DETAIL ,
    payload : {
      id: 4,
      subcategory_id: [{}],
      name: "Procesador",
      brand: "Asus",
      image:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17901_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_71684eb1-grn.jpg",
      price: 48.33,
      description: "Immobilization of Back using Brace",
      weight: 40,
      stock: 27,
    }

  }
};
