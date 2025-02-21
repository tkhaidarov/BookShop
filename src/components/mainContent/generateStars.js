export default function generateStars(rating) {
  const maxStars = 5;
  const filledStars = Math.round(rating);
  let starsHTML = '';
  const filledStarUrl = '../img/svg/filled-star.svg';
  const emptyStarsUrl = '../img/svg/empty-star.svg';
  for (let i = 0; i < maxStars; i++) {
    const stars = i < filledStars ? filledStarUrl : emptyStarsUrl;
    starsHTML += `<img src='${stars}' alt='⭐'>`;
  }
  return starsHTML;
}
