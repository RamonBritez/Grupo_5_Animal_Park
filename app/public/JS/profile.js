// Abre el modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  // Cierra el modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  // Acción a realizar cuando se confirma la acción
  function confirmAction() {
    SubmitEvent
    closeModal();
  }
  b