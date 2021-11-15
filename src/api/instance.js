export const registerUser = (userName, userEmail, userPassword) => {
  return new Promise((res, rej) => {
      let usersList = JSON.parse(window.localStorage.getItem('registeredUsersList'));
      if (!usersList) {
          usersList = [];
      }

      const userId = Math.floor((Math.random() * 1000) + 1);
      const loggedIn = true;
      usersList.push({ userName, userEmail, userPassword, userId, loggedIn });
      window.localStorage.setItem('registeredUsersList', JSON.stringify(usersList));
      res({ dataId: userId, dataLogged: loggedIn });
  })
}; 

export const loginUser = (userEmail, userPassword) => {
  return new Promise((res, rej) => {
      let usersList = JSON.parse(window.localStorage.getItem('registeredUsersList'));
  
      if (!usersList) rej();

      let userFind = false;
      const userData = usersList.find(user => user.userEmail === userEmail);
      if (userData !== undefined) {
        userFind = userData.userPassword === userPassword;
        userData.loggedIn = true;
        window.localStorage.setItem('registeredUsersList', JSON.stringify(usersList));
      } else {
        rej();
      }
      
    if (userData && userFind) {
      console.log('userData', userData, 'userFind', userFind)
      res({ userData })
    } else {
      rej(alert("The user doesn't exist. Check input data, please"))
    }
  })
}; 

export const logoutUser = (userId) => {
  return new Promise((res, rej) => {
      let usersList = JSON.parse(window.localStorage.getItem('registeredUsersList'));
      console.log('userIndex',  usersList)
      if (!usersList) rej();
      
      const userIndex = usersList.findIndex(user => user.userId === userId);
      if (userIndex !== -1) {
        usersList[userIndex].loggedIn = false;
        //console.log('usersList', usersList, 'usersList[userIndex].loggedIn', usersList[userIndex].loggedIn)
      } else {
        rej();
      }
      
      window.localStorage.setItem('registeredUsersList', JSON.stringify(usersList));
      res()
    
  })
}; 