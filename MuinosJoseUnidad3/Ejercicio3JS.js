document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('input[name="option"]').forEach((elem) => {
        elem.addEventListener("change", function (event) {
            let opcionSeleccionada = event.target.value;
            let additionalInput = '';
            let textoBoton = '';

            switch (opcionSeleccionada) {
                case 'potencia':
                    additionalInput = '<label for="base" class="form-label">Base:</label><input type="number" class="form-control mb-3" id="base"><label for="exponente" class="form-label">Exponente:</label><input type="number" class="form-control mb-3" id="exponente">';
                    textoBoton = 'Calcular Potencia';
                    break;
                case 'raiz':
                    additionalInput = '<label for="numero" class="form-label">Número:</label><input type="number" class="form-control mb-3" id="numero" min="0">';
                    textoBoton = 'Calcular Raíz';
                    break;
                case 'redondeo':
                    additionalInput = '<label for="numero" class="form-label">Número:</label><input type="number" class="form-control mb-3" id="numero" step="0.01">';
                    textoBoton = 'Redondear Número';
                    break;
                case 'trigonometria':
                    additionalInput = '<label for="angulo" class="form-label">Ángulo:</label><input type="number" class="form-control mb-3" id="angulo" min="0" max="360">';
                    textoBoton = 'Calcular Trigonometría';
                    break;
            }

            let formSecundario = document.getElementById('formSecundario');
            formSecundario.innerHTML = additionalInput + '<button type="button" onclick="calculate(\'' + opcionSeleccionada + '\')" class="btn btn-primary mb-3">' + textoBoton + '</button><p id="result"></p>';
        });
    });
});


function calculate(option) {
    let resultText = '';

    switch (option) {
        case 'potencia':
            let base = document.getElementById('base').value;
            let exponente = document.getElementById('exponente').value;
            resultText = 'Resultado: ' + Math.pow(base, exponente);
            break;
        case 'raiz':
            let numero = document.getElementById('numero').value;
            resultText = 'Resultado: ' + Math.sqrt(numero);
            break;
        case 'redondeo':
            let num = document.getElementById('numero').value;
            resultText = 'Redondeo al alta: ' + Math.ceil(num) + '<br>Redondeo a la baja: ' + Math.floor(num) + '<br>Redondeo al más cercano: ' + Math.round(num);
            break;
        case 'trigonometria':
            let angulo = document.getElementById('angulo').value;
            let radian = angulo * (Math.PI / 180);
            resultText = 'Seno: ' + Math.sin(radian).toFixed(4) + '<br>Coseno: ' + Math.cos(radian).toFixed(4) + '<br>Tangente: ' + Math.tan(radian).toFixed(4);
            break;
    }

    document.getElementById('result').innerHTML = resultText;
}
