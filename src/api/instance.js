export const registerUser = (userName, userSurname, userEmail, userPassword) => {
  return new Promise((res, rej) => {
      let usersList = JSON.parse(window.localStorage.getItem('registeredUsersList'));
      if (!usersList) {
          usersList = [];
      }

      const userId = Math.floor((Math.random() * 1000) + 1);
      const loggedIn = true;
      usersList.push({ userName, userSurname, userEmail, userPassword, userId, loggedIn });
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
      res({ userData })
    } else {
      rej(alert("The user doesn't exist. Check input data, please"))
    }
  })
}; 

export const logoutUser = (userId) => {
  return new Promise((res, rej) => {
      let usersList = JSON.parse(window.localStorage.getItem('registeredUsersList'));
      if (!usersList) rej();
      
      const userIndex = usersList.findIndex(user => user.userId === userId);
      if (userIndex !== -1) {
        usersList[userIndex].loggedIn = false;
      } else {
        rej();
      }
      
      window.localStorage.setItem('registeredUsersList', JSON.stringify(usersList));
      res()
    
  })
}; 

export const changeUser = (newUserName, newUserSurname, newUserEmail, newUserPassword) => {
  return new Promise((res, rej) => {
      let usersList = JSON.parse(window.localStorage.getItem('registeredUsersList'));
      if (!usersList) {
          usersList = [];
      }

      const userIndex = usersList.findIndex(user => user.loggedIn);
      if (userIndex !== -1) {
        usersList[userIndex].userName = newUserName;
        usersList[userIndex].userSurname = newUserSurname;
        usersList[userIndex].userEmail = newUserEmail;
        usersList[userIndex].userPassword = newUserPassword;
      } else {
        rej();
      }

      window.localStorage.setItem('registeredUsersList', JSON.stringify(usersList));
      res(usersList[userIndex])
  })
}; 

