
document.getElementById("btn-AddAct").addEventListener("click", function() {
document.getElementById("formulario").style.display = "block";
});








document.addEventListener("DOMContentLoaded", function () {
  const actividades = JSON.parse(localStorage.getItem("actividades")) || [];
  const tbody = document.querySelector("#tablaInicio tbody");

  actividades.sort((a, b) => new Date(b.fechaGuardado) - new Date(a.fechaGuardado));


  const ultimas = actividades.slice(0, 5);

  ultimas.forEach(act => {
    const fila = document.createElement("tr");

    const fotoMiniatura = act.fotosBase64 && act.fotosBase64.length > 0
      ? `<img src="${act.fotosBase64[0]}" width="60" height="45" style="object-fit: cover;">`
      : "Sin foto";

    fila.innerHTML = `
      <td>${act.inicio}</td>
      <td>${act.fin}</td>
      <td>${act.comuna}</td>
      <td>${act.sector}</td>
      <td>${act.tema}</td>
      <td>${fotoMiniatura}</td>
    `;

    tbody.appendChild(fila);
  });
});
