import { CREATE_USER } from "../actions";

interface userAction {
  type: string;
  user: {
    id: number;
    name: string;
    password: string;
    point: string;
    friend_list: string;
  };
}

const user = (state = {}, action: userAction) => {
  switch (action.type) {
    case CREATE_USER:
      console.log(action.user);
      const newState = {
        ...state,
        id: action.user.id,
        name: action.user.name,
        password: action.user.password,
        point: action.user.point,
        friend_list: action.user.friend_list,
      };
      localStorage.setItem("user", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};

export default user;
