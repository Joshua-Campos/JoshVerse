// Función principal que calcula calorías, macros e IMC
function calcularCalorias() {
    // Obtener valores del formulario
    const edad = parseInt(document.getElementById("edad").value);
    const sexo = document.getElementById("sexo").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const actividad = parseFloat(document.getElementById("actividad").value);
    const objetivo = document.getElementById("objetivo").value;

    // Validación simple y rango lógico
    if (
        isNaN(edad) || edad < 10 || edad > 120 ||
        isNaN(peso) || peso < 20 || peso > 300 ||
        isNaN(altura) || altura < 50 || altura > 250
    ) {
        alert("Por favor ingresa valores realistas y completos.");
        return;
    }

    // Calcular IMC
    const alturaM = altura / 100;
    const imc = peso / (alturaM * alturaM);
    let categoriaIMC = "";
    if (imc < 18.5) categoriaIMC = "Bajo peso";
    else if (imc < 25) categoriaIMC = "Peso normal";
    else if (imc < 30) categoriaIMC = "Sobrepeso";
    else categoriaIMC = "Obesidad";

    // Calcular TMB (Fórmula de Mifflin-St Jeor)
    let tmb = sexo === "masculino"
        ? 10 * peso + 6.25 * altura - 5 * edad + 5
        : 10 * peso + 6.25 * altura - 5 * edad - 161;

    // Calorías según nivel de actividad
    let calorias = tmb * actividad;

    // Ajuste según objetivo
    switch (objetivo) {
        case "deficit":
            calorias -= 500; // déficit estándar para perder grasa
            break;
        case "superavit":
            calorias += 300; // superávit moderado para ganar músculo
            break;
        // mantenimiento no cambia
    }

    // Ajustar macros con proporciones recomendadas según objetivo
    // Base: proteínas 2g/kg, grasas 1g/kg, resto carbohidratos
    let proteinas = peso * 2;
    let grasas = peso * 1;
    // Ajustamos según objetivo:
    if (objetivo === "deficit") {
        // Más proteína para mantener músculo
        proteinas = peso * 2.2;
        grasas = peso * 0.8;
    } else if (objetivo === "superavit") {
        // Proteínas suficientes, grasas normales
        proteinas = peso * 2;
        grasas = peso * 1.2;
    }

    const caloriasProteinas = proteinas * 4;
    const caloriasGrasas = grasas * 9;
    const caloriasCarbohidratos = calorias - (caloriasProteinas + caloriasGrasas);
    // Validar que carbohidratos no sea negativo
    const carbohidratos = caloriasCarbohidratos > 0 ? caloriasCarbohidratos / 4 : 0;

    // Mostrar resultados con explicación clara
    document.getElementById("resultado").innerHTML = `
        <h3>Tu requerimiento diario estimado:</h3>
        <ul>
            <li><strong>Calorías diarias:</strong> ${Math.round(calorias)} kcal</li>
            <li><strong>Proteínas:</strong> ${Math.round(proteinas)} g (importante para reparación muscular)</li>
            <li><strong>Grasas:</strong> ${Math.round(grasas)} g (esenciales para hormonas y energía)</li>
            <li><strong>Carbohidratos:</strong> ${Math.round(carbohidratos)} g (principal fuente de energía)</li>
        </ul>
        <h3>Índice de Masa Corporal (IMC):</h3>
        <p>Tu IMC es <strong>${imc.toFixed(1)}</strong>, lo que indica: <strong>${categoriaIMC}</strong>.</p>
        <p>El IMC es una medida que relaciona tu peso con tu altura para evaluar si tu peso es saludable.</p>
    `;

    // Mostrar recetas según objetivo
    mostrarRecetas(objetivo);
}

// Función para resetear formulario y limpiar resultados
function resetearFormulario() {
    document.getElementById("calcForm").reset();
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("recetas").innerHTML = "";
}

// Recetas con detalles, cantidades y valores nutricionales por porción
const recetasData = {
    deficit: [
        {
            titulo: "Ensalada de pollo y aguacate",
            ingredientes: [
                { nombre: "Pechuga de pollo (cocida)", cantidad: "150 g", calorias: 165, proteinas: 31, grasas: 3.6, carbohidratos: 0 },
                { nombre: "Aguacate", cantidad: "50 g", calorias: 80, proteinas: 1, grasas: 7.4, carbohidratos: 4 },
                { nombre: "Lechuga", cantidad: "100 g", calorias: 15, proteinas: 1.4, grasas: 0.2, carbohidratos: 2.9 },
                { nombre: "Tomate", cantidad: "50 g", calorias: 9, proteinas: 0.5, grasas: 0.2, carbohidratos: 2 }
            ],
            instrucciones: "Mezcla todos los ingredientes frescos y aliña con limón y sal al gusto.",
        },
        {
            titulo: "Batido proteico de frutas",
            ingredientes: [
                { nombre: "Proteína en polvo", cantidad: "30 g", calorias: 120, proteinas: 24, grasas: 1, carbohidratos: 3 },
                { nombre: "Leche descremada", cantidad: "250 ml", calorias: 90, proteinas: 9, grasas: 0.2, carbohidratos: 12 },
                { nombre: "Plátano", cantidad: "100 g", calorias: 89, proteinas: 1.1, grasas: 0.3, carbohidratos: 23 }
            ],
            instrucciones: "Licua todos los ingredientes hasta obtener una mezcla homogénea.",
        }
    ],
    mantenimiento: [
        {
            titulo: "Tostadas integrales con huevo y aguacate",
            ingredientes: [
                { nombre: "Pan integral", cantidad: "2 rebanadas (60 g)", calorias: 150, proteinas: 6, grasas: 2, carbohidratos: 28 },
                { nombre: "Huevo", cantidad: "2 unidades (100 g)", calorias: 140, proteinas: 12, grasas: 10, carbohidratos: 1 },
                { nombre: "Aguacate", cantidad: "50 g", calorias: 80, proteinas: 1, grasas: 7.4, carbohidratos: 4 }
            ],
            instrucciones: "Tuesta el pan, prepara el huevo al gusto y coloca el aguacate encima.",
        },
        {
            titulo: "Arroz integral con verduras y pollo",
            ingredientes: [
                { nombre: "Arroz integral cocido", cantidad: "150 g", calorias: 165, proteinas: 3.5, grasas: 1.5, carbohidratos: 35 },
                { nombre: "Pechuga de pollo", cantidad: "120 g", calorias: 132, proteinas: 28, grasas: 2.7, carbohidratos: 0 },
                { nombre: "Verduras mixtas (zanahoria, brócoli)", cantidad: "100 g", calorias: 50, proteinas: 3, grasas: 0.5, carbohidratos: 10 }
            ],
            instrucciones: "Saltea las verduras, añade el pollo y mezcla con el arroz integral.",
        }
    ],
    superavit: [
    {
        titulo: "Pasta integral con pollo y salsa de tomate",
        ingredientes: [
            { nombre: "Pasta integral cocida", cantidad: "200 g", calorias: 248, proteinas: 9, grasas: 1.2, carbohidratos: 51 },
            { nombre: "Pechuga de pollo", cantidad: "150 g", calorias: 165, proteinas: 31, grasas: 3.6, carbohidratos: 0 },
            { nombre: "Salsa de tomate", cantidad: "100 g", calorias: 30, proteinas: 1, grasas: 0.2, carbohidratos: 7 }
        ],
        instrucciones: "Cocina la pasta y mezcla con la pechuga de pollo y la salsa de tomate.",
    }
]
}