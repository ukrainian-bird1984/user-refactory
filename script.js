const ACCESS_KEY = 'pCf_FzDA5s8yR4Hm8Zwli4VDOL1mqn_pjt7PcQgG1Do';
let slideshowInterval;
let currentIndex = 0;

async function searchImages() {
  const query = document.getElementById('searchInput').value;
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}&per_page=20`;

  try {
    const response = await axios.get(url);
    const images = response.data.results;
    const slideshow = document.getElementById('slideshow');
    slideshow.innerHTML = '';
    currentIndex = 0;

    images.forEach((img, index) => {
      const imageElement = document.createElement('img');
      imageElement.src = img.urls.regular;
      imageElement.style.display = index === 0 ? 'block' : 'none';
      imageElement.style.cursor = 'pointer';

      // Додаємо подію кліку — вибір зображення
      imageElement.addEventListener('click', () => {
        showImage(index);
      });

      slideshow.appendChild(imageElement);
    });

    startSlideshow();
  } catch (error) {
    console.error('Errore durante il caricamento delle immagini:', error);
  }
}

function startSlideshow() {
  clearInterval(slideshowInterval);
  const images = document.querySelectorAll('#slideshow img');

  slideshowInterval = setInterval(() => {
    showImage((currentIndex + 1) % images.length);
  }, 2500);
}

function showImage(index) {
  const images = document.querySelectorAll('#slideshow img');
  images.forEach((img, i) => {
    img.style.display = (i === index) ? 'block' : 'none';
  });
  currentIndex = index;
}


