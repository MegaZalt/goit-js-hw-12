import simpleLightbox from 'simplelightbox';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  const markup = images
    .map(image => {
      return `
    <div class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
      </div>`;
    })
    .join('');

  gallery.innerHTML = markup;

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionsDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function appendGallery(images) {
  const gallery = document.querySelector('.gallery');

  const markup = images.map(image => {
    return `
    <div class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
      </div>`;
  });
  join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new simpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
