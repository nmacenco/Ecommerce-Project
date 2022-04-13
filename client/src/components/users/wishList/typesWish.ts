const URL_WISH = "";

export interface Wish {
  img: string;
  name: string;
  price: number;
  stock: string;
}

export const getWish = async (callback: any) => {
  try {
    const response = await fetch(URL_WISH);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log("ERROR EN GET WISHS: ", error);
  }
};
