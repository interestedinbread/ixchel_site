export const setupNavlinks = () => {
  const navlinks = document.querySelectorAll(".nav-link");
  const navlinksContainer = document.querySelector(".nav-links");
  const menuBtn = document.querySelector(".menu-icon");
  const navHeight = document
    .querySelector("nav")
    .getBoundingClientRect().height;
  const ixchelLogoContainer = document.querySelector(".ixchel-logo-container");
  const toggleBtn = document.querySelector(".menu-icon");
  const navElement = document.querySelector("nav");

  navlinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      toggleNav();
      const id = e.target.id.slice(1);

      const targetElement = document.getElementById(id);
      let position = targetElement.offsetTop - navHeight;
      window.scrollTo({
        left: 0,
        top: position,
      });
    });
  });

  const toggleNav = () => {
    navlinksContainer.classList.toggle("active");
    menuBtn.classList.toggle("active");
  };

  menuBtn.addEventListener("click", toggleNav);

  ixchelLogoContainer.addEventListener("click", () => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !navElement.contains(e.target) &&
      !toggleBtn.contains(e.target) &&
      !navlinksContainer.contains(e.target) &&
      !ixchelLogoContainer.contains(e.target) &&
      navlinksContainer.classList.contains("active")
    ) {
      toggleNav();
    }
  });
};
