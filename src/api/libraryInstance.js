import axios from 'axios';

const remoteLibraryInstance = axios.create ({
  baseURL: "http://openlibrary.org/",
});


const remoteCoversInstance = axios.create ({
  baseURL: "https://covers.openlibrary.org/b/isbn",
  responseType: 'blob',
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

export const getCover = (coverId) => {
  return new Promise((res, rej) => {
    remoteCoversInstance.get(`/${coverId}-L.jpg`)
      .then((response) => {
        const data = (response.data);
        res(data);
      })
  })
}
