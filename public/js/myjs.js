var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1, // Number of slides visible at a time
  spaceBetween: 10, // Space between slides in pixels
  loop: true, // Infinite loop mode
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  autoplay: {
      delay: 5000, // Delay between slides in ms
      disableOnInteraction: false,
  },
});

// Pause autoplay on hover
// document.querySelector('.swiper-container').addEventListener('mouseenter', function() {
//   swiper.autoplay.stop();
// });

// Resume autoplay when hover ends
document.querySelector('.swiper-container').addEventListener('mouseleave', function() {
  swiper.autoplay.start();
});
const swiperContainer = document.querySelector('.swiper-container');
if (swiperContainer) {
  swiperContainer.addEventListener('mouseenter', function() {
    swiper.autoplay.stop();
  });
}


document.querySelectorAll('hr + p, p + hr, hr + h1, h1 + hr, hr + h2, h2 + hr, hr + h3, h3 + hr, hr + h4, h4 + hr, hr + h5, h5 + hr, hr + h6, h6 + hr').forEach(pTag => {
  if (pTag.innerHTML.trim() === '&nbsp;' || pTag.innerHTML.trim() === '&ensp;') {
      pTag.remove();
  }
});

$('.toggle').click(function(e) {
  e.preventDefault();

  let $this = $(this);
  const $icon = $(this).find('.toggle-icon');
  const $answer = $(this).next('.inner');

  // Agar already open hai toh sirf usko close karo
  if ($answer.hasClass('show')) {
      $answer.slideUp(350).removeClass('show');
      $icon.text('+');
  } else {
      // Sabko close karo aur icons reset karo
      $('.toggle-icon').text('+');
      $('.inner').slideUp(350).removeClass('show');

      // Ab sirf clicked toggle ko open karo
      $answer.slideDown(350).addClass('show');
      $icon.text('-');
  }
});