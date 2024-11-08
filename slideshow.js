
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const controls = document.querySelector('.slideshow-controls');
let timeoutId;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  
  // Pause all videos when switching slides
  const videos = document.querySelectorAll('video');
  videos.forEach(video => video.pause());

  // Show/hide controls based on current slide type
  toggleControlsVisibility();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function toggleControlsVisibility() {
  const currentContent = slides[currentSlide].querySelector('video');
  if (currentContent) {
	// If it's a video slide, handle mouse movement
	controls.classList.add('hidden');
	
	const videoContainer = slides[currentSlide];
	videoContainer.addEventListener('mousemove', showControlsTemporarily);
  } else {
	// If it's an image slide, always show controls
	controls.classList.remove('hidden');
	clearTimeout(timeoutId);
  }
}

function showControlsTemporarily() {
  controls.classList.remove('hidden');
  clearTimeout(timeoutId);
  
  timeoutId = setTimeout(() => {
	controls.classList.add('hidden');
  }, 3000); // Hide after 3 seconds of inactivity
}

// Initialize the first slide
showSlide(0);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  let currentSlide = 0;

  // Function to update button states
  function updateButtonStates() {
	prevButton.disabled = currentSlide === 0;
	nextButton.disabled = currentSlide === slides.length - 1;
  }

  // Function to show specific slide
  function showSlide(index) {
	slides.forEach(slide => slide.classList.remove('active'));
	slides[index].classList.add('active');
	currentSlide = index;
	updateButtonStates();
  }

  // Event listeners for navigation
  prevButton.addEventListener('click', () => {
	if (currentSlide > 0) {
	  showSlide(currentSlide - 1);
	}
  });

  nextButton.addEventListener('click', () => {
	if (currentSlide < slides.length - 1) {
	  showSlide(currentSlide + 1);
	}
  });

  // Initialize first slide and button states
  showSlide(0);
});