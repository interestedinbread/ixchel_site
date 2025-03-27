import { setupSlider } from "./sliderSetup.js";
import { setupImgPanning } from "./imagePan.js";
import { setupNavlinks } from "./nav.js";
import { setupModal } from "./modal.js";

const contentContainer = document.querySelector(".content-container");

window.addEventListener("DOMContentLoaded", () => {
  const loadPage = async (page) => {
    try {
      const response = await fetch(page);
      if (!response.ok) throw new Error("Page not found");

      const html = await response.text();
      contentContainer.innerHTML = html;

      history.pushState({ page }, "", `#${page}`);

      if (page === "home.html") {
        setupSlider();
        setupImgPanning();
        initMap();
        setupModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadPage("home.html");

  setupNavlinks();

  let map;

  async function initMap() {
    const position = { lat: 48.89015167706287, lng: -123.34707064079846 }

    const { Map } = await google.maps.importLibrary("maps")
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")

    map = new Map(document.querySelector('.map-container'), {
        zoom: 13,
        center: position,
        mapId: "1bd9688633cd9dea"
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Ixchel"
    })
  }
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector("nav");

  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});

window.addEventListener("popstate", () => {
  const page = location.hash.replace("#", "") || "home.html";
  loadPage(page);
});
