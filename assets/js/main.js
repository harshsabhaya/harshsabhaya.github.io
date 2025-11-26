/**
* Template Name: iPortfolio - v1.2.1
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 10;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 200) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

      // Portfolio Modal Functionality
    $(document).ready(function() {
      var portfolioItems = $('.portfolio-item');
      var currentIndex = 0;
      var modal = $('.portfolio-modal');
      var modalImg = modal.find('.portfolio-modal-img img');
      var modalTitle = modal.find('.portfolio-modal-details h3');
      var modalDesc = modal.find('.portfolio-modal-details p');
      var modalLink = modal.find('.portfolio-modal-link');
      
      // Open modal when clicking on portfolio item (but not the link button)
      $('.portfolio-wrap').on('click', function(e) {
        // Don't open modal if clicking the external link button
        if ($(e.target).hasClass('portfolio-link-btn') || $(e.target).closest('.portfolio-link-btn').length) {
          return;
        }
        
        var item = $(this).closest('.portfolio-item');
        currentIndex = portfolioItems.index(item);
        openModal(item);
      });
      
      // Close modal
      $('.portfolio-modal-close, .portfolio-modal-overlay').on('click', function() {
        closeModal();
      });
      
      // Prevent close when clicking modal content
      $('.portfolio-modal-content').on('click', function(e) {
        e.stopPropagation();
      });
      
      // Navigation
      $('.portfolio-modal-prev').on('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        openModal(portfolioItems.eq(currentIndex));
      });
      
      $('.portfolio-modal-next').on('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        openModal(portfolioItems.eq(currentIndex));
      });
      
      // Keyboard navigation
      $(document).on('keydown', function(e) {
        if (!modal.hasClass('active')) return;
        
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowLeft') {
          $('.portfolio-modal-prev').click();
        } else if (e.key === 'ArrowRight') {
          $('.portfolio-modal-next').click();
        }
      });
      
      function openModal(item) {
        var imgSrc = item.data('img');
        var title = item.data('title');
        var desc = item.data('desc');
        var link = item.data('link');
        
        modalImg.attr('src', imgSrc);
        modalTitle.text(title);
        modalDesc.text(desc);
        
        if (link) {
          modalLink.attr('href', link).show();
        } else {
          modalLink.hide();
        }
        
        modal.addClass('active');
        $('body').addClass('modal-open').css('overflow', 'hidden');
      }
      
      function closeModal() {
        modal.removeClass('active');
        $('body').removeClass('modal-open').css('overflow', '');
      }
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Initi AOS
  AOS.init({
    duration: 1000,
    easing: "ease-in-out-back"
  });

})(jQuery);