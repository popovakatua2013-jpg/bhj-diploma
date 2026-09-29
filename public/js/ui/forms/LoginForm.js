/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (response && response.success) {
        // Сбрасываем форму
        this.element.reset();
        // Устанавливаем состояние «пользователь авторизован»
        App.setState('user-logged');
        // Закрываем окно входа
        App.getModal('login').close();
      } else {
        console.error((response && response.error) || 'Ошибка авторизации');
      }
    });
  }
}