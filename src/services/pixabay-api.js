import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

const API_KEY = '34862822-8eb02c3fef422917f168c53cc';

const fetchImages = async (searchingImages, page, perPage) => {
  const response = await axios.get(
    `/api/?q=${searchingImages}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  return response;
};

const api = {
  fetchImages,
};

export default api;
