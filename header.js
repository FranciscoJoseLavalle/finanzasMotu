const navBar = document.getElementById("navBar");
const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener('click', () => {
    navBar.classList.toggle("nav-menu_visible");
})