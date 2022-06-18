// const navBar = document.getElementById("navBar");
// const toggleButton = document.getElementById("toggleButton");

// toggleButton.addEventListener('click', () => {
//     navBar.classList.toggle("nav-menu_visible");
// })


// ES MIO, ESTOY HACIENDO PRUEBAS, LO QUE HICISTE ES UNA MIERDA
const burga = document.querySelector('.burga');
const burgas = document.querySelectorAll('.burgas');

burga.onclick = () => {
    burgas[0].classList.toggle('burga0')
    burgas[1].classList.toggle('burga1')
    burgas[2].classList.toggle('burga2')
    navBar.classList.toggle("nav-menu_visible");
}