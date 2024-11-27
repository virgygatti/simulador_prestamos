const form = document.getElementById('myForm');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar envío
    const resultado = document.getElementById('resultado');
    resultado.style.display = 'none';
    for(i=1; i<=12; i++){
        var idCuota = "cuota"+i;
        const spanCuota = document.getElementById(idCuota);
        spanCuota.style.display = 'none';
    }

    // Ocultar el mensaje de error por defecto
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
    
    // Validar campo de texto como número entre 10000 y 1000000. No se está usando ya que tiene la validación de HTML.
    const textInput = document.getElementById('monto');
    var inputValue = parseInt(textInput.value, 10); // Convertir a entero
    if (isNaN(inputValue) || inputValue < 10000 || inputValue > 1000000) {        
        if (errorMessage) {
            errorMessage.textContent = 'El número debe estar entre 10000 y 1000000.';
            errorMessage.style.display = 'block'; // Mostrar error
        }
        return;
    }
    
    // Validar que el select tenga un valor seleccionado. No se está usando ya que tiene la validación de HTML.
    const optionsSelect = document.getElementById('plazo');
    if (!optionsSelect.value) {
        if (errorMessage) {
            errorMessage.textContent = 'Por favor, selecciona un plazo válido.';
            errorMessage.style.display = 'block'; // Mostrar error
        }
        return;
    }
    var selectedValue = parseInt(optionsSelect.value, 10);
    
    //Simulador
    var valorCuota = 0
    if(selectedValue === 3){
        valorCuota = (inputValue/3)*1.1;
    } else if(selectedValue === 6){
        valorCuota = (inputValue/6)*1.15;
    }
    else{
        valorCuota = (inputValue/12)*1.2;
    }

    for(i=1; i<=selectedValue; i++){
        var idCuota = "cuota"+i;
        const spanCuota = document.getElementById(idCuota);
        spanCuota.innerText = "Cuota " + i + ": " + valorCuota.toFixed(2);
        spanCuota.style.display = 'block';
    }
    resultado.style.display = 'block';

});