import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

// reduce는 previousState + action = NextState만드는 역할
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      // state를 똑같이 가져오고
      // ... spread operator = 똑같이 가져오는 것, 빈 상태
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };

    default:
      return state;
  }
}
