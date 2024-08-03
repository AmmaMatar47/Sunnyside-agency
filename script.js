'use strict';

const nav = document.querySelector('nav');
const links = document.querySelectorAll('a');
const main = document.querySelector('main');
const testimonialSection = document.querySelector('.testimonial-box');
const header = document.querySelector('header');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots-container');
const footer = document.querySelector('footer');
const [footerImgsDesktop, footerImgsMobile] = document.querySelectorAll('.footer-images-container');

// sticky nav
const stickyNav = entries => {
  const [entry] = entries;
  !entry.isIntersecting && nav.classList.add('sticky');
  entry.isIntersecting && nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

const rightArrowBtn = document.querySelector('.arrow-right');
const leftArrowBtn = document.querySelector('.arrow-left');

// Slider TESTIMONIALS
let curSlide = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.setAttribute(`data-dot`, i);
  dotContainer.insertAdjacentElement('beforeend', dot);
});

const goToSlide = curSlide => {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - curSlide) * 100}%)`;
  });
};
const activeDot = dot => {
  dotContainer.querySelectorAll('.dot').forEach(dots => dots.classList.remove('dot-active'));
  document.querySelector(`.dot[data-dot="${dot}"]`).classList.add('dot-active');
};

goToSlide(0);
activeDot(0);

const dotSlide = goTo => {
  curSlide = goTo;
  goToSlide(curSlide);
};
const nextSlide = () => {
  curSlide++;
  if (curSlide === slides.length) curSlide = 0;
  goToSlide(curSlide);
  activeDot(curSlide);
};

const previousSlide = () => {
  if (curSlide === 0) curSlide = slides.length;
  curSlide--;
  goToSlide(curSlide);
  activeDot(curSlide);
};

rightArrowBtn.addEventListener('click', nextSlide);
leftArrowBtn.addEventListener('click', previousSlide);
document.addEventListener('keydown', e => e.key === 'ArrowLeft' && previousSlide());
document.addEventListener('keydown', e => e.key === 'ArrowRight' && nextSlide());

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dot')) {
    const dot = e.target;
    const currentDot = +dot.dataset.dot;
    dotSlide(currentDot);
    activeDot(currentDot);
  }
});

// Unhide sections

const smoothUnhide = entries => {
  const [entry] = entries;
  if (entry.isIntersecting && entry.target === first) {
    first.classList.remove('main-hidden');
    Observer.unobserve(first);
  }
  if (entry.isIntersecting && entry.target === second) {
    second.classList.remove('main-hidden');
    Observer.unobserve(second);
  }
  if (entry.isIntersecting && entry.target === third) {
    third.classList.remove('main-hidden');
    Observer.unobserve(third);
  }
  if (entry.isIntersecting && entry.target === testimonialSection) {
    testimonialSection.classList.remove('testimonial-translate-effect');
    Observer.unobserve(testimonialSection);
  }
  if (entry.isIntersecting && entry.target === footer) {
    footer.classList.remove('footer-translate-effect');
    footerImgsDesktop.classList.remove('footer-translate-effect');
    footerImgsMobile.classList.remove('footer-translate-effect');
    footerObserver.unobserve(footer);
  }
};

const Observer = new IntersectionObserver(smoothUnhide, {
  root: null,
  threshold: 0,
});
const footerObserver = new IntersectionObserver(smoothUnhide, {
  root: null,
  threshold: 0,
  rootMargin: `${footerImgsDesktop.getBoundingClientRect().height}px`,
});

Observer.observe(testimonialSection);
footerObserver.observe(footer);
const [first, second, third] = main.children;
Observer.observe(first);
Observer.observe(second);
Observer.observe(third);

// Nav icon

const navToggleOpen = () => {
  document.querySelector('.nav-box').classList.toggle('hidden');
  document.querySelector('body').classList.toggle('deactivate-scroll');
};
const navIcon = document.querySelector('.hamburger-icon');
navIcon.addEventListener('click', navToggleOpen);

document.querySelector('.nav-box').addEventListener('click', e => {
  if (e.target.classList.contains('nav-elements-in_box')) navToggleOpen();
});
