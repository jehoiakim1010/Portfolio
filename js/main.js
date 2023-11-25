jQuery(document).ready(function ($) {

    'use strict';

    $(window).load(function () { // makes sure the whole site is loaded
        $(".seq-preloader").fadeOut(); // will first fade out the loading animation
        $(".sequence").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
    })


    $(function () {

        function showSlide(n) {
            // n is relative position from current slide

            // unbind event listener to prevent retriggering
            $body.unbind("mousewheel");

            // increment slide number by n and keep within boundaries
            currSlide = Math.min(Math.max(0, currSlide + n), $slide.length - 1);

            var displacment = window.innerWidth * currSlide;
            // translate slides div across to appropriate slide
            $slides.css('transform', 'translateX(-' + displacment + 'px)');
            // delay before rebinding event to prevent retriggering
            setTimeout(bind, 700);

            // change active class on link
            $('nav a.active').removeClass('active');
            $($('a')[currSlide]).addClass('active');

        }

        function bind() {
            $body.bind('false', mouseEvent);
        }

        function mouseEvent(e, delta) {
            // On down scroll, show next slide otherwise show prev slide
            showSlide(delta >= 0 ? -1 : 1);
            e.preventDefault();
        }

        $('nav a, .main-btn a').click(function (e) {
            // When link clicked, find slide it points to
            var newslide = parseInt($(this).attr('href')[1]);
            // find how far it is from current slide
            var diff = newslide - currSlide - 1;
            showSlide(diff); // show that slide
            e.preventDefault();
        });

        $(window).resize(function () {
            // Keep current slide to left of window on resize
            var displacment = window.innerWidth * currSlide;
            $slides.css('transform', 'translateX(-' + displacment + 'px)');
        });

        // cache
        var $body = $('body');
        var currSlide = 0;
        var $slides = $('.slides');
        var $slide = $('.slide');

        // give active class to first link
        $($('nav a')[0]).addClass('active');

        // add event listener for mousescroll
        $body.bind('false', mouseEvent);
    })


    $('#form-submit .date').datepicker({
    });


    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 100) {
            $(".header").addClass("active");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
            $(".header").removeClass("active");
        }
    });


});

$(function () {
    $(document).delegate(".chat-btn", "click", function () {
        var value = $(this).attr("chat-value");
        var name = $(this).html();
        $("#chat-input").attr("disabled", false);
        generate_message(name, 'self');
    })

    $("#chat-circle").click(function () {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    })

    $(".chat-box-toggle").click(function () {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    })

})

var words = ['A Bit About Me', 'Im a Solo Indie Game Developer', '3D Artist', 'Web Developer', 'Software Developer', 'Computer Technician'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 40;
    
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset == 1) {
        forwards = true;
        i++;
        offset = 1;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    $('.word').text(part);
  },speed);
};

$(document).ready(function () {
  wordflick();
});
