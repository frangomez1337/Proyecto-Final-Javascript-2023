// Definición de array vacío que luego será rellenado con objetos
const cargas = [];

// Se genera el evento para cargar datos ingresados en localstorage cuando se presiona el botón "Cargar"

let botonCarga = document.getElementById("botonCarga");
botonCarga.addEventListener("click", function () {
  almacenarCombustible();
  actualizarTabla();
});

// Función a ejecutar al presionarse el botón de carga, toma el valor de cada
// input y lo almacena en el array vació que luego será almacenado en localstorage

function almacenarCombustible() {
  let tipoComb = document.getElementById("tipoComb").value;
  let cantCargada = document.getElementById("cantidad").value;

  let datosDeCarga = { combustible: tipoComb, cantidad: cantCargada };
  cargas.push(datosDeCarga);

  // Se parsea el array de objetos para convertir en cadena de texto y realizar la subida al storage
  let objetoJSON = JSON.stringify(cargas);
  localStorage.setItem("Cargas", objetoJSON);

  document.getElementsByTagName("input")[0].value = "";
  document.getElementsByTagName("input")[1].value = "";
}

function actualizarTabla() {
  const almacenarCarga = document.getElementById("almacenarCarga");
  almacenarCarga.innerHTML = "";

  // Obtiene los datos del local storage
  const cargas = JSON.parse(localStorage.getItem("Cargas"));

  // Crea una nueva fila por cada carga almacenada en el local storage
  cargas.forEach((carga, index) => {
    const nuevaFila = document.createElement("tr");

    const idCarga = document.createElement("th");
    idCarga.setAttribute("scope", "row");
    idCarga.textContent = index + 1;

    const tipoComb = document.createElement("td");
    tipoComb.textContent = carga.combustible;

    const cantCargada = document.createElement("td");
    cantCargada.textContent = carga.cantidad;

    nuevaFila.appendChild(idCarga);
    nuevaFila.appendChild(tipoComb);
    nuevaFila.appendChild(cantCargada);

    almacenarCarga.appendChild(nuevaFila);
  });
}

// Funcionalidad del botón para borrado de datos del Storage y los datos almacenados en la tabla,
// junto al resultado final si es que se ejecuta el botón de calcular recaudación

const borrarDatos = document.getElementById("botonBorrado");
borrarDatos.addEventListener("click", borrarInformacion);

function borrarInformacion() {
  localStorage.clear();
  const infoTabla = document.getElementById("almacenarCarga");
  infoTabla.innerHTML = "";
  const borrarResultado = document.getElementById("resultado");
  borrarResultado.innerHTML = "";
}

// Función a ejecutarse cuando se presiona el botón para calcular la recaudación

let botonCalculo = document.getElementById("calculador");
botonCalculo.addEventListener("click", calcularRecaudacion);

function calcularRecaudacion() {
  // Declaración de variables, arrays que serán utilizados para los cálculos de recaudación.
  const metrosGnc = [];
  const litrosNafta = [];
  var totalMetrosGnc = 0;
  var totalLitrosNafta = 0;
  var recaudacionTotalGnc = 0;
  var recaudacionTotalNafta = 0;
  var gananciasTotales = 0;

  // Se obtiene y transforma a un array de objetos el objeto JSON que estaba almacenado en el localstorage
  const cargasAlmacenadas = JSON.parse(localStorage.getItem("Cargas"));

  if (cargasAlmacenadas && cargasAlmacenadas.length > 0) {
    for (let i = 0; i < cargasAlmacenadas.length; i++) {
      if (cargasAlmacenadas[i].combustible == "gnc") {
        metrosGnc.push(cargasAlmacenadas[i].cantidad);
        totalMetrosGnc += parseInt(cargasAlmacenadas[i].cantidad);
      } else if (cargasAlmacenadas[i].combustible == "nafta") {
        litrosNafta.push(cargasAlmacenadas[i].cantidad);
        totalLitrosNafta += parseInt(cargasAlmacenadas[i].cantidad);
      }
    }
  } else {
    const alerta = document.createElement("div");
    alerta.innerHTML =
      "<b>No hay datos almacenados. Para calcular la recaudación, debe cargarse como mínimo 1 venta realizada completando los campos y clickeando luego en el botón de carga para almacenarlo.</b>";
    document.body.append(alerta);
  }

  recaudacionTotalGnc = totalMetrosGnc * 94;
  recaudacionTotalNafta = totalLitrosNafta * 190;
  gananciasTotales = recaudacionTotalGnc + recaudacionTotalNafta;

  const mostrarRecaudacionTotal = document.getElementById("resultado");
  const mensajeGanancias =
    "El total recaudado de todas las ventas ingresadas es de $" +
    gananciasTotales;
  const pElement = document.createElement("p");
  pElement.textContent = `${mensajeGanancias}`;
  mostrarRecaudacionTotal.appendChild(pElement);
}
