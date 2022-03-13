import localforage from 'localforage';

export const avatarAddToList = (currentUserAvatar, currentUserId) => {
  localforage.getItem('avatarList').then((value) => {
    let avatarListFromStorage = value;
    const avatarData = { userAvatar: currentUserAvatar, userId: currentUserId };
    if (!avatarListFromStorage) {
      avatarListFromStorage = [];
      avatarListFromStorage.push(avatarData);
    } else {
      const userIndex = avatarListFromStorage.findIndex(avatar => avatar.userId === currentUserId);
      if (userIndex === -1) {
        avatarListFromStorage.push(avatarData);
      } else {
        avatarListFromStorage[userIndex].userAvatar = currentUserAvatar;
      }
    }
    localforage.setItem('avatarList', avatarListFromStorage).then(() => {
    });
  });}


