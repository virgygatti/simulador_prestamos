const form = document.getElementById('myForm');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar envío
    localStorage.clear();

    // Ocultar el resultado y las cuotas
    const resultado = document.getElementById('resultado');
    resultado.style.display = 'none';

    const spanCantidad = document.getElementById("cantidad");
    spanCantidad.style.display = 'none';
    const spanValor = document.getElementById("valor");
    spanValor.style.display = 'none';
    const spanTasa = document.getElementById("tasa");
    spanTasa.style.display = 'none';
    const spanMontoFinal = document.getElementById("montoFinal");
    spanMontoFinal.style.display = 'none';
    
    var montoValue = parseInt(document.getElementById('monto').value, 10); // Convertir a entero
    var cuotasValue = parseInt(document.getElementById('cuotas').value, 10);
    
    //Simulador
    var valorCuota = 1.5* montoValue/cuotasValue;

    localStorage.setItem("cantidad", cuotasValue);
    localStorage.setItem("valor", valorCuota.toFixed(2));
    localStorage.setItem("montoFinal", cuotasValue*valorCuota);
    localStorage.setItem("tasa", (((cuotasValue*valorCuota)/montoValue) - 1)*100);

    spanCantidad.innerText = "Cantidad de cuotas: " + localStorage.getItem("cantidad");
    spanValor.innerText = "Monto de cada cuota: $" + localStorage.getItem("valor");
    spanMontoFinal.innerText = "Monto total a devolver: " + localStorage.getItem("montoFinal");
    spanTasa.innerText = "Tasa de interés: " + localStorage.getItem("tasa") + "%";
    spanCantidad.style.display = 'block';
    spanValor.style.display = 'block';
    spanMontoFinal.style.display = 'block';
    spanTasa.style.display = 'block';
    resultado.style.display = 'block';

});

document.getElementById("confirmarBtn").addEventListener("click", function() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Confirmado", "Tu préstamo ha sido solicitado", "success");
            document.getElementById("resultado").style.display = "none";
            document.getElementById("datos-cuotas").style.display = "none";
            document.getElementById("cantidad").innerText = "";
            document.getElementById("valor").innerText = "";
            document.getElementById("tasa").innerText = "";
            document.getElementById("montoFinal").innerText = "";
            localStorage.clear();            
            document.getElementById("myForm").reset();

        }
    });
});

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