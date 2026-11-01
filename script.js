
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? 'Close ✕' : 'Menu ☰';
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'Menu ☰';
    }));
    document.getElementById('year').textContent = new Date().getFullYear();

    document.querySelectorAll('.placeholder-link').forEach(link => {
      link.addEventListener('click', event => {
        if (link.getAttribute('href') === '#') {
          event.preventDefault();
          const notice = link.closest('.contact-panel') ? document.getElementById('contactNotice') : document.getElementById('linkNotice');
          notice.textContent = 'Add ' + (link.dataset.label || 'the real URL') + ' to this link in portfolio.html before publishing.';
          notice.classList.add('show');
          notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });

// Click project images to view them in full
document.querySelectorAll(".project-visual img").forEach((image) => {
    image.addEventListener("click", () => {
        // Don't open the viewer for a missing image
        if (!image.complete || image.naturalWidth === 0) return;

        const lightbox = document.createElement("div");
        lightbox.className = "image-lightbox";

        const fullImage = document.createElement("img");
        fullImage.src = image.src;
        fullImage.alt = image.alt;

        const closeButton = document.createElement("button");
        closeButton.className = "lightbox-close";
        closeButton.innerHTML = "&times;";
        closeButton.setAttribute("aria-label", "Close image viewer");

        lightbox.appendChild(fullImage);
        lightbox.appendChild(closeButton);
        document.body.appendChild(lightbox);

        // Prevent background scrolling while the viewer is open
        document.body.style.overflow = "hidden";

        function closeLightbox() {
            lightbox.remove();
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeydown);
        }

        function handleKeydown(event) {
            if (event.key === "Escape") {
                closeLightbox();
            }
        }

        closeButton.addEventListener("click", closeLightbox);

        // Clicking outside the image closes the viewer
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", handleKeydown);
    });
});
