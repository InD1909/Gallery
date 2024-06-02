import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { loaderPage } from '../main';

export async function searchImage(query, page = 1, per_page = 15) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '37050490-6d3dacd6192465869ce2cc708',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page,
  });

  const url = `${BASE_URL}?${params}`;
  const response = await axios.get(url);
  return response.data;
}
