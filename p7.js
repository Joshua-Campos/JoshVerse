// Función principal que calcula calorías y macros
function calcularCalorias() {
    // Obtener valores del formulario
    const edad = parseInt(document.getElementById("edad").value);
    const sexo = document.getElementById("sexo").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const actividad = parseFloat(document.getElementById("actividad").value);
    const objetivo = document.getElementById("objetivo").value;

    // Validación simple
    if (isNaN(edad) || isNaN(peso) || isNaN(altura)) {
        alert("Por favor completa todos los campos correctamente.");
        return;
    }

    // Calcular TMB (Fórmula de Mifflin-St Jeor)
    let tmb = sexo === "masculino"
        ? 10 * peso + 6.25 * altura - 5 * edad + 5
        : 10 * peso + 6.25 * altura - 5 * edad - 161;

    // Calorías según nivel de actividad
    let calorias = tmb * actividad;

    // Ajuste según objetivo
    switch (objetivo) {
        case "deficit":
            calorias -= 500;
            break;
        case "superavit":
            calorias += 300;
            break;
        // en "mantenimiento" no se modifica
    }

    // Cálculo de macros
    const proteinas = peso * 2; // 2g por kg
    const grasas = peso * 1; // 1g por kg
    const caloriasProteinas = proteinas * 4;
    const caloriasGrasas = grasas * 9;
    const caloriasCarbohidratos = calorias - (caloriasProteinas + caloriasGrasas);
    const carbohidratos = caloriasCarbohidratos / 4;

    // Mostrar resultados
    document.getElementById("resultado").innerHTML = `
        <h3>Tu requerimiento diario estimado:</h3>
        <ul>
            <li><strong>Calorías:</strong> ${Math.round(calorias)} kcal</li>
            <li><strong>Proteínas:</strong> ${Math.round(proteinas)} g</li>
            <li><strong>Grasas:</strong> ${Math.round(grasas)} g</li>
            <li><strong>Carbohidratos:</strong> ${Math.round(carbohidratos)} g</li>
        </ul>
    `;

    // Mostrar recetas
    mostrarRecetas();
}

// Función que resetea el formulario y limpia los resultados
function resetearFormulario() {
    document.getElementById("calcForm").reset();
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("recetas").innerHTML = "";
}

// Función que muestra recetas saludables y económicas
function mostrarRecetas() {
    const recetas = [
        {
            titulo: "Tostadas con aguacate y huevo",
            ingredientes: ["Pan integral", "Aguacate", "Huevo cocido", "Sal", "Limón"],
            instrucciones: "Tritura el aguacate, mézclalo con sal y limón, úntalo en pan tostado y coloca huevo cocido encima."
        },
        {
            titulo: "Ensalada de atún y garbanzos",
            ingredientes: ["Atún", "Garbanzos cocidos", "Tomate", "Cebolla", "Limón", "Aceite de oliva"],
            instrucciones: "Mezcla todos los ingredientes en un bowl. Añade limón y aceite al gusto."
        },
        {
            titulo: "Avena con plátano y crema de cacahuate",
            ingredientes: ["Avena", "Plátano", "Leche o agua", "Canela", "Crema de cacahuate"],
            instrucciones: "Cocina la avena, añade rodajas de plátano, un poco de canela y una cucharadita de crema de cacahuate."
        }
    ];

    // Crear contenido HTML dinámico
    let html = "<h3>Recetas saludables y económicas:</h3>";
    recetas.forEach(receta => {
        html += `
            <div class="receta">
                <h4>${receta.titulo}</h4>
                <p><strong>Ingredientes:</strong> ${receta.ingredientes.join(", ")}</p>
                <p><strong>Preparación:</strong> ${receta.instrucciones}</p>
            </div>
            <hr>
        `;
    });

    document.getElementById("recetas").innerHTML = html;
}
