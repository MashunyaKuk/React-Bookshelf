import axios from 'axios';

const remoteLibraryInstance = axios.create ({
  baseURL: "http://openlibrary.org/",
});


remoteLibraryInstance.interceptors.request.use((config) => {

  // spinning start to show
  document.body.classList.add('loading-indicator');
  return config
}, function (error) {
  return Promise.reject(error);
});

remoteLibraryInstance.interceptors.response.use((response) => {

  // spinning hide
  document.body.classList.remove('loading-indicator');

  return response;
}, function (error) {
  return Promise.reject(error);
});


export const getBooks = (searchQuery) => {
  return new Promise((res, rej) => {
    remoteLibraryInstance.get(`search.json`, {params: {author: searchQuery}})
      .then((response) => {
        const data = response.data.docs;
        if (!data) rej()
        res(data)
      })
  })
    
}

