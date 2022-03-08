import { USER_AVATAR } from '../actionTypes';

const avatarReducer = (state, action) => {
  let newAvatar = {}; 
  switch (action.type) {
      case (USER_AVATAR.addAvatar):
        newAvatar = {
          avatarImage: action.payload.avatarImage,
          userId: action.payload.userId
        }
        return { ...state, avatar: newAvatar };

        case (USER_AVATAR.removeAvatar):
          newAvatar = {};
          return { ...state, avatar: newAvatar };
          
      default: 
        return {...state}
  }
}

export default avatarReducer;