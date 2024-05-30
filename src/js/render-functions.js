export function imageTemplate(image) {
  return ` <li class="list-item">
            <a href="${image.largeImageURL}" class="gallery-item">
              <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-img" />
            </a>
            <div class="info">
              <p>Likes: ${image.likes}</p>
              <p>Views: ${image.views}</p>
              <p>Comments: ${image.comments}</p>
              <p>Downloads: ${image.downloads}</p>
            </div>
          </li>`;
}

export function imagesTemplate(arr) {
  return arr.map(imageTemplate).join('');
}
