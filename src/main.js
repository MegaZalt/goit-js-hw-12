// main.js
import 'izitoast/dist/css/iziToast.css';
import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('searchForm');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;

function toggleLoader(isVisible) {
  if (isVisible) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
}

function clearGallery() {
  gallery.innerHTML = '';
}

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = document.getElementById('query').value.trim();

  if (query !== currentQuery) {
    currentQuery = query;
    currentPage = 1;
    clearGallery();
  }

  if (!query) {
    iziToast.show({
      title: 'Warning',
      message: 'Please enter a search query!',
      color: 'yellow',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  toggleLoader(true);

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    if (data.his.length === 0) {
      iziToast.show({
        title: 'Warning',
        message: 'Please enter a search query!',
        color: 'yellow',
        position: 'topRight',
      });
    } else {
      renderGallery(data.hits);
      currentPage++;
    }
  } catch (error) {
    console.log(error);
    iziToast.show({
      title: 'Error',
      message: 'Failed to load images!',
      color: 'red',
      position: 'topRight',
    });
  }finally {
    toggleLoader(false);
  }
});
