import axios from 'axios';

const API_KEY = '46143804-c250369a659784c87f3539553';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 20) {

  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('Error fetching images:', error);
    throw error;
  }
}

