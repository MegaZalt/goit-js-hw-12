// pixabay
import axios from 'axios';

const API_KEY = '46143804-c250369a659784c87f3539553';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        perPage: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching images:', error);
    throw error;
  }
}
