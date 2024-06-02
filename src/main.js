export const formElem = document.querySelector('#search-form');
export const imagesList = document.querySelector('#list');
export const loadMoreBtn = document.querySelector('#load-more');
export const loaderPage = document.querySelector('.loader');
let query = '';
let page = 1;
let totalHits = 0;
let loadedHits = 0;
// export const pageLoader = document.querySelector('.loader');

import './js/pixabay-api';
import './js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { imagesTemplate } from './js/render-functions';
import { searchImage } from './js/pixabay-api';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// loaderPage.classList.remove('.hidden');
formElem.addEventListener('submit', async e => {
  e.preventDefault();

  query = e.target.elements.query.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }
  page = 1;
  imagesList.innerHTML = '';
  loadMoreBtn.classList.add('hidden');
  loaderPage.classList.remove('hidden');
  try {
    const data = await searchImage(query, page);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    totalHits = data.totalHits;
    loadedHits = data.hits.length;

    const markup = imagesTemplate(data.hits);
    imagesList.innerHTML = markup;
    lightbox.refresh();
    if (loadedHits < totalHits) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    loaderPage.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  loaderPage.classList.remove('hidden');
  try {
    page += 1;
    const data = await searchImage(query, page);

    loadedHits += data.hits.length;

    const markup = imagesTemplate(data.hits);
    imagesList.insertAdjacentHTML('beforeend', markup);

    const { height: cardHeight } = document
      .querySelector('.gallery a')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    lightbox.refresh();

    if (loadedHits >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    loaderPage.classList.add('hidden');
  }
});
