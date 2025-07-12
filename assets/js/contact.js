// assets/js/contact.js

$(document).ready(function() {
  // Inicialización específica para Contacto
  initContactForm();
  
  // Animación para elementos de información de contacto
  $('.contact-info-card, .contact-form-card, .branch-card').each(function(index) {
    $(this).css('animation-delay', `${index * 0.2}s`);
  });
});

function initContactForm() {
  const $contactForm = $('#contactForm');
  
  // Validación en tiempo real
  $contactForm.find('input, textarea, select').on('input', function() {
    const $field = $(this);
    
    if ($field.prop('required') && !$field.val().trim()) {
      $field.addClass('is-invalid');
    } else {
      $field.removeClass('is-invalid');
      
      // Validación especial para email
      if ($field.attr('type') === 'email' && $field.val()) {
        if (!validateEmail($field.val())) {
          $field.addClass('is-invalid');
          $field.next('.invalid-feedback').text('Por favor ingresa un email válido');
        }
      }
    }
  });
  
  // Envío del formulario
  $contactForm.on('submit', function(e) {
    e.preventDefault();
    
    // Validar todos los campos
    let isValid = true;
    const $form = $(this);
    
    $form.find('[required]').each(function() {
      const $field = $(this);
      
      if (!$field.val().trim()) {
        isValid = false;
        $field.addClass('is-invalid');
      }
      
      // Validación especial para email
      if ($field.attr('type') === 'email' && $field.val()) {
        if (!validateEmail($field.val())) {
          isValid = false;
          $field.addClass('is-invalid');
          $field.next('.invalid-feedback').text('Por favor ingresa un email válido');
        }
      }
    });
    
    if (isValid) {
      // Mostrar estado de carga
      const $submitButton = $form.find('button[type="submit"]');
      const originalText = $submitButton.html();
      $submitButton.prop('disabled', true).html(`
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...
      `);
      
      // Simular envío (en producción sería una llamada AJAX)
      setTimeout(() => {
        // Mostrar mensaje de éxito
        $form.find('.form-message')
          .removeClass('error')
          .addClass('success')
          .html('<i class="fas fa-check-circle me-2"></i> ¡Gracias por tu mensaje! Te responderemos a la brevedad.')
          .show();
        
        // Restaurar botón
        $submitButton.prop('disabled', false).html(originalText);
        
        // Limpiar formulario
        $form[0].reset();
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          $form.find('.form-message').hide();
        }, 5000);
      }, 1500);
    } else {
      // Mostrar mensaje de error general
      $form.find('.form-message')
        .removeClass('success')
        .addClass('error')
        .html('<i class="fas fa-exclamation-circle me-2"></i> Por favor completa todos los campos requeridos correctamente.')
        .show();
    }
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}