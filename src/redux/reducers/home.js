/* eslint-disable import/no-anonymous-default-export */
export default (
  state = {
    foryouShorts  : [],
    folloingShorts: []
  },
  action
) => {
  const { type = "", payload = "", list = [] } = action;
  switch (type) {
    case "HOME_FORYOU_SHORTS":
      state = { ...state, foryouShorts: list };
      break;

    case "HOME_FOLLOWING_SHORTS":
      state = { ...state, folloingShorts: list };
      break;

    default:
  }

  return state;
};
