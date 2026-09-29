/**
 * Класс TransactionsWidget управляет
 * кнопками создания дохода/расхода
 * */
class TransactionsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент TransactionsWidget не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Клик по кнопке «Доход» открывает окно newIncome.
   * Клик по кнопке «Расход» открывает окно newExpense.
   * */
  registerEvents() {
    const incomeBtn = this.element.querySelector('.create-income-button');
    if (incomeBtn) {
      incomeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        App.getModal('newIncome').open();
      });
    }

    const expenseBtn = this.element.querySelector('.create-expense-button');
    if (expenseBtn) {
      expenseBtn.addEventListener('click', (event) => {
        event.preventDefault();
        App.getModal('newExpense').open();
      });
    }
  }
}