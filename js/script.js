// Select carousel elements
const carouselImages = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-images img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Select hamburger menu elements
const hamburger = document.querySelector(".hamburger");
const hamburgerLinks = document.querySelector(".hamburger-links");

// Select newsletter subscription elements
const subscribeLink = document.querySelector(".newsletter-link");
const dialog = document.querySelector(".newsletter-dialog");
const closeDialogBtn = document.querySelector(".close-dialog");
const subscribeForm = document.querySelector(".newsletter-form");
const thankYouMessage = document.querySelector(".thank-you-message");

// Carousel settings
let index = 1; // Start at the first real image
const totalImages = images.length; // Includes cloned images for looping effect
const transitionTime = 1000; // Animation speed in milliseconds

/**
 * Moves the carousel to the current index with optional animation.
 * @param {boolean} animate - Whether to animate the transition.
 */
function updateCarousel(animate = true) {
    if (carouselImages) {
        carouselImages.style.transition = animate ? `transform ${transitionTime}ms ease-in-out` : "none";
        carouselImages.style.transform = `translateX(-${index * 100}%)`;
    }
}

/**
 * Moves to the next slide and handles infinite looping.
 */
function nextSlide() {
    index++;
    updateCarousel();
    
    setTimeout(() => {
        if (index >= totalImages - 1) {
            index = 1;
            updateCarousel(false);
        }
    }, transitionTime);
}

/**
 * Moves to the previous slide and handles infinite looping.
 */
function prevSlide() {
    index--;
    updateCarousel();
    
    setTimeout(() => {
        if (index <= 0) {
            index = totalImages - 2;
            updateCarousel(false);
        }
    }, transitionTime);
}

// Auto-slide every 4 seconds
let autoSlide = setInterval(nextSlide, 4000);

// Pause auto-slide on hover
const carousel = document.querySelector(".carousel");
if (carousel) {
    carousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
    carousel.addEventListener("mouseleave", () => {
        autoSlide = setInterval(nextSlide, 2000);
    });
}

// Manual navigation buttons
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetInterval();
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetInterval();
    });
}

/**
 * Resets the auto-slide interval when user manually navigates.
 */
function resetInterval() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 2000);
}

// Set initial position without animation
updateCarousel(false);

// ----------------- HAMBURGER MENU -----------------
if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburgerLinks.classList.toggle("active");
    });
}

// ----------------- NEWSLETTER SUBSCRIPTION -----------------
if (subscribeLink && dialog) {
    subscribeLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        dialog.showModal(); // Show the dialog
    });
}

if (closeDialogBtn && dialog) {
    closeDialogBtn.addEventListener("click", () => {
        dialog.close();
        if (subscribeForm) subscribeForm.reset(); // Clear input fields when closing manually
    });
}

if (subscribeForm && thankYouMessage) {
    subscribeForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission
        
        // Hide form, show thank-you message
        subscribeForm.style.display = "none";
        thankYouMessage.style.display = "block";
        
        // Close the dialog after 2 seconds
        setTimeout(() => {
            dialog.close();
            subscribeForm.reset(); // Clear input fields after submission
            // Reset form visibility for next time
            subscribeForm.style.display = "block";
            thankYouMessage.style.display = "none";
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const paragraphs = document.querySelectorAll(".hover-text");

    paragraphs.forEach((paragraph) => {
        let words = paragraph.innerHTML.split(" "); // Split text into words

        // Wrap each word in a span for tracking
        paragraph.innerHTML = words
            .map(word => `<span class="word">${word} </span>`)
            .join("");

        const wordSpans = paragraph.querySelectorAll(".word");

        wordSpans.forEach((span, index) => {
            span.addEventListener("mouseenter", () => {
                addHighlight(index, wordSpans);
            });

            span.addEventListener("mouseleave", () => {
                removeHighlight(wordSpans);
            });
        });
    });

    function addHighlight(index, wordSpans) {
        // Add highlight to the hovered word, previous word, and next word
        if (wordSpans[index]) wordSpans[index].classList.add("highlight");
        if (wordSpans[index - 1]) wordSpans[index - 1].classList.add("highlight");
        if (wordSpans[index + 1]) wordSpans[index + 1].classList.add("highlight");
    }

    function removeHighlight(wordSpans) {
        wordSpans.forEach(span => span.classList.remove("highlight"));
    }
});