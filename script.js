]const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxYear = document.getElementById("lightbox-year");
const closeButton = document.querySelector(".lightbox-close");

const photoButtons = document.querySelectorAll(".photo-button");

photoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.dataset.src;
    const caption = button.dataset.caption;
    const year = button.dataset.year;

    lightboxImage.src = image;
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;
    lightboxYear.textContent = `Year: ${year}`;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
