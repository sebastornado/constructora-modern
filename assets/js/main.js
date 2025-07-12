// Funciones globales utilizadas en todas las páginas

$(document).ready(function() {
  // ===== NAVEGACIÓN ACTIVA =====
  function setActiveNav() {
    const currentPage = location.pathname.split("/").pop();
    $('.nav-link').each(function() {
      const linkPage = $(this).attr('href').split("/").pop();
      if (linkPage === currentPage) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }
  
  // ===== SCROLL SUAVE =====
  function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      const target = $($(this).attr('href'));
      if (target.length) {
        const headerHeight = $('.navbar').outerHeight();
        $('html, body').animate({
          scrollTop: target.offset().top - headerHeight
        }, 800);
      }
    });
  }
  
  // ===== NAVBAR AL SCROLL =====
  function handleNavbarScroll() {
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 100) {
        $('.navbar').addClass('scrolled');
      } else {
        $('.navbar').removeClass('scrolled');
      }
    });
  }
  
  // ===== INICIALIZAR CAROUSEL =====
  function initCarousel() {
    if ($('.carousel').length) {
      $('.carousel').carousel({
        interval: 5000,
        pause: 'hover'
      });
    }
  }
  
  // ===== FUNCIONES DE INICIALIZACIÓN =====
  setActiveNav();
  initSmoothScroll();
  handleNavbarScroll();
  initCarousel();
});
// ===== INITIALIZATION FUNCTIONS =====

// Inicializar carrusel
function initSlider() {
  const sliders = document.querySelectorAll('.slider');
  
  sliders.forEach(slider => {
    const container = slider.querySelector('.slider-container');
    const items = slider.querySelectorAll('.slider-item');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dotsContainer = slider.querySelector('.slider-dots');
    
    let currentIndex = 0;
    let dots = [];
    
    // Crear puntos de navegación
    items.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
    
    // Funciones de navegación
    function goToSlide(index) {
      currentIndex = index;
      container.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Actualizar puntos
      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      goToSlide(currentIndex);
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      goToSlide(currentIndex);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pausar al pasar el mouse
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  });
}

// Inicializar acordeón
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.parentNode;
      const accordionContent = this.nextElementSibling;
      
      // Alternar estado actual
      this.classList.toggle('active');
      accordionContent.classList.toggle('active');
      
      // Cerrar otros items
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== this) {
          otherHeader.classList.remove('active');
          otherHeader.nextElementSibling.classList.remove('active');
        }
      });
    });
  });
}

// Inicializar galería de filtros
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Actualizar botones activos
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filtrar elementos
      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}
// ===== FORM FUNCTIONS =====

// Validar formulario
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
    
    // Validación especial para email
    if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        input.classList.add('error');
      }
    }
  });
  
  return isValid;
}

// Enviar formulario
function handleFormSubmit(form) {
  const formMessage = form.querySelector('.form-message');
  
  // Simular envío (en producción sería una llamada AJAX)
  setTimeout(() => {
    form.reset();
    formMessage.classList.remove('error');
    formMessage.classList.add('success');
    formMessage.textContent = '¡Gracias por tu mensaje! Te responderemos a la brevedad.';
    formMessage.style.display = 'block';
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }, 1000);
}

// Inicializar formularios
function initForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(this)) {
        handleFormSubmit(this);
      } else {
        const formMessage = this.querySelector('.form-message');
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        formMessage.textContent = 'Por favor completa todos los campos requeridos correctamente.';
        formMessage.style.display = 'block';
      }
    });
  });
}
// ===== COUNTER FUNCTIONS =====

// Inicializar contadores
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    
    // Iniciar cuando el elemento es visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.disconnect();
      }
    });
    
    observer.observe(counter);
  });
}
// ===== MAIN INITIALIZATION =====
$(document).ready(function() {
  // Funciones globales
  setActiveNav();
  initSmoothScroll();
  handleNavbarScroll();
  
  // Inicializar componentes
  if ($('.slider').length) initSlider();
  if ($('.accordion').length) initAccordion();
  if ($('.gallery-filter').length) initGalleryFilter();
  if ($('form').length) initForms();
  if ($('.counter').length) initCounters();
  
  // Inicializar tooltips
  $('[data-bs-toggle="tooltip"]').tooltip();
  
  // Inicializar popovers
  $('[data-bs-toggle="popover"]').popover();
});