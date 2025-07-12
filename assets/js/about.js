// Inicialización específica para Sobre Nosotros
$(document).ready(function() {
    // Inicializar contadores
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

    // Animación para elementos al hacer scroll
    $('.our-history, .our-values, .team-section, .certifications').each(function() {
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
});