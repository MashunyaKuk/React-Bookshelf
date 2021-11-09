import axios from 'axios';
import { store } from '../store/initStore';

const remoteLibraryInstance = axios.create ({
  baseURL: "http://openlibrary.org/",
});

remoteLibraryInstance.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
)


export const getBooks = (searchQuery) => {
  return new Promise((res, rej) => {
    remoteLibraryInstance.get(`search.json`, {params: {author: searchQuery}})
      .then((response) => {
        const data = response.data.docs;
        const booksByAuthors = data.map(x => x.title);
        if (!booksByAuthors) rej()
        res(booksByAuthors)
      })
  })
    
}

