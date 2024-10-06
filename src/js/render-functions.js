import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function renderGallery(hits) {
  const gallery = document.querySelector('.gallery');
  const markup = hits
    .map(hit => {
      return `
      <div class="gallery-item">
      <a href="${hit.largeImageURL}">
           <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
           </a>
         </div>`;
    })
    .join('');

  gallery.innerHTML = markup
  lightbox = new SimpleLightbox('.gallery a');
}

export function appendGallery(hits) {
  const gallery = document.querySelector('.gallery');
  const markup = hits
    .map(hit => {
      return `
     <div class="gallery-item">
     <a href="${hit.largeImageURL}">
          <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
          </a>
        </div>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
