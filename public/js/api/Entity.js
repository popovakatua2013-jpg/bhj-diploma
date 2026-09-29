/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Свойство URL равно пустой строке.
 * */
class Entity {
  static get URL() {
    return '';
  }

  /**
   * Запрашивает с сервера список данных (счета или доходы/расходы).
   * GET-запрос на URL.
   * */
  static list(data = {}, callback) {
    return createRequest({
      url: this.URL,
      method: 'GET',
      data,
      callback,
    });
  }

  /**
   * Создаёт счёт или доход/расход.
   * PUT-запрос на URL.
   * */
  static create(data = {}, callback) {
    return createRequest({
      url: this.URL,
      method: 'PUT',
      data,
      callback,
    });
  }

  /**
   * Удаляет счёт или доход/расход.
   * DELETE-запрос на URL + '/'.
   * */
  static remove(data = {}, callback) {
    return createRequest({
      url: this.URL + '/',
      method: 'DELETE',
      data,
      callback,
    });
  }
}
