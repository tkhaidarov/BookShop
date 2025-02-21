export default class FixedAside {
  constructor() {
    this.slider = document.querySelector('.slider');
    this.aside = document.getElementById('aside');
    this.headerHeight = document.querySelector('header').offsetHeight;
    this.sliderHeight = this.slider.offsetHeight;
    //получаем margin-bottom слайдера
    const sliderStyle = getComputedStyle(this.slider);
    this.sliderMarginBottom= parseInt(sliderStyle.marginBottom,10);
    this.init();
  }
  init() {
    window.addEventListener('scroll', () => this.onScroll());
  }
  onScroll() {
    const scrollTrigger = this.sliderHeight + this.sliderMarginBottom;
    if (window.scrollY >= scrollTrigger) {
      // Когда слайдер прокручен, фиксируем aside под header
      this.aside.classList.add('fixed');
      this.aside.style.position = 'fixed';
      this.aside.style.top = `${this.headerHeight}px`;
    } else {
      this.aside.classList.remove('fixed');
      this.aside.style.position = 'absolute';
      this.aside.style.top = ``;
    }
  }
}
