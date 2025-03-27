document.addEventListener("DOMContentLoaded", function () {
    const actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    const cuerpo = document.querySelector("#tablaActividades tbody");
  
    actividades.forEach((act, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${act.inicio}</td>
        <td>${act.fin}</td>
        <td>${act.comuna}</td>
        <td>${act.sector}</td>
        <td>${act.tema}</td>
        <td>${act.nombre}</td>
        <td>${act.totalFotos || 0}</td>
      `;
      fila.addEventListener("click", () => {
        localStorage.setItem("actividadSeleccionada", index);
        window.location.href = "detalle.html";
      });
      cuerpo.appendChild(fila);
    });
  });
    