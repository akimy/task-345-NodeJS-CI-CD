import '../scss/index.scss';
import '../images/favicon.png';
import someFunction from './something';

document.addEventListener('DOMContentLoaded', () => {
  const backLink = document.querySelector('.navigation-link_back');
  if (backLink) {
    backLink.addEventListener('click', () => {
      window.history.back();
    });
  }

  someFunction('ES6 импорты работают');
});
