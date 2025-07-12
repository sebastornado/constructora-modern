    // Inicialización específica para Proyectos
    $(document).ready(function() {
      // Inicializar filtros de galería
      initGalleryFilter();
      
      // Animación para elementos de tipos de proyectos
      $('.project-type').each(function(index) {
        $(this).css('animation-delay', `${index * 0.1}s`);
      });
      
      // Animación para elementos de la galería
      $('.gallery-item').each(function(index) {
        $(this).css('animation-delay', `${index * 0.15}s`);
      });
    });

    function initGalleryFilter() {
      $('.gallery-filter-btn').click(function() {
        // Actualizar botón activo
        $('.gallery-filter-btn').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        
        // Filtrar proyectos
        $('.gallery-item').each(function() {
          if (filter === 'all' || $(this).data('category') === filter) {
            $(this).fadeIn(400);
          } else {
            $(this).fadeOut(400);
          }
        });
      });
    }