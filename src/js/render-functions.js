import SimpleLightbox from 'simplelightbox';
import '/dist/simple-lightbox.min.css';

let lightbox = null;

export function renderGallery(images) { 
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  if (images.length === 0) {
    gallery.innerHTML =
      '<p>No images. Please try again!</p>';
    return;
  }

  const markup = images.map(image => {
    return`<div class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
      </div>`;
    })
    .join('');

  gallery.innerHTML = markup;

  if(!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionsDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}