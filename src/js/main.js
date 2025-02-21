import Slider from '../components/slider/_slider';
import { DisplayBook } from '../components/mainContent/_displayBook';
import CategoryMenu from '../components/sidebar/_categoryMenu';
import FixedAside from '../components/sidebar/_fixedAside';
import generateStars from '@src/components/mainContent/generateStars';
import buttonAction from '@src/components/button/buttonAction';

class Main {
  init() {
    const images = [
      { url: '../img/png/slide-1.png' },
      { url: '../img/png/slide-2.png' },
      { url: '../img/png/slide-3.png' },
    ];
    new Slider(images, 5000);
    const categoryMenu = new CategoryMenu(new DisplayBook(generateStars));
    categoryMenu.init();
    new FixedAside();
    buttonAction();
  }
}
document.addEventListener('DOMContentLoaded', () => new Main().init());
