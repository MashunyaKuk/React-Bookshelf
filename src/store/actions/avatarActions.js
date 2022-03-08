import { USER_AVATAR } from '../actionTypes';

export const avatarAdd = (avatarImage, userId) => {
  return ( {
    type: USER_AVATAR.addAvatar,
    payload: {
      avatarImage,
      userId
    }
  })
};

export const avatarRemove = () => {
  return ({
    type: USER_AVATAR.removeAvatar,
    payload: {
  }
})
};

