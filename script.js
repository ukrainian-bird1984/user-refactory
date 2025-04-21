const ACCESS_KEY = 'pCf_FzDA5s8yR4Hm8Zwli4VDOL1mqn_pjt7PcQgG1Do'; // Ваш API ключ для Unsplash
let slideshowInterval;
let currentIndex = 0;

// Функція для пошуку зображень через Unsplash API
async function searchImages(query) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`);
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

// Функція для відображення зображень у контейнері
function displayImages(images) {
  const container = document.getElementById('imageContainer');
  container.innerHTML = ''; // Очищаємо контейнер перед відображенням нових зображень

  images.forEach((image) => {
    const img = document.createElement('img');
    img.src = image.urls.small;
    img.classList.add('image-thumb');
    img.addEventListener('click', () => selectImage(image.urls.small)); // Додаємо обробник для вибору зображення
    container.appendChild(img);
  });

  startSlideshow(images); // Запуск слайдшоу
}

// Функція для старту слайдшоу
function startSlideshow(images) {
  clearInterval(slideshowInterval);
  const display = document.getElementById('slideshow');
  if (!images.length) return;

  currentIndex = 0;
  display.src = images[currentIndex].urls.small;

  slideshowInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    display.src = images[currentIndex].urls.small;
  }, 3000);
 } // Зміна зображень кож
