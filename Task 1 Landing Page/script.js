window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // we may adjust the 50 to the point you want the change to happen
        navbar.classList.add('bg-opacity-80');
    } else {
        navbar.classList.remove('bg-opacity-80');
    }
});

//working of menu and close button in small screen size
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const overlayMenu = document.getElementById('overlay-menu');
  
    // Event listener to open the overlay menu
    menuBtn.addEventListener('click', () => {
      overlayMenu.classList.remove('hidden');
    });
  
    // Event listener to close the overlay menu
    closeBtn.addEventListener('click', () => {
      overlayMenu.classList.add('hidden');
    });
  });

//Updating Nav bar 'active' class
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop-150;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((navLink) => {
        navLink.classList.remove('active');
        if (navLink.getAttribute('href').includes(current)) {
            navLink.classList.add('active');
        }
    });
});



//carousel
let currentSlide = 0;

const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Function to move to a specific slide
function moveToSlide(slideIndex) {
    currentSlide = slideIndex; // Update current slide index
    updateCarousel(); // Update carousel position
    updateDots(); // Update dots for the current slide
    resetTimer(); // Reset the automatic slide timer
}

// Add click event listeners to dots for manual slide control
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        moveToSlide(index);
    });
});

// Update carousel to show the current slide
function updateCarousel() {
    const offset = -currentSlide * 100; // Calculate offset for the slide
    slides.forEach(slide => {
        slide.style.transform = `translateX(${offset}%)`; // Move slide into view
    });
}

// Update dots to reflect the current slide
function updateDots() {
    dots.forEach(dot => {
        dot.classList.replace('bg-yellow-300', 'bg-gray-400'); // Inactive dot color
    });
    dots[currentSlide].classList.replace('bg-gray-400', 'bg-yellow-300'); // Active dot color
}

// Move to the next slide, with wrapping
function moveToNextSlide() {
    moveToSlide((currentSlide + 1) % totalSlides);
}

// Start and manage the automatic slide interval
let slideInterval = setInterval(moveToNextSlide, 6000);

// Reset the automatic slide timer
function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(moveToNextSlide, 6000);
}

// Initialize dots for the first slide
updateDots();
 // Change slide every 5 seconds




let currtestslide = 0;
const test = document.querySelectorAll('.testimonial-slide');
const totaltest = test.length; // This will now include the cloned slide

function movetonexttest() {
    if (currtestslide < totaltest - 1) {
        currtestslide++;
    } else {
        currtestslide = 0;
        resetCarouselPosition();
    }
    updatetestimonial();
}

function updatetestimonial() {
    const offset = -currtestslide * 100;
    test.forEach(slide => {
        slide.style.transform = `translateX(${offset}%)`;
        slide.style.transition = (currtestslide === 0) ? 'none' : 'transform 0.5s ease';
    });
}

function resetCarouselPosition() {
    setTimeout(() => {
        test.forEach(slide => {
            slide.style.transition = 'none';
            slide.style.transform = 'translateX(0)';
        });
    }, 600); // This is slightly longer than the CSS transition time so it can be smooth
}

setInterval(movetonexttest, 6000);


// ----------------Portfolio------------

const btns = document.querySelectorAll('.buttons button');
const imgs = document.querySelectorAll('.images img');

for (let i = 1; i < btns.length; i++) {
    btns[i].addEventListener('click', filterImg);
}

// Set active button on click
function setActiveBtn(e) {
    // Remove active class from all buttons
    btns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    // Add active class to clicked button
    e.target.classList.add('btn-active');
}

// Filter Cards
function filterImg(e) {
    setActiveBtn(e);

    imgs.forEach(img => {
        const card = img.closest('.card'); // Get the parent card of the image

        // Reset all cards to visible
        card.classList.remove('card-hide');
        card.classList.add('card-show');

        const imgType = parseInt(img.dataset.img);
        const btnType = parseInt(e.target.dataset.btn);

        if (imgType !== btnType) {
            card.classList.remove('card-show');
            card.classList.add('card-hide');
        }
    });
}

// click event for the 'All' button
btns[0].addEventListener('click', (e) => {
    setActiveBtn(e);
    imgs.forEach(img => {
        const card = img.closest('.card');
        card.classList.remove('card-hide');
        card.classList.add('card-show');
    });
});


  function checkIfElementsInView() {
    const elements = document.querySelectorAll('.expanding-container, .left-part, .right-part, .up-part');

    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;

        // Check if element is in viewport
        if (rect.bottom > 0 && rect.top < viewHeight) {
            element.classList.add('active');
        }
    });
}

// Event listeners
window.addEventListener('scroll', checkIfElementsInView);
window.addEventListener('load', checkIfElementsInView);

document.addEventListener('DOMContentLoaded', () => {
    const navDropdown = document.getElementById('navbarDropdown');
    const dropdownMenu = navDropdown.nextElementSibling;
  
    navDropdown.addEventListener('mouseover', function () {
      dropdownMenu.classList.remove('hidden');
    });
  
    navDropdown.addEventListener('mouseout', function () {
      dropdownMenu.classList.add('hidden');
    });
  
    dropdownMenu.addEventListener('mouseover', function () {
      this.classList.remove('hidden');
    });
  
    dropdownMenu.addEventListener('mouseout', function () {
      this.classList.add('hidden');
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
    const counterElements = document.querySelectorAll('.animatedNumber');
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('is-animated')) {
          entry.target.classList.add('is-animated');
          const targetNumber = parseInt(entry.target.getAttribute('data-target'), 10);
          let currentNumber = 0;
          const increment = targetNumber / 200; // Random number for speed
  
          const updateCount = () => {
            currentNumber += increment;
            if (currentNumber < targetNumber) {
              entry.target.textContent = `${Math.ceil(currentNumber)}`;
              requestAnimationFrame(updateCount);
            } else {
              entry.target.textContent = `${targetNumber}`;
            }
          };
  
          updateCount();
        }
      });
    }, { threshold: 0.6 });
  
    counterElements.forEach(el => observer.observe(el));
  });
  