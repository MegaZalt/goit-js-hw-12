import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function renderGallery(hits) {
  const gallery = document.querySelector('.gallery');
  const markup = hits
    .map(hit => {
      return `
      <div class="gallery-item">
           <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
         </div>`;
    })
    .join('');

  gallery.innerHTML = markup;

  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
      captionDelay: 250,
  });
}

export function appendGallery(hits) {
  const gallery = document.querySelector('.gallery');
  const markup = hits
    .map(hit => {
      return `
     <div class="gallery-item">
          <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
        </div>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if(lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}
