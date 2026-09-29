/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент TransactionsPage не существует');
    }
    this.element = element;
    this.lastOptions = null;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта.
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      const deleteTransactionBtn = event.target.closest('.delete-transaction');
      if (deleteTransactionBtn) {
        event.preventDefault();
        const id = deleteTransactionBtn.dataset.id;
        if (id) {
          this.removeTransaction(id);
        }
        return;
      }

      const removeAccountBtn = event.target.closest('.remove-account');
      if (removeAccountBtn) {
        event.preventDefault();
        this.removeAccount();
      }
    });
  }

  /**
   * Удаляет счёт. Показывает confirm().
   * По успешному удалению вызывает clear(),
   * App.updateWidgets() и App.updateForms()
   * */
  removeAccount() {
    if (!confirm('Вы действительно хотите удалить счёт?')) return;
    if (!this.lastOptions || !this.lastOptions.account_id) return;

    Account.remove({ id: this.lastOptions.account_id }, (err, response) => {
      if (response && response.success) {
        this.clear();
        App.updateWidgets();
        App.updateForms();
      } else {
        console.error((response && response.error) || 'Ошибка удаления счёта');
      }
    });
  }

  /**
   * Удаляет транзакцию. Требует подтверждения.
   * По удалению вызывает App.update()
   * */
  removeTransaction(id) {
    if (!confirm('Вы действительно хотите удалить эту транзакцию?')) return;

    Transaction.remove({ id }, (err, response) => {
      if (response && response.success) {
        App.update();
      } else {
        console.error((response && response.error) || 'Ошибка удаления транзакции');
      }
    });
  }

  /**
   * Получает название счёта через Account.get() и
   * отображает через renderTitle.
   * Получает список транзакций через Transaction.list
   * и передаёт в renderTransactions
   * */
  render(options) {
    this.lastOptions = options;
    const accountId = options.account_id;

    Account.get(accountId, (err, response) => {
      if (response && response.success && response.data) {
        this.renderTitle(response.data.name);
      }
    });

    Transaction.list({ account_id: accountId }, (err, response) => {
      if (response && response.success) {
        this.renderTransactions(response.data);
      }
    });
  }

  /**
   * Очищает страницу.
   * */
  clear() {
    this.lastOptions = null;
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    const titleEl = document.querySelector('.content-title');
    if (titleEl) {
      titleEl.textContent = name;
    }
  }

  /**
   * Форматирует дату 2019-03-10 03:20:41 (или ISO-формат) в формат
   * «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    if (!date) return '';

    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const normalized = String(date)
      .replace('T', ' ')
      .replace(/\.\d+Z$/, '');

    const parts = normalized.split(' ');
    if (parts.length < 2) return String(date);

    const [datePart, timePart] = parts;
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    if (!year || !month || !day || !hours || !minutes) {
      return String(date);
    }

    const monthName = months[parseInt(month, 10) - 1] || month;
    return `${parseInt(day, 10)} ${monthName} ${year} г. в ${hours}:${minutes}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * */
  getTransactionHTML(item) {
    const formattedDate = this.formatDate(item.created_at);
    const isIncome = item.type === 'income';
    const sign = isIncome ? '+' : '−';
    const sumClass = isIncome ? 'text-green' : 'text-red';

    return `
      <tr>
        <td>${formattedDate}</td>
        <td>${item.name}</td>
        <td class="${sumClass}"><strong>${sign} ${item.sum}</strong></td>
        <td>
          <button class="btn btn-danger btn-xs delete-transaction" data-id="${item.id}">
            <i class="fa fa-trash"></i> Удалить
          </button>
        </td>
      </tr>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * */
  renderTransactions(data) {
    const content = this.element.querySelector('.content');
    if (!content) return;

    let rowsHtml = '';
    if (!data || data.length === 0) {
      rowsHtml = '<tr><td colspan="4" class="text-center">Нет транзакций</td></tr>';
    } else {
      data.forEach((item) => {
        rowsHtml += this.getTransactionHTML(item);
      });
    }

    content.innerHTML = `
      <table class="table table-bordered table-striped transactions-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Название</th>
            <th>Сумма</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  }
}