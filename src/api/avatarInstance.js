
export const avatarAddToList = (currentUserAvatar, currentUserId) => {
  return new Promise((res, rej) => {
    let avatarList = JSON.parse(window.localStorage.getItem('avatarList'));
    const avatarData = { userAvatar: currentUserAvatar, userId: currentUserId };
    if (!avatarList) {
      avatarList = [] ;
      avatarList.push(avatarData);
    } else {
      const userIndex = avatarList.findIndex(avatar => avatar.userId === currentUserId);
      if (userIndex === -1) {
        avatarList.push(avatarData);
      } else {
        avatarList[userIndex].userAvatar = currentUserAvatar;
      }
    }
    window.localStorage.setItem('avatarList', JSON.stringify(avatarList));
    res({ avatarData });
  }
)}

export const avatarCurrent = (currentUserId) => {
  return new Promise((res, rej) => {
    let avatarList = JSON.parse(window.localStorage.getItem('avatarList'));
    if (!avatarList) rej();
    const currentUserAvatar = avatarList.filter((avatar) => {
      if (avatar.userId === currentUserId) {
        return avatar;
      }
  }
)
    res(currentUserAvatar);
  }
  )}

