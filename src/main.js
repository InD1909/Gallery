export const formElem = document.querySelector('#search-form');
export const imagesList = document.querySelector('#list');
// export const pageLoader = document.querySelector('.loader');

import './js/pixabay-api';
import './js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { imagesTemplate } from './js/render-functions';
import { searchImage } from './js/pixabay-api';

formElem.addEventListener('submit', e => {
  e.preventDefault();

  const query = e.target.elements.query.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  searchImage(query).then(data => {
    const markup = imagesTemplate(data.hits);
    imagesList.innerHTML = markup;
    lightbox.refresh();
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
  });
});

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
