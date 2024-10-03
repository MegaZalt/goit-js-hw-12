const API_KEY = '46143804-c250369a659784c87f3539553';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 12) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);

    if(!response.ok) {
      throw new Error('Error loading images');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Sorry, there are no images matching your search query. Please try again!', error);
    throw error;
  }
}