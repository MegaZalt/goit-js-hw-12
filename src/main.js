// main.js
import 'izitoast/dist/css/iziToast.css';
import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, appendGallery } from './js/render-functions.js';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('searchForm');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalHits = 0;

function toggleLoader(isVisible) {
  if (isVisible) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
}

function toggleLoaderButton(isVisible) {
    if (isVisible) {
        loadMoreBtn.classList.remove('hidden');
      } else {
        loadMoreBtn.classList.add('hidden');
      }
}

function clearGallery() {
  gallery.innerHTML = '';
}

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = document.getElementById('query').value.trim();

  toggleLoaderButton(false);
  clearEndMessage();

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

  toggleLoader(true);

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.show({
        title: 'Warning',
        message: 'Please enter a search query!',
        color: 'yellow',
        position: 'topRight',
      });
      toggleLoaderButton(false);
      return;
    }

    renderGallery(data.hits);
    currentPage++;
    
    if(currentPage * perPage < totalHits) {
      toggleLoaderButton(true);
    }else {
      toggleLoaderButton(false);
      showEndMessage();
    }

    scrollPage();

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

loadMoreBtn.addEventListener('click', async () => {
    toggleLoader(true);
    toggleLoaderButton(false);

    try {
        const data = await fetchImages(currentQuery, currentPage, perPage);

        if(data.hits.length > 0) {
            appendGallery(data.hits);
            currentPage++;
            scrollPage();
        } 

        if(currentPage * perPage >= totalHits) {
          toggleLoaderButton(false);
          showEndMessage();
        } else {
          toggleLoaderButton(true);
        }
        
    } catch (error) {
        console.log('Error loading more images:', error);
        iziToast.show({
            title: 'Error',
            message: 'Could not load more images. Please try again later.',
            color: 'red',
            position: 'topRight',
        });
    } finally {
        toggleLoader(false);
    }
});

function scrollPage() {
  const galleryItem = document.querySelector('.gallery-item');
  if(galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
          top: height * 2,
          behavior: 'smooth',
      })
  }
}

function showEndMessage() {
  const message = document.createElement('p');
  message.textContent = "We're sorry, but you've reached the end of search results.";
  message.classList.add('end-message');
  gallery.appendChild(message);
}

function clearEndMessage() {
  const endMessage = document.querySelector('.end-message');
  if(endMessage) {
    endMessage.remove();
  }
}
