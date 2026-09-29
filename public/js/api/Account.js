/**
 * Класс Account для управления счетами пользователя.
 * Наследуется от Entity.
 * */
class Account extends Entity {
  static get URL() {
    return '/account';
  }

  /**
   * Получает данные по конкретному счёту.
   * GET-запрос на URL + '/' + id.
   * */
  static get(id, callback) {
    return createRequest({
      url: `${this.URL}/${id}`,
      method: 'GET',
      callback,
    });
  }
}