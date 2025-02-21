export default class Slider {
  constructor(images, intervalTime = 2000) {
    this.images = images;
    this.currentIndex = 0;
    this.sliderImages = document.querySelector('.slider__banners');
    this.sliderDots = document.querySelector('.slider__dots');
    this.intervalTime = intervalTime;
    this.interval = null;
    this.init();
  }
  init() {
    this.initImages();
    this.initDots();
    this.onClickToDots();
    this.startAutoSlide();
  }
  initImages() {
    this.sliderImages.innerHTML = this.images
      .map(
        (image, index) =>
          `<div class="slider__banner n${index} ${index === 0 ? 'active' : ''}" style="background-image: url(${image.url});" data-index="${index}"></div>`,
      )
      .join('');
  }
  initDots() {
    this.sliderDots.innerHTML = this.images
      .map(
        (_, index) =>
          `<div class="slider__dot n${index} ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`,
      )
      .join('');
  }
  onClickToDots() {
    this.sliderDots.querySelectorAll('.slider__dot').forEach(dot => {
      dot.addEventListener('click', event => {
        this.stopAutoSlide();
        this.moveSlider(event.target.dataset.index);
        this.startAutoSlide();
      });
    });
  }
  moveSlider(num) {
    this.sliderImages.querySelector('.active').classList.remove('active');
    this.sliderImages.querySelector('.n' + num).classList.add('active');
    this.sliderDots.querySelector('.active').classList.remove('active');
    this.sliderDots.querySelector('.n' + num).classList.add('active');
    this.currentIndex = num;
  }
  startAutoSlide() {
    this.interval = setInterval(() => {
      let nextIndex = (this.currentIndex + 1) % this.images.length;
      this.moveSlider(nextIndex);
    }, this.intervalTime);
  }
  stopAutoSlide() {
    clearInterval(this.interval);
  }
}
