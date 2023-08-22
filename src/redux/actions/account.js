import axios from "axios";

const API_PATH = process.env.REACT_APP_LOCAL_BACKEND_PATH;

export const getAccount = ({}) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_PATH}/account`
      });

      dispatch({
        type   : "ACCOUNT_PROFILE",
        payload: res.data
      });
      return res;
    } catch (error) {
      console.error(error.response);
    }
  };
};

export const getCollection = ({}) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_PATH}/account/collection`
      });

      dispatch({
        type   : "ACCOUNT_COLLECTION",
        list   : res.data
      });
      return res;
    } catch (error) {
      console.error(error.response);
    }
  }
}
