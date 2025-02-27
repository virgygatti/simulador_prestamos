const form = document.getElementById('myForm');
const errorMessage = document.getElementById('errorMessage');
const edadMessage = document.getElementById('edadMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar envío

    // Ocultar el resultado y las cuotas
    const resultado = document.getElementById('resultado');
    resultado.style.display = 'none';

    const spanCantidad = document.getElementById("cantidad");
    spanCantidad.style.display = 'none';
    const spanValor = document.getElementById("valor");
    spanValor.style.display = 'none';

    // Ocultar el mensaje de error por defecto
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }

    // Ocultar el mensaje de edad por defecto
    if (edadMessage) {
        edadMessage.style.display = 'none';
    }
    
    var edad = prompt("Ingrese su edad", "21");
    var edadValue = parseInt(edad, 10);
    const montoElement = document.getElementById('monto');
    var montoValue = parseInt(montoElement.value, 10); // Convertir a entero
    const cuotasElement = document.getElementById('cuotas');
    var cuotasValue = parseInt(cuotasElement.value, 10);

    if(validarCampos(edadValue, montoValue, cuotasElement) == false) {
        return;
    };

    if(edadValue < 18 || edadValue > 100){
        if (edadMessage) {
            edadMessage.style.display = 'block'; // Mostrar mensaje
        }
        return;
    }
    
    //Simulador
    var valorCuota = 1.5* montoValue/cuotasValue;

    spanCantidad.innerText = "Cantidad de cuotas: " + cuotasValue;
    spanValor.innerText = "Monto de cada cuota: $" + valorCuota.toFixed(2);
    spanCantidad.style.display = 'block';
    spanValor.style.display = 'block';
    resultado.style.display = 'block';

});

function validarCampos (edad, monto, cuotasElem) {
    if (edad != null) {
        if (isNaN(edad)) {
            if (errorMessage) {
                errorMessage.textContent = 'La edad debe ser un número';
                errorMessage.style.display = 'block'; // Mostrar error
            }
            return false;
        }
    }
    else{
        if (errorMessage) {
            errorMessage.textContent = 'Debe ingresar su edad';
            errorMessage.style.display = 'block'; // Mostrar error
        }
        return false;
    }
};

// Cargamos los préstamos desde prestamos.json
fetch('prestamos.json')
    .then(response => response.json())
    .then(data => mostrarPrestamos(data))
    .catch(error => console.error('Error al cargar préstamos:', error));

// Creamos una funcion para generar las cards de los prestamos dentro del index.html
function mostrarPrestamos(prestamos) {
    const contenedor = document.getElementById("prestamos-list");
    contenedor.innerHTML = '';
    prestamos.forEach(prestamo => {
        const card = document.createElement("div");
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${prestamo.imagen}" class="card-img-top" alt="${prestamo.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${prestamo.nombre}</h5>
                    <button class="btn btn-success btn-seleccionar" data-id="${prestamo.id}" data-cuotas="${prestamo.cuotas}" data-minimo="${prestamo.minimo}" data-maximo="${prestamo.maximo}">
                        Seleccionar
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
    agregarEventosBotones();
}

// Función para manejar los botones "Seleccionar"
function agregarEventosBotones() {
    const botones = document.querySelectorAll('.btn-seleccionar');
    botones.forEach(boton => {
        boton.addEventListener('click', (event) => {
            // Ocultar el resultado y las cuotas
            const resultado = document.getElementById('resultado');
            resultado.style.display = 'none';
            document.getElementById('monto').value = "";

            const id = boton.getAttribute('data-id');
            const cuotas = boton.getAttribute('data-cuotas');
            const minimo = boton.getAttribute('data-minimo');
            const maximo = boton.getAttribute('data-maximo');

            mostrarPrestamoSeleccionado({ id, cuotas, minimo, maximo });
        });
    });
}

function mostrarPrestamoSeleccionado(prestamo) {
    cuotasList = prestamo.cuotas.split(',');

    const cuotas = document.getElementById('cuotas');
    cuotas.innerHTML = `
    <option value="" disabled selected>Elige una opción...</option>
    <option value="${cuotasList[0]}">${cuotasList[0]}</option>
    <option value="${cuotasList[1]}">${cuotasList[1]}</option>
    <option value="${cuotasList[2]}">${cuotasList[2]}</option>
    `;

    const monto = document.getElementById('monto');
    monto.placeholder = `Mínimo: ${prestamo.minimo} - Máximo: ${prestamo.maximo}`;
    monto.min = `${prestamo.minimo}`;
    monto.max = `${prestamo.maximo}`;

    const datos = document.getElementById('datos-cuotas');
    datos.style.display = 'block';
}
