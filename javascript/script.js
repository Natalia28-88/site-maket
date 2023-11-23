'use strict';

//ibg
function ibg() {
  let ibg = document.querySelectorAll('.ibg');
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage =
        'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

ibg();

// //jQuery
// function ibg(){

//     $.each($('.ibg'), function(index, val) {
//     if($(this).find('img').length>0){
//     $(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
//     }
//     });
//     }

//     ibg();

//Меню-бургер
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');

if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    iconMenu.classList.toggle('active');
    menuBody.classList.toggle('active');
    document.body.classList.toggle('lock');
  });
}

//Slider

const slides = document.querySelectorAll('.slider__slide');
const slider = document.querySelector('.slider__body');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.dots');

let currSlide = 0;
const maxSlides = slides.length;

function createDots() {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `
      <button class="dots__dot" data-slide="${i}"></button>
    `
    );
  });
}
createDots();

function goToSlide(slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

function activateDots(slide) {
  document.querySelectorAll('.dots__dot').forEach(function (dot) {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
}

goToSlide(0);
activateDots(0);

function nextSlide() {
  if (currSlide === maxSlides - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
  activateDots(currSlide);
}

function prevSlide() {
  if (currSlide === 0) {
    currSlide = maxSlides - 1;
  } else {
    currSlide--;
  }

  goToSlide(currSlide);
  activateDots(currSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  }
  if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDots(slide);
  }
});

//form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#form');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert('Ошибка');
        form.classList.remove('_sending');
      }
    } else {
      alert('Заполните обязательные поля!');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
});
