import axios from "axios";

import apis from "./apis";

const API_PATH = process.env.REACT_APP_LOCAL_BACKEND_PATH;

export const getShortsList = ({
  other={}
}) => {

  const { type=null } = other;

  return async (dispatch) => {
    try {
      const res = await axios({
        method : "get",
        url    : `${API_PATH}${apis['home'][type]['pathname']}`
      });

      dispatch({
        type: apis['home'][type]['type'],
        list: res.data.items
      });
      return res;
    } catch (error) {
      console.error(error.response);
    }
  };
};
