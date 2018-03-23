import '../scss/index.scss';
import '../images/favicon.png';

document.addEventListener('DOMContentLoaded', () => {
  const backLink = document.querySelector('.navigation-link__back');
  if (backLink) {
    backLink.addEventListener('click', () => {
      window.history.back();
    });
  }
});

