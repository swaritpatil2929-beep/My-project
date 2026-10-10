document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation menu
  const menuBtn = document.querySelector("#menu-btn");
  const navbar = document.querySelector(".navbar");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar?.classList.remove("active");
    });
  });

  // Destination search
  const searchForm = document.querySelector("#search-form");

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const destination = document
        .querySelector("#destination")
        ?.value.trim();

      if (!destination) {
        alert("Please enter a destination.");
        return;
      }

      const packages = document.querySelectorAll(".tour-card");
      let found = false;

      packages.forEach((card) => {
        const text = card.textContent.toLowerCase();
        const match = text.includes(destination.toLowerCase());

        card.style.display = match ? "" : "none";
        if (match) found = true;
      });

      if (!found) {
        alert("No tours found. Please try another destination.");
      }

      document.querySelector("#packages")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  }

  // Booking form validation
  const bookingForm = document.querySelector("#booking-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = bookingForm.querySelector("#name")?.value.trim();
      const email = bookingForm.querySelector("#email")?.value.trim();
      const phone = bookingForm.querySelector("#phone")?.value.trim();
      const destination = bookingForm
        .querySelector("#booking-destination")?.value.trim();
      const date = bookingForm.querySelector("#travel-date")?.value;

      if (!name || !email || !phone || !destination || !date) {
        alert("Please fill in all booking details.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      const travelDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (Number.isNaN(travelDate.getTime()) || travelDate < today) {
        alert("Please select a valid future travel date.");
        return;
      }

      alert(
        `Thank you, ${name}!\n\n` +
        `Your booking request for ${destination} has been received.\n` +
        "Our travel team will contact you soon."
      );

      bookingForm.reset();
    });
  }

  // Back-to-top button
  const topBtn = document.querySelector("#back-to-top");

  if (topBtn) {
    window.addEventListener("scroll", () => {
      topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Set minimum travel date to today
  const dateInput = document.querySelector("#travel-date");

  if (dateInput) {
    const today = new Date();
    const localDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

    dateInput.min = localDate;
  }
});
