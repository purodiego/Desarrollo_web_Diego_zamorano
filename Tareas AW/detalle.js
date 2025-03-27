document.addEventListener("DOMContentLoaded", function () {
    const actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    const index = localStorage.getItem("actividadSeleccionada");
    const actividad = actividades[index];
    const contenedor = document.getElementById("detalleActividad");
  
    if (!actividad) {
      contenedor.innerHTML = "<p>No se encontró la actividad.</p>";
      return;
    }
  
    let html = `
      <h2>Detalle de la Actividad</h2>
      <p><strong>Inicio:</strong> ${actividad.inicio}</p>
      <p><strong>Fin:</strong> ${actividad.fin}</p>
      <p><strong>Región:</strong> ${actividad.region}</p>
      <p><strong>Comuna:</strong> ${actividad.comuna}</p>
      <p><strong>Sector:</strong> ${actividad.sector}</p>
      <p><strong>Organizador:</strong> ${actividad.nombre}</p>
      <p><strong>Email:</strong> ${actividad.email}</p>
      <p><strong>Teléfono:</strong> ${actividad.telefono}</p>
      <p><strong>Tema:</strong> ${actividad.tema}</p>
      <p><strong>Descripción:</strong> ${actividad.descripcion}</p>
      <p><strong>Fotos:</strong></p>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">`;
  
    if (actividad.fotosBase64 && actividad.fotosBase64.length > 0) {
      actividad.fotosBase64.forEach((foto, i) => {
        html += `<img src="${foto}" width="320" height="240" style="cursor:pointer"
                  onclick="mostrarImagen('${foto}')">`;
      });
    } else {
      html += "<p>No hay fotos.</p>";
    }
  
    html += `</div>`;
    contenedor.innerHTML = html;
  });
  
  // visor de imagen
  function mostrarImagen(src) {
    document.getElementById("visorImg").src = src;
    document.getElementById("visor").style.display = "flex";
  }
  
  function cerrarImagen() {
    document.getElementById("visor").style.display = "none";
  }
  