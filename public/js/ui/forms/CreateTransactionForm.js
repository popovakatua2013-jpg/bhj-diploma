/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('[name="account_id"]');
    if (!select) return;

    Account.list({}, (err, response) => {
      if (!response || !response.success) return;

      // Очищаем список перед заполнением
      select.innerHTML = '';

      // Добавляем option для каждого счёта
      response.data.forEach((account) => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = account.name;
        select.appendChild(option);
      });
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        // Сбрасываем форму
        this.element.reset();
        // Определяем, какое окно закрыть, по id формы
        if (this.element.id === 'new-income-form') {
          App.getModal('newIncome').close();
        } else if (this.element.id === 'new-expense-form') {
          App.getModal('newExpense').close();
        }
        // Обновляем приложение (виджеты и страницы)
        App.update();
      } else {
        console.error((response && response.error) || 'Ошибка создания транзакции');
      }
    });
  }
}
