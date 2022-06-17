// Variables
const btnAgregar = document.querySelector('.main__form-button');
const montoInput = document.querySelector('.inputMonto');
const historialCont = document.querySelector('.main__historial-cont');
const formOption = document.querySelectorAll('.formOption');

// Clase de montos
class Montos {
    constructor(monto, tipo) {
        this.monto = monto;
        this.tipo = tipo;
    }
}

// Array para guardar los montos
let arrMontos = [];

// Función para tomar los datos
btnAgregar.addEventListener('click', (e) => {
    e.preventDefault();
    let monto = montoInput.value;

    let montoNuevo = new Montos(monto, "ingreso")
    arrMontos.push(montoNuevo);
    console.log(arrMontos);
    mostrarHistorial();
})

// Función para mostrar el historial
function mostrarHistorial() {
    
    historialCont.textContent = '';

    arrMontos.forEach(elemento => {
        const div = document.createElement('div');
        const texto = document.createElement('p');

        texto.textContent = `$${elemento.monto} - ${elemento.tipo}`;
        
        div.append(texto);
        historialCont.append(div);
    })
}