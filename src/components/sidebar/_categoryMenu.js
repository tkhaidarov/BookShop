export default class CategoryMenu {
  constructor(displayBook) {

    this.categoryList = [
      'Art & Fashion',
      'Biography',
      'Business',
      'Drama',
      'Fiction',
      'Food & Drink',
      'Health & Wellbeing',
      'History & Politics',
      'Humor',
      'Poetry',
      'Psychology',
      'Science',
      'Technology',
      'Travel & Maps',
    ];
    this.displayBook = displayBook;
    this.listElement = document.getElementById('categoryList');
    this.loadMoreBtn = document.querySelector('.load-more-btn');
    if (this.listElement) {
      this.init();
    } else {
      console.error(`Ошибка: элемент <ul> для категорий не найден!`);
    }
  }

  init() {
    this.listElement.innerHTML = '';
    this.categoryList.forEach(category => {
      const li = document.createElement('li');
      li.classList.add('category__item');
      li.dataset.category = category;
      const nameSpan = document.createElement('span');
      nameSpan.textContent = category;
      nameSpan.classList.add('category__name');

      const circle = document.createElement('span');
      circle.classList.add('category__name--circle');
      li.append(circle, nameSpan);
      li.addEventListener('click', () => this.onClickCategory(category));
      li.addEventListener('click', () => this.activateCategory(li));
      this.listElement.append(li);
    });
  }

  activateCategory(selectedLi) {
    const allItems = this.listElement.querySelectorAll('.category__item');
    allItems.forEach(item => {
      item.classList.remove('active');
      item
        .querySelector('.category__name--circle')
        .classList.remove('active-circle');
    });
    selectedLi.classList.add('active');
    selectedLi
      .querySelector('.category__name--circle')
      .classList.add('active-circle');
  }

  onClickCategory(category) {
    this.displayBook.showLoading();
    this.displayBook.loadBooksByCategory(category);
    if (this.loadMoreBtn) {
      setTimeout(()=> {
        this.loadMoreBtn.style.display = 'block'},2000);
    }
  }
}