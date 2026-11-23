// O CSS entra pelo JS: o Webpack segue este import, passa o CSS pelos
// loaders e o MiniCssExtractPlugin o põe num arquivo próprio no build.
import './pages/index.css';

// Ano do rodapé, para o "© 2026" nunca ficar desatualizado.
const yearElement = document.querySelector('.footer__year');
yearElement.textContent = new Date().getFullYear();

// Menu do celular: o botão abre e fecha a navegação. aria-expanded avisa
// os leitores de tela se o menu está aberto.
const menuButton = document.querySelector('.header__menu-button');
const navigation = document.querySelector('.navigation');

function setMenuOpen(isOpen) {
  navigation.classList.toggle('navigation_opened', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute(
    'aria-label',
    isOpen ? 'Fechar o menu' : 'Abrir o menu',
  );
}

menuButton.addEventListener('click', () => {
  setMenuOpen(!navigation.classList.contains('navigation_opened'));
});

// Clicar num link do menu leva à seção e fecha o menu.
navigation.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('navigation__link')) {
    setMenuOpen(false);
  }
});
