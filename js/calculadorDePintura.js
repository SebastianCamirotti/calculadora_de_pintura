alert("¡Bienvenido al calculador de pintura!");

// Funcion que calcula el la cantidad de pintura necesaria por pared
const calculoPorPared = (altura, largo, consumo) => {
    let areaTotal = altura * largo;
    let cantidadDeLitros = Math.ceil(areaTotal / consumo);
    return cantidadDeLitros;
}

//Función para elegir bien el indice del array
const buscarTipoDePintura = (seleccion) => {
    return tiposDePintura[seleccion - 1];
}

//Función que procesa todos los datos brindados por el usuario.
const calcularPinturaParaHabitacion = () => {

    let seleccion = parseInt(prompt("Selecciona el número del tipo de pintura:\n" +
        tiposDePintura.map((pintura, index) => `${index + 1}. ${pintura.tipo}`).join('\n')));

    if (seleccion >= 1 && seleccion <= tiposDePintura.length) {
        let tipoDePintura = buscarTipoDePintura(seleccion);
        let consumoDePintura = tipoDePintura.consumo;

        let numParedes = parseInt(prompt("Ingresa la cantidad de paredes en la habitación"));
        if (isNaN(numParedes) || numParedes <= 0) {
            alert("Por favor, ingresa un número válido de paredes.");
            return 0;
        }

        let mismaAlturaYLongitud = confirm("¿Son todas las paredes iguales en altura y longitud?");
        let alturaPared, largoPared;

        if (mismaAlturaYLongitud) {
            alturaPared = parseFloat(prompt("Ingresa la altura de las paredes en metros"));
            largoPared = parseFloat(prompt("Ingresa el largo de las paredes en metros"));

            if (isNaN(alturaPared) || isNaN(largoPared)) {
                alert("Por favor, ingresa valores válidos para el alto y el largo.");
                return 0;
            }

            return calculoPorPared(alturaPared, largoPared, consumoDePintura) * numParedes;
        } else {
            let totalLitros = 0;

            for (let i = 0; i < numParedes; i++) {
                alturaPared = parseFloat(prompt(`Ingresa el alto de la pared ${i + 1} en metros`));
                largoPared = parseFloat(prompt(`Ingresa el largo de la pared ${i + 1} en metros`));

                if (isNaN(alturaPared) || isNaN(largoPared)) {
                    alert(`Por favor, ingresa valores válidos para el alto y el largo de la pared ${i + 1}.`);
                    return 0;
                }

                totalLitros += calculoPorPared(alturaPared, largoPared, consumoDePintura);
            }

            return totalLitros;
        }
    } else {
        alert("Opción no válida. Por favor, inténtalo de nuevo.");
        return 0;
    }
}

const tiposDePintura = [
    { tipo: "Pintura látex", consumo: 7 },
    { tipo: "Sintético", consumo: 8 },
    { tipo: "Membrana líquida", consumo: 10 }
];

// Pregunta al usuario si va a pintar una habitación o una sola pared
let pintarHabitacion = confirm("¿Quieres pintar una habitación completa?");

let totalLitrosPintura = 0;

if (pintarHabitacion) {
    totalLitrosPintura = calcularPinturaParaHabitacion();
} else {
    let pintarMasParedes = confirm("¿Vas a pintar más de una pared?");

    while (pintarMasParedes) {
        totalLitrosPintura += calcularPinturaParaHabitacion();
        pintarMasParedes = confirm("¿Quieres pintar otra pared?");
    }
}

if (totalLitrosPintura > 0) {
    alert("Vas a necesitar aproximadamente " + totalLitrosPintura + " litros de pintura.");
} else {
    alert("No se realizaron cálculos. ¡Hasta luego!");
}
