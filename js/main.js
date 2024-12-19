const form = document.getElementById('myForm');
const errorMessage = document.getElementById('errorMessage');
const edadMessage = document.getElementById('edadMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar envío

    // Ocultar el resultado y las cuotas
    const resultado = document.getElementById('resultado');
    resultado.style.display = 'none';
    for(i=1; i<=12; i++){
        var idCuota = "cuota"+i;
        const spanCuota = document.getElementById(idCuota);
        spanCuota.style.display = 'none';
    }

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
    const plazoElement = document.getElementById('plazo');
    var plazoValue = parseInt(plazoElement.value, 10);

    if(validarCampos(edadValue, montoValue, plazoElement) == false) {
        return;
    };

    if(edadValue < 18 || edadValue > 100){
        if (edadMessage) {
            edadMessage.style.display = 'block'; // Mostrar mensaje
        }
        return;
    }
    
    //Simulador
    var cuotas = calcularValorCuota(plazoValue, montoValue);

    console.log("Cuotas a pagar");

    for(i=1; i<=plazoValue; i++){
        var idCuota = "cuota"+i;
        const spanCuota = document.getElementById(idCuota);
        var texto = "Cuota " + i + ": " + cuotas[i-1].toFixed(2);
        spanCuota.innerText = texto;
        console.log(texto);
        spanCuota.style.display = 'block';
    }
    resultado.style.display = 'block';

});

function calcularValorCuota (numeroDeCuotas, monto) {
    var cuotasArray = [];
    var cuotaPrevia = monto/numeroDeCuotas;
    for(i=0; i<numeroDeCuotas; i++){
        cuotaPrevia = cuotaPrevia * 1.15;
        cuotasArray.push(cuotaPrevia);
    }
    return cuotasArray;

};

function validarCampos (edad, monto, plazoElem) {
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

    // Validar campo de texto como número entre 10000 y 1000000. No se está usando ya que tiene la validación de HTML.
    if (isNaN(monto) || monto < 10000 || monto > 1000000) {
        if (errorMessage) {
            errorMessage.textContent = 'El número debe estar entre 10000 y 1000000.';
            errorMessage.style.display = 'block'; // Mostrar error
        }
        return false;
    }

    // Validar que el select tenga un valor seleccionado. No se está usando ya que tiene la validación de HTML.
    if (!plazoElem.value) {
        if (errorMessage) {
            errorMessage.textContent = 'Por favor, selecciona un plazo válido.';
            errorMessage.style.display = 'block'; // Mostrar error
        }
        return false;
    }
    return true;
};
