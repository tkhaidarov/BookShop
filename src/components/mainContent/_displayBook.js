export class DisplayBook {
  constructor(generateStars) {
    this.API_KEY = 'AIzaSyCI4jNRXECiSxiqxO7QHz9Y7d_2EY7tfhw';
    this.generateStars = generateStars;
    this.container = document.getElementById('booksContainer');
    this.loadMoreBtn = document.querySelector('.load-more-btn');
    this.currentCategory = null;
    this.currentPage = 0;
    this.maxResults = 6;
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener('click', () => this.loadMoreBooks());
    }
  }
  showLoading() {
    this.container.innerHTML = '';
  }

  //
  async loadBooksByCategory(category) {
    this.currentCategory = category;
    this.currentPage = 0;
    try {
      const books = await this.fetchBooksByCategory(category);
      this.displayBooks(books);
      this.toggleLoadMoreButton(books.length);
    } catch (e) {
      console.error('Ошибка загрузки книги', e);
      this.container.innerHTML = 'Ошибка загрузки книг';
    }
  }

  //
  async loadMoreBooks() {
    if (!this.currentCategory) return;
    this.currentPage++;
    try {
      const books = await this.fetchBooksByCategory(this.currentCategory);
      this.appendBooks(books);
      this.toggleLoadMoreButton(books.length);
    } catch (e) {
      console.error('Ошибка загрузки книг:', e);
    }
  }

  //
  async fetchBooksByCategory(category) {
    const startIndex = this.currentPage * this.maxResults;
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&startIndex=${startIndex}&maxResults=${this.maxResults}&key= ${this.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items || [];
  }

  //
  displayBooks(books) {
    this.container.innerHTML = '';
    this.appendBooks(books);
  }

  //
  appendBooks(books) {
    if (books.length === 0 && this.container.innerHTML === '') {
      this.container.innerHTML = 'Книг не найдено';
      return;
    }
    const bookCards = books.map(book => {
      const volumeInfo = book.volumeInfo ?? {};
      const saleInfo = book.saleInfo ?? {};
      return `
      <div class="book-card">
        <div class="book-card-img-block">
          <img data-src="${volumeInfo.imageLinks?.thumbnail ?? 'images/no-cover.png'}" alt="${volumeInfo.title ?? 'Название неизвестно'}" class="book-cover lazyload">
        </div>
        <div class="book-card-info-block">
            <div class="container">
              <p class="book-card__authors">${(volumeInfo.authors ?? ['Автор неизвестен']).join(', ')}</p>
              <h3 class="book-card__title">${volumeInfo.title ?? 'Название неизвестно'}</h3>
                <div class="book-card__rating">
                    <p>${volumeInfo.averageRating ? this.generateStars(volumeInfo.averageRating) : `<span>No data</span>`}</p> <span>${volumeInfo.ratingsCount ?? 0} review</span>
                </div>
              <div><p class="book-card__description">${(volumeInfo.description ?? 'Описание отсутствует').slice(0, 150)}...</p></div>
              <p class="book-card__price">${saleInfo.retailPrice ? `S${saleInfo.retailPrice.amount}` : 'No data'}</p>
              <button class="book-card__buy-btn">Buy</button>
            </div>
        </div>
      </div>
      `;
    });
    this.container.insertAdjacentHTML('beforeend', bookCards.join(''));
    this.initLazyLoad();
  }

  initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('.lazyload');
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazyload');
            observer.unobserve(img);
          }
        });
      });
      lazyImages.forEach(img => observer.observe(img));
    } else {
      document.querySelectorAll('.lazyload').forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazyload');
      });
    }
  }
  toggleLoadMoreButton(bookCount) {
    if (this.loadMoreBtn) {
      this.loadMoreBtn.style.display =
        bookCount < this.maxResults ? 'none' : 'block';
    }
  }
}
