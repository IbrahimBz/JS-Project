// Start Settings Box
console.log("afasd");
document
  .querySelector(".settings-box i")
  .addEventListener("click", () =>
    document.querySelector(".settings-box").classList.toggle("open")
  );

let colorOpts = document.querySelectorAll(".settings-box .color-list li");
let fontOpts = document.querySelectorAll(".settings-box .fonts-list li");
let backgroundOpts = document.querySelectorAll(
  ".opt-random .opt-random-back span"
);

// Start Local Storage
let mainColor = localStorage.getItem("color-option");
if (mainColor) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  colorOpts.forEach((li) =>
    mainColor === li.dataset.color
      ? li.classList.add("active")
      : li.classList.remove("active")
  );
}

let mainFont = localStorage.getItem("font-option");
if (mainFont) {
  document.body.style.fontFamily = mainFont;
  fontOpts.forEach((li) =>
    mainFont === li.dataset.font
      ? li.classList.add("active")
      : li.classList.remove("active")
  );
}

let backgroundInterval;
let mainRandomBack = localStorage.getItem("random-back-opt");
if (mainRandomBack) {
  mainRandomBack === "true"
    ? randomizeBackground()
    : clearInterval(backgroundInterval);
  backgroundOpts.forEach((span) =>
    span.dataset.back === mainRandomBack
      ? span.classList.add("active")
      : span.classList.remove("active")
  );
} else {
  randomizeBackground();
}

// End Local Storage
colorOpts.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.currentTarget.dataset.color
    );
    localStorage.setItem("color-option", e.currentTarget.dataset.color);
    addActiveClass(colorOpts, li);
  });
});

fontOpts.forEach((li) => {
  li.addEventListener("click", (e) => {
    addActiveClass(fontOpts, e.currentTarget);
    document.body.style.fontFamily = e.currentTarget.dataset.font;
    localStorage.setItem("font-option", e.currentTarget.dataset.font);
  });
});

// Randomly Background

let backOpt = true;
backgroundOpts.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.classList.contains("active") === false) {
      addActiveClass(backgroundOpts, e.currentTarget);
      e.target.dataset.back === "true"
        ? randomizeBackground()
        : clearInterval(backgroundInterval);
      localStorage.setItem("random-back-opt", e.target.dataset.back);
    }
  });
});
let resetBnt = document.querySelector(".settings-box .reset");
resetBnt.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

// End Settings Box
// Start Bullets
window.addEventListener("load", () => {
  let bullets = document.createElement("ul");
  bullets.className = "bullets";
  Array.from(document.body.children).forEach((child) => {
    if (
      child.tagName !== "SCRIPT" &&
      child.classList.contains("settings-box") === false
    ) {
      let bullet = document.createElement("div");
      bullet.className = "bullet";
      bullet.setAttribute("data-location", `.${child.className}`);
      bullets.append(bullet);
    }
  });
  document.body.append(bullets);

  let allbullets = document.querySelectorAll(".bullets .bullet");
  allbullets.forEach((bul) => {
    bul.addEventListener("click", (e) => {
      document
        .querySelector(e.currentTarget.dataset.location)
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  let bulletsContainer = document.querySelector(".bullets");
  let bulletsOpt = document.querySelectorAll(".opt-bullets span");
  let mainOptBuls = localStorage.getItem("bullet-opt");

  if (mainOptBuls) {
    bulletsContainer.style.display = mainOptBuls;
    mainOptBuls === "block"
      ? addActiveClass(bulletsOpt, bulletsOpt[0])
      : addActiveClass(bulletsOpt, bulletsOpt[1]);
  }

  bulletsOpt.forEach((bul) => {
    bul.addEventListener("click", (e) => {
      addActiveClass(bulletsOpt, e.target);
      if (e.currentTarget.classList.contains("on")) {
        bulletsContainer.style.display = "block";
        localStorage.setItem("bullet-opt", "block");
      } else {
        bulletsContainer.style.display = "none";
        localStorage.setItem("bullet-opt", "none");
      }
    });
  });
});

// End Bullets

// Start Landing

// For Change To Randomly Background
const landingPage = document.querySelector(".landing");
const imgsBackground = ["img-01", "img-02", "img-03", "img-04", "img-05"];
function randomizeBackground() {
  backgroundInterval = setInterval(
    () =>
      (landingPage.style.backgroundImage = `url("./imgs/${
        imgsBackground[Math.floor(Math.random() * imgsBackground.length)]
      }.jpeg")`),
    10000
  );
}

// For Nav Bar
document.querySelector(".landing nav i").addEventListener("click", (e) => {
  document.querySelector(".landing nav .links").classList.toggle("close");
  ["fa-duotone", "fa-circle-xmark"].forEach((cls) =>
    e.currentTarget.classList.toggle(cls)
  );
});

const lies = document.querySelectorAll(".landing nav .links li");
lies.forEach((el) =>
  el.addEventListener("click", () => addActiveClass(lies, el))
);

// End Landing

// Main Functions For Script

function addActiveClass(array, el) {
  array.forEach((el) => el.classList.remove("active"));
  el.classList.add("active");
}
