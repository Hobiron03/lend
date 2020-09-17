import { ADD_FRIEND_TO_LIST } from "../actions";

interface friendAction {
  type: string;
  friend: {
    id: number;
    icon_image: string;
    name: string;
  };
}

const friends = (state = [{}], action: friendAction) => {
  switch (action.type) {
    case ADD_FRIEND_TO_LIST:
      return [...state, action.friend];
    default:
      return state;
  }
};

export default friends;
