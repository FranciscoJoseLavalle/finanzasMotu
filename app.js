// Variables
const btnAgregar = document.querySelector('.main__form-button');
const montoInput = document.querySelector('.inputMonto');
const detalleInput = document.querySelector('.inputDetalle');
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
    constructor(monto, tipo, detalle) {
        this.monto = monto;
        this.tipo = tipo;
        this.detalle = detalle;
        this.id = Date.now();
    }
}

// Array para guardar los montos
let arrMontos = JSON.parse(localStorage.getItem('montos')) || [];
let ingresos = [];
let egresos = [];

// Función para tomar los datos
btnAgregar.addEventListener('click', (e) => {
    e.preventDefault();
    let monto = montoInput.value;
    let detalle = detalleInput.value;

    if (monto !== '' && detalle !== '') {
        if (select.value == 'ingreso') {
            let tipo = "Ingreso"
            crearObjeto(monto, tipo, detalle);
        } else if (select.value == 'egreso') {
            let tipo = "Egreso"
            crearObjeto(monto, tipo, detalle);
        }
    }
    form.reset();
})

//Evento de filtrado para el select
selectFiltro.addEventListener('change', filtrar)

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

// Funcion al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    mostrarHistorial(arrMontos);
    calcularMonto();
})

// Crear el objeto
function crearObjeto(monto, tipo, detalle) {
    let montoNuevo = new Montos(monto, tipo, detalle)
    arrMontos.push(montoNuevo);
    mostrarHistorial(arrMontos);
    calcularMonto();
    localStorage.setItem('montos', JSON.stringify(arrMontos))
}

// Función para mostrar el historial
function mostrarHistorial(array) {

    historialCont.textContent = '';

    if (array.length !== 0) {
        array.forEach(elemento => {
            const div = document.createElement('div');
            const texto = document.createElement('p');
            const btnEliminar = document.createElement('p');
    
            texto.textContent = `$${parseFloat(elemento.monto).toFixed(2)} - ${elemento.tipo} - ${elemento.detalle}`;
            btnEliminar.textContent = 'X'
    
            div.append(texto);
            div.append(btnEliminar);
            historialCont.append(div);
    
            btnEliminar.onclick = () => {
                borrarElemento(elemento.id);
            }
        })
    } else {
        historialCont.textContent = 'No agregaste nada aún...';
    }
}

// Función para borrar elementos
function borrarElemento(id) {
    arrMontos = arrMontos.filter(element => element.id !== id)
    localStorage.setItem('montos', JSON.stringify(arrMontos))
    mostrarHistorial(arrMontos);
    calcularMonto();
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
        let montoTotal = calcularEgreso();
        mostrarMonto(montoTotal);
    } else if (selectFiltro.value === "nada") {
        mostrarHistorial(arrMontos);
        calcularMonto();
    }
}