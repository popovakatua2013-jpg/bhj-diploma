/**
 * Класс AccountsWidget управляет
 * списком счетов в боковой колонке
 * */
class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент AccountsWidget не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Обработка кликов:
   * - по кнопке создания счёта (.create-account) — открыть окно newAccount
   * - по элементу счёта ([data-account-id]) — открыть страницу транзакций
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      // Кнопка «Новый счёт»
      const createAccountBtn = event.target.closest('.create-account');
      if (createAccountBtn) {
        event.preventDefault();
        App.getModal('createAccount').open();
        return;
      }

      // Клик по элементу счёта в списке
      const accountItem = event.target.closest('[data-account-id]');
      if (accountItem) {
        event.preventDefault();
        const accountId = accountItem.dataset.accountId;
        App.showPage('transactions', { account_id: accountId });
      }
    });
  }

  /**
   * Получает список счетов через Account.list
   * и передаёт полученные данные в render()
   * */
  update() {
    Account.list({}, (err, response) => {
      if (response && response.success) {
        this.render(response.data);
      }
    });
  }

  /**
   * Отрисовывает список счетов.
   * Сохраняет header (заголовок «Счета» с кнопкой «Новый счёт»),
   * остальные li удаляет и добавляет новые.
   * */
  render(accounts) {
    // Удаляем все li, кроме .header
    const items = this.element.querySelectorAll('li:not(.header)');
    items.forEach((item) => item.remove());

    if (!accounts || accounts.length === 0) return;

    accounts.forEach((account) => {
      const li = document.createElement('li');
      li.dataset.accountId = account.id;
      li.innerHTML = `
        <a href="#">
          <span>${account.name}</span>
          <small class="label pull-right bg-blue">${account.sum || 0}</small>
        </a>
      `;
      this.element.appendChild(li);
    });
  }
}