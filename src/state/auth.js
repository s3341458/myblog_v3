const initialState = {
  logined: false,
};

const LOGIN = 'LOGIN';

export const loginAction = () => ({
  type: LOGIN
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, logined: true };
    default:
      return state;
  }
};
