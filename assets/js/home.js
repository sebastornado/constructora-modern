$(document).ready(function() {
    // Inicializar slider
    initSlider();
    
    // Inicializar contadores
    initCounters();
    
    // Animación para elementos al hacer scroll
    $('.featured-services, .projects-showcase, .testimonials').each(function() {
        const element = $(this);
        const elementTop = element.offset().top;
        const windowHeight = $(window).height();
        
        $(window).on('scroll', function() {
            const scrollTop = $(this).scrollTop();
            
            if (scrollTop > elementTop - windowHeight + 200) {
                element.addClass('animate__animated animate__fadeInUp');
            }
        });
    });
    
    // Función para inicializar contadores
    function initCounters() {
        $('.counter').each(function() {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).data('count')
            }, {
                duration: 4000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
    
    // Función para inicializar slider
    function initSlider() {
        const slider = $('.slider');
        const container = slider.find('.slider-container');
        const items = slider.find('.slider-item');
        const prevBtn = slider.find('.slider-prev');
        const nextBtn = slider.find('.slider-next');
        const dotsContainer = slider.find('.slider-dots');
        
        let currentIndex = 0;
        let dots = [];
        
        // Crear puntos de navegación
        items.each(function(index) {
            const dot = $('<div class="slider-dot"></div>');
            if (index === 0) dot.addClass('active');
            dot.on('click', function() {
                goToSlide(index);
            });
            dotsContainer.append(dot);
            dots.push(dot);
        });
        
        // Funciones de navegación
        function goToSlide(index) {
            currentIndex = index;
            container.css('transform', `translateX(-${currentIndex * 100}%)`);
            
            // Actualizar puntos
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.addClass('active');
                } else {
                    dot.removeClass('active');
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
        prevBtn.on('click', prevSlide);
        nextBtn.on('click', nextSlide);
        
        // Auto slide
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pausar al pasar el mouse
        slider.on('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        slider.on('mouseleave', function() {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
});