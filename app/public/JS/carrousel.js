window.addEventListener("load", function() {
    // Obtenemos todas las etiquetas de entrada del carrusel
    let slideOpen = document.querySelectorAll(".slide-open");

    // Función para activar el siguiente slide automáticamente cada 5 segundos
    function autoPlay() {
      // Obtenemos el índice del slide actual
      let currentSlideIndex = Array.from(slideOpen).findIndex(function(slide) {
        return slide.checked;
      });
  
      // Calculamos el índice del siguiente slide
      let nextSlideIndex = (currentSlideIndex + 1) % slideOpen.length;
  
      // Activamos el siguiente slide
      slideOpen[nextSlideIndex].checked = true;
    }
  
    // Iniciamos el autoplay
    setInterval(autoPlay, 3500);
  });