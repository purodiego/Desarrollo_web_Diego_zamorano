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
  
      // Limpiar opciones anteriores
      comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
  
      // Agregar nuevas opciones
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
      inputTemaOtro.value = ""; // Limpiar si cambia de opción
    }
  });
});
  
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
  const regex = /^\+569d{8}$/;
  return telefono === "" || regex.test(telefono); // opcional: si vacío está OK
};

//validador email
let validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && email.length <= 100;
  };

//Foto
function validarCantidadDeFotos() {
  const input = document.getElementById("foto");
  const archivos = input.files;

  if (archivos.length < 1 || archivos.length > 5) {
    return false;
  }
  return true;
}


//validar fecha inicio
function validarFechaInicio() {
  const input = document.getElementById("inicio");
  const valor = input.value;

  if (!valor) return false; // No seleccionó nada

  const ahora = new Date();
  const fechaSeleccionada = new Date(valor);

  // Opcional: quitar los segundos/milisegundos para evitar falsos negativos
  ahora.setSeconds(0, 0);
  fechaSeleccionada.setSeconds(0, 0);

  return fechaSeleccionada >= ahora;
}


//validar nombre
function validarNombre (nombre) {
  return nombre.length <= 200 && nombre.length > 0 ;
}

//validar select
function validarSelect(selectId) {
  const valor = document.getElementById(selectId).value;
  return valor !== ""; // devuelve true si hay algo seleccionado
}


const validarForm = () => {

    //obtenemos dom

    let emailInput = document.getElementById("email");
    let telInput = document.getElementById("tel");
    let nombreInput = document.getElementById("nombre");
    let regionSelect = document.getElementById("region");
    let comunaSelect = document.getElementById("comuna");
    let temaSelect = document.getElementById("tema")

    let msg = "";

    if(!validarEmail(emailInput.value)) {
        msg += "Email incorrecto \n"
    }

    if (!validarCantidadDeFotos()) {
      msg += "Debes seleccionar entre 1 y 4 fotos.\n";
    }

    if(!validarTel(telInput.value)) {
      msg += "Teléfono incorrecto \n"
    }

    if(!validarNombre(nombreInput.value)) {
      msg += "Nombre incorrecto \n"
    }

    if(!validarSelect("region")){
      msg += "Debe seleccionar región \n"
    }
    
    if(!validarSelect("comuna")) {
      msg += "Debe seleccionar comuna \n"
    }

    if(!validarSelect("tema")) {
      msg += "Debe seleccionar tema \n"
    }

    if (!validarFechaInicio()) {
      msg += "La fecha de inicio debe ser mayor o igual a la fecha actual.\n";
    }

    if(msg !== ""){
      alert(msg);
      return false; // si hay errores, no continúa
    }
    
    
guardarActividadEnLocalStorage();

alert("¡Actividad guardada correctamente!");

document.getElementById("formulario").reset();

document.getElementById("formulario").style.display = "none";
}




// Guardar formulario
function guardarActividadEnLocalStorage() {
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
    totalFotos: document.getElementById("foto").files.length,
    fechaGuardado: new Date().toISOString()
  };

  let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
  actividades.push(actividad);
  localStorage.setItem("actividades", JSON.stringify(actividades));
}
