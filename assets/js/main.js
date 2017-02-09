// Main JavaScript File

// Toggle Navigation Menu

var toggleButton = document.getElementById("navigation-menu-toggle").classList;
var menu = document.getElementById("navigation-menu-wrapper").classList;

function toggleMenu() {
  menu.toggle("open");
  if (toggleButton.contains("closed")) {
    toggleButton.remove("closed");
    toggleButton.add("opened");
  } else {
    toggleButton.remove("opened");
    toggleButton.add("closed");
  }
}

// Open Case Study Modals

var closeButton = document.querySelector("#close-modal");
var openCaseStudy1 = document.querySelector("#case-study-1");
var modalCaseStudy1 = document.querySelector("#work-case-study-1");
var openCaseStudy2 = document.querySelector("#case-study-2");
var modalCaseStudy2 = document.querySelector("#work-case-study-2");
var openCaseStudy3 = document.querySelector("#case-study-3");
var modalCaseStudy3 = document.querySelector("#work-case-study-3");
var body = document.querySelector("body");

openCaseStudy1.addEventListener("click", function(){
  modalCaseStudy1.classList.add("modal-open");
  body.style.overflow = "hidden";
});

openCaseStudy2.addEventListener("click", function(){
  modalCaseStudy2.classList.add("modal-open");
  body.style.overflow = "hidden";
});

openCaseStudy3.addEventListener("click", function(){
  modalCaseStudy3.classList.add("modal-open");
  body.style.overflow = "hidden";
});

function closeModal(){
  modalCaseStudy1.classList.remove("modal-open");
  modalCaseStudy2.classList.remove("modal-open");
  modalCaseStudy3.classList.remove("modal-open");
  body.style.overflow = "auto";
}
