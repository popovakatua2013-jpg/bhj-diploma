/**
 * Класс UserWidget управляет
 * отображением имени пользователя
 * в боковой колонке
 * */
class UserWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент UserWidget не существует');
    }
    this.element = element;
  }

  /**
   * Получает текущего пользователя через User.current().
   * Если пользователь авторизован, обновляет имя в .user-name.
   * */
  update() {
    const user = User.current();
    if (!user) return;

    const nameEl = this.element.querySelector('.user-name');
    if (nameEl) {
      nameEl.textContent = user.name;
    }
  }
}