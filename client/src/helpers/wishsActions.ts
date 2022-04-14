const URL_WISH = "http://localhost:3001/api/wishList";

const falseCall = (error: any, data: any) => {
  console.log("ERROR: ", error);
};

/**
 *  Ceate a wish for the user wishList
 * @param id is the product id
 * @param token User token
 * @param callback function (optional)  receives the response of the request
 */
export const createWish = async (
  id: number,
  token: string,
  callback = falseCall
) => {
  try {
    const response = await fetch(URL_WISH + `/${id}`, {
      method: "POST",
      headers: {
        "auth-token": token,
      },
    });
    const data = await response.json();
    // console.log(data);

    if (data.errorMsg) {
      console.log("error data: ", data.errorMsg);
      callback(data.errorMsg, data);
    } else {
      callback(null, data);
    }
  } catch (error) {
    console.log("ERROR EN POST WISHS: ", error);
  }
};
