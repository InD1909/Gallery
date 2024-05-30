import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function searchImage(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '37050490-6d3dacd6192465869ce2cc708',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${BASE_URL}?${params}`;

  return fetch(url)
    .then(res => res.json())
    .catch(function (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    });
}
