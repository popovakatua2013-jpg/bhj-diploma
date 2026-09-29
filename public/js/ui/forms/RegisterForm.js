/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response && response.success) {
        // Сбрасываем форму (хорошая практика)
        this.element.reset();
        // Устанавливаем состояние «пользователь авторизован»
        App.setState('user-logged');
        // Закрываем окно регистрации
        App.getModal('register').close();
      } else {
        console.error((response && response.error) || 'Ошибка регистрации');
      }
    });
  }
}