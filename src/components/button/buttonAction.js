function updateButtons() {
  document.querySelectorAll('.book-card-info-block').forEach(block => {
    const priceElement = block.querySelector('.book-card__price');
    const button = block.querySelector('.book-card__buy-btn');
    if (!button) return;
    const hasValidPrice =
      priceElement &&
      priceElement.textContent.trim() !== 'No data' &&
      priceElement.textContent.trim() !== '';
    if (hasValidPrice) {
      button.classList.remove('disabled');
    } else {
      button.classList.add('disabled');
    }
  });
}
function updateCartBadge() {
  let cartButton = document.querySelector('.header-utilities__shop-bag');
  if (!cartButton) return;

  let cartBadge = cartButton.querySelector('.header-utilities__shop-bag-badge');
  if (!cartBadge) {
    cartBadge = document.createElement('span');
    cartBadge.classList.add('header-utilities__shop-bag--badge');
    cartButton.appendChild(cartBadge);
  }

  const cartCount = JSON.parse(localStorage.getItem('cartCount')) || [];
  cartBadge.textContent = cartCount;
  cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
}
export default function buttonAction() {
  const observer = new MutationObserver(updateButtons);
  observer.observe(document.body, { childList: true, subtree: true });

  updateButtons();
  updateCartBadge();

  document.addEventListener('click', event => {
    const button = event.target.closest('.book-card__buy-btn');
    if (
      !button ||
      button.classList.contains('disabled') ||
      button.hasAttribute('disabled')
    )
      return;

    const isInCart = button.classList.contains('in-cart');
    if (isInCart) {
      button.textContent = 'Buy';
      button.classList.remove('in-cart');
    } else {
      button.textContent = 'In the cart';
      button.classList.add('in-cart');
    }

    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    cartCount = isInCart ? Math.max(0, cartCount - 1) : cartCount + 1;
    localStorage.setItem('cartCount', cartCount);
    updateCartBadge();
  });
}
