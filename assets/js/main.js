// Main JavaScript File

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
