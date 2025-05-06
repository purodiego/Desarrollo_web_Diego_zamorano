//comunas
document.addEventListener("DOMContentLoaded", function () {
    const comunasPorRegion = {
      RM: ["Santiago", "Maipú", "Las Condes", "Puente Alto"],
      Valparaíso: ["Valparaíso", "Viña del Mar", "Quilpué", "Concón"]
    };
  
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");
  
    regionSelect.addEventListener("change", function () {
      const regionSeleccionada = this.value;
      const comunas = comunasPorRegion[regionSeleccionada] || [];
  
    
      comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
  
      
      comunas.forEach(comuna => {
        const opcion = document.createElement("option");
        opcion.value = comuna;
        opcion.textContent = comuna;
        comunaSelect.appendChild(opcion);
      });
    });
  });
  
//Fecha
function configurarFechaFinAutomatica() {
    const inputInicio = document.getElementById("inicio");
    const inputFinVisible = document.getElementById("fin");
    const inputFinOculto = document.getElementById("finOculto");
  
    if (!inputInicio || !inputFinVisible || !inputFinOculto) return;
  
    inputInicio.addEventListener("change", function () {
      const inicioValue = this.value;
      if (!inicioValue) return;
  
      const inicioDate = new Date(inicioValue);
      inicioDate.setHours(inicioDate.getHours() + 3);
  
      const año = inicioDate.getFullYear();
      const mes = String(inicioDate.getMonth() + 1).padStart(2, "0");
      const dia = String(inicioDate.getDate()).padStart(2, "0");
      const horas = String(inicioDate.getHours()).padStart(2, "0");
      const minutos = String(inicioDate.getMinutes()).padStart(2, "0");
  
      const resultado = `${año}-${mes}-${dia}T${horas}:${minutos}`;
  
      inputFinVisible.value = resultado;
      inputFinOculto.value = resultado;
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    configurarFechaFinAutomatica();
    configurarSelectorDeContacto(); // ya lo tienes
  });
    
//tema
document.addEventListener("DOMContentLoaded", function () {
  const selectTema = document.getElementById("tema");
  const containerTemaOtro = document.getElementById("temaPersonalizadoContainer");
  const inputTemaOtro = document.getElementById("temaPersonalizado");

  selectTema.addEventListener("change", function () {
    if (this.value === "otro") {
      containerTemaOtro.style.display = "block";
      inputTemaOtro.setAttribute("required", "true");
    } else {
      containerTemaOtro.style.display = "none";
      inputTemaOtro.removeAttribute("required");
      inputTemaOtro.value = ""; 
    }
  });
});


//agregar foto
function agregarOtraFoto() {
  const contenedor = document.getElementById("contenedorFotos");
  const cantidadActual = contenedor.querySelectorAll("input[type='file']").length;

  if (cantidadActual >= 5) {
    alert("Solo puedes agregar hasta 5 fotos.");
    return;
  }

  const nuevoInput = document.createElement("input");
  nuevoInput.type = "file";
  nuevoInput.name = "foto";
  nuevoInput.accept = "image/*";
  nuevoInput.className = "input-foto";
  contenedor.appendChild(nuevoInput);
}

  
//contactar por
function configurarSelectorDeContacto() {
    const selector = document.getElementById("contacto");
    const inputContainer = document.getElementById("inputContacto");
    const labelContacto = document.getElementById("labelContacto");
    const input = document.getElementById("contactoValor");
  
    selector.addEventListener("change", function () {
      const valor = this.value;
  
      if (!valor) {
        inputContainer.style.display = "none";
        input.removeAttribute("required");
        input.value = "";
        return;
      }
  
      inputContainer.style.display = "block";
      input.setAttribute("required", "true");
  
      if (valor === "whatsapp") {
        labelContacto.textContent = "Número de WhatsApp:";
        input.type = "tel";
        input.placeholder = "+569 XXXX XXXX";
        input.pattern = "\\+569\\d{8}";
        input.minLength = 12;
        input.maxLength = 12;
      } else if (valor === "instagram") {
        labelContacto.textContent = "Perfil de Instagram:";
        input.type = "url";
        input.placeholder = "https://instagram.com/tuusuario";
        input.pattern = "https?://.*|@.+";
        input.removeAttribute("minlength");
        input.removeAttribute("maxlength");
      } else if (valor === "otra") {
        labelContacto.textContent = "ID o URL de contacto:";
        input.type = "text";
        input.placeholder = "Ej: https://red.com/usuario";
        input.pattern = ".{4,50}";
        input.minLength = 4;
        input.maxLength = 50;
      }
    });
  }
document.addEventListener("DOMContentLoaded", function () {
    configurarSelectorDeContacto();
  });

//validador telefono
let validarTel = (telefono) => {
  const regex = /^\+569\d{8}$/;
  return telefono === "" || regex.test(telefono); 
};

//validador email
let validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && email.length <= 100;
  };

//Fotos
function validarCantidadDeFotos() {
  const inputs = document.querySelectorAll(".input-foto");
  let total = 0;

  inputs.forEach(input => {
    if (input.files.length > 0) {
      total++;
    }
  });

  return total >= 1 && total <= 5;
}



//validar fecha inicio
function validarFechaInicio() {
  const inputInicio = document.getElementById("inicio");
  const inputFin = document.getElementById("finOculto"); 
  const valorInicio = inputInicio.value;
  const valorFin = inputFin.value;

  if (!valorInicio || !valorFin) return false; 

  const fechaInicio = new Date(valorInicio);
  const fechaFin = new Date(valorFin);

 
  return fechaInicio < fechaFin;
}


//validar nombre
function validarNombre (nombre) {
  return nombre.length <= 200 && nombre.length > 0 ;
}

//validar select
function validarSelect(selectId) {
  const valor = document.getElementById(selectId).value;
  return valor !== ""; 
}


function validarForm() {
  let emailInput = document.getElementById("email");
  let telInput = document.getElementById("tel");
  let nombreInput = document.getElementById("nombre");

  let msg = "";

  if (!validarEmail(emailInput.value)) msg += "Email incorrecto \n";
  if (!validarCantidadDeFotos()) msg += "Debes seleccionar entre 1 y 4 fotos.\n";
  if (!validarTel(telInput.value)) msg += "Teléfono incorrecto \n";
  if (!validarNombre(nombreInput.value)) msg += "Nombre incorrecto \n";
  if (!validarSelect("region")) msg += "Debe seleccionar región \n";
  if (!validarSelect("comuna")) msg += "Debe seleccionar comuna \n";
  if (!validarSelect("tema")) msg += "Debe seleccionar tema \n";
  if (!validarFechaInicio()) msg += "La fecha de inicio debe ser mayor a la fecha fin\n";

  if (msg !== "") {
    alert(msg);
    return false;
  }

  return true;
}


function confirmarEnvio() {
  const confirmar = confirm("¿Está seguro que desea agregar esta actividad?");
  if (confirmar) {
    if (validarForm()) {
      guardarActividadEnLocalStorage(() => {
        alert("Actividad agregada con éxito ✅");

        document.getElementById("formulario").reset();
        document.getElementById("formulario").style.display = "none";
        actualizarTablaInicio();
      });
    }
  }
}

function actualizarTablaInicio() {
  const actividades = JSON.parse(localStorage.getItem("actividades")) || [];
  const tbody = document.querySelector("#tablaInicio tbody");

  tbody.innerHTML = "";

  actividades.sort((a, b) => new Date(b.fechaGuardado) - new Date(a.fechaGuardado));

  const ultimas = actividades.slice(0, 5);

  ultimas.forEach(act => {
    const fila = document.createElement("tr");

    let fotoHtml = "Sin foto";
    if (act.fotosBase64 && act.fotosBase64.length > 0) {
      fotoHtml = `<img src="${act.fotosBase64[0]}" width="100" height="75" style="object-fit:cover; border-radius:4px;">`;
    }

    fila.innerHTML = `
      <td>${act.inicio}</td>
      <td>${act.fin}</td>
      <td>${act.comuna}</td>
      <td>${act.sector}</td>
      <td>${act.tema}</td>
      <td>${fotoHtml}</td>
    `;

    tbody.appendChild(fila);
  });
}



// Guardar formulario
function guardarActividadEnLocalStorage(callback) {
  const inputsFoto = document.querySelectorAll(".input-foto");

  let files = [];
  inputsFoto.forEach(input => {
    if (input.files.length > 0) {
      files.push(input.files[0]);
    }
  });

  convertirFotosABase64(files, function (fotosBase64) {
    const actividad = {
      inicio: document.getElementById("inicio").value,
      fin: document.getElementById("finOculto").value,
      region: document.getElementById("region").value,
      comuna: document.getElementById("comuna").value,
      sector: document.getElementById("sector").value,
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("tel").value,
      contacto: document.getElementById("contacto").value,
      contactoValor: document.getElementById("contactoValor").value,
      tema: document.getElementById("tema").value === "otro"
        ? document.getElementById("temaPersonalizado").value
        : document.getElementById("tema").value,
      descripcion: document.getElementById("descripcion").value,
      fotosBase64: fotosBase64,
      totalFotos: fotosBase64.length,
      fechaGuardado: new Date().toISOString()
    };

    let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    actividades.push(actividad);
    localStorage.setItem("actividades", JSON.stringify(actividades));

    if (typeof callback === "function") {
      callback(); 
    }
  });
}


function convertirFotosABase64(files, callback) {
  const fotosBase64 = [];
  let contador = 0;

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      fotosBase64.push(e.target.result); 
      contador++;
      if (contador === files.length) {
        callback(fotosBase64); 
      }
    };
    reader.onerror = function (error) {
      console.error("Error al convertir la foto a Base64:", error);
    };
    reader.readAsDataURL(file); // Leer el archivo como Data URL
  });
}

function mostrarMensajeFinal() {
  const div = document.createElement("div");
  div.innerHTML = `
    <p style="text-align: center; font-size: 18px; font-weight: bold;">
      Hemos recibido su información, muchas gracias y suerte en su actividad.
    </p>
    <div style="text-align: center;">
      <button onclick="window.location.href='Tarea1.html'" style="padding: 10px 20px;">Volver a la portada</button>
    </div>
  `;
  document.body.innerHTML = ""; 
  document.body.appendChild(div);
}
