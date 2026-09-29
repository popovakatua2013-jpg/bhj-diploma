/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показ боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleButton = document.querySelector('.sidebar-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', (event) => {
        event.preventDefault();
        document.body.classList.toggle('sidebar-open');
        document.body.classList.toggle('sidebar-collapse');
      });
    }
  }

  /**
   * При нажатии на кнопку входа показывает окно входа
   * (через найденное в App.getModal('login'))
   * При нажатии на кнопку регистрации показывает окно регистрации
   * (через App.getModal('register'))
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState('init')
   * */
  static initAuthLinks() {
    // Кнопка входа
    const loginItem = document.querySelector('.menu-item_login');
    if (loginItem) {
      loginItem.addEventListener('click', (event) => {
        event.preventDefault();
        App.getModal('login').open();
      });
    }

    // Кнопка регистрации
    const registerItem = document.querySelector('.menu-item_register');
    if (registerItem) {
      registerItem.addEventListener('click', (event) => {
        event.preventDefault();
        App.getModal('register').open();
      });
    }

    // Кнопка выхода
    const logoutItem = document.querySelector('.menu-item_logout');
    if (logoutItem) {
      logoutItem.addEventListener('click', (event) => {
        event.preventDefault();
        User.logout((err, response) => {
          if (response && response.success) {
            App.setState('init');
          }
        });
      });
    }
  }
}