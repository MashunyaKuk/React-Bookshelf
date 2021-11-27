import axios from 'axios';

const remoteLibraryInstance = axios.create ({
  baseURL: "http://openlibrary.org/",
});


const remoteCoversInstance = axios.create ({
  baseURL: "https://covers.openlibrary.org/b/isbn",
  responseType: 'blob',
});

/* remoteLibraryInstance.interceptors.request.use((config) => {

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
}); */


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

export const getCover = (coverId) => {
  return new Promise((res, rej) => {
    remoteCoversInstance.get(`/${coverId}-L.jpg`)
      .then((response) => {
        const data = (response.data);
        res(data);
      })
  })
}
