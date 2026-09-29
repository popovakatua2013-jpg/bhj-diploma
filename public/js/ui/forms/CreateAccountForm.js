/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response && response.success) {
        // Сбрасываем форму
        this.element.reset();
        // Закрываем окно (createAccount — ключ в App.modals)
        App.getModal('createAccount').close();
        // Обновляем виджеты и страницы
        App.update();
      } else {
        console.error((response && response.error) || 'Ошибка создания счёта');
      }
    });
  }
}