// Variables
const btnAgregar = document.querySelector('.main__form-button');
const montoInput = document.querySelector('.inputMonto');
const historialCont = document.querySelector('.main__historial-cont');
const formOption = document.querySelectorAll('.formOption');
const select = document.querySelector('.main__form-select');
const form = document.querySelector('.main__form');
const montoTotalCont = document.querySelector('.montoTotal')
const selectFiltro = document.querySelector('.main__historial-select')
const btnModal = document.querySelector('.openModal');
const btnModalClose = document.querySelector('.closeModal');
const main = document.querySelector('.main');
const body = document.querySelector('body');

// Clase de montos
class Montos {
    constructor(monto, tipo) {
        this.monto = monto;
        this.tipo = tipo;
    }
}

// Array para guardar los montos
let arrMontos = [];
let ingresos = [];
let egresos = [];

// Función para tomar los datos
btnAgregar.addEventListener('click', (e) => {
    e.preventDefault();
    let monto = montoInput.value;

    if (monto !== '') {
        if (select.value == 'ingreso') {
            let tipo = "Ingreso"
            crearObjeto(monto, tipo);
        } else if (select.value == 'egreso') {
            let tipo = "Egreso"
            crearObjeto(monto, tipo);
        }
    }
    form.reset();
})

//Evento de filtrado para el select
selectFiltro.addEventListener('change', filtrar)

// Crear el objeto
function crearObjeto(monto, tipo) {
    let montoNuevo = new Montos(monto, tipo)
    arrMontos.push(montoNuevo);
    mostrarHistorial(arrMontos);
    calcularMonto();
}

// Abrir el modal
btnModal.addEventListener('click', () => {
    main.classList.toggle('display');
    btnModal.classList.toggle('btnAnimate');
    body.classList.toggle('scrollLock');
})
// Cerrar el modal
btnModalClose.addEventListener('click', () => {
    main.classList.toggle('display');
    btnModal.classList.toggle('btnAnimate');
    body.classList.toggle('scrollLock');
})

// Función para mostrar el historial
function mostrarHistorial(array) {

    historialCont.textContent = '';

    array.forEach(elemento => {
        const div = document.createElement('div');
        const texto = document.createElement('p');

        texto.textContent = `$${parseFloat(elemento.monto).toFixed(2)} - ${elemento.tipo}`;

        div.append(texto);
        historialCont.append(div);
    })
}

// Calcular el monto total
function calcularMonto() {
    ingresos = arrMontos.filter(elemento => elemento.tipo === "Ingreso");
    egresos = arrMontos.filter(elemento => elemento.tipo === "Egreso");

    let ingresosTotales = calcularIngreso();
    let egresosTotales = calcularEgreso();

    let montoTotal = ingresosTotales - egresosTotales;
    mostrarMonto(montoTotal);
}

// Calcular ingreso
function calcularIngreso() {
    let ingresosTotales = 0;
    for (let i = 0; i < ingresos.length; i++) {
        ingresosTotales += parseFloat(ingresos[i].monto);
    }
    return ingresosTotales;
}
// Calcular egreso
function calcularEgreso() {
    let egresosTotales = 0;
    for (let i = 0; i < egresos.length; i++) {
        egresosTotales += parseFloat(egresos[i].monto);
    }
    return egresosTotales;
}
// Mostrar el monto total
function mostrarMonto(montoTotal) {
    montoTotalCont.textContent = `Monto final: $${montoTotal.toFixed(2)}`;
}

// Filtrar ingresos y egresos
function filtrar() {
    if (selectFiltro.value === "ingresos") {
        mostrarHistorial(ingresos);
        let montoTotal = calcularIngreso();
        mostrarMonto(montoTotal);
    } else if (selectFiltro.value === "egresos") {
        mostrarHistorial(egresos);
    } else if (selectFiltro.value === "nada") {
        mostrarHistorial(arrMontos);
        let montoTotal = calcularEgreso();
        mostrarMonto(montoTotal);
    }
}
