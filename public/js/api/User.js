/**
 * Класс User для управления пользователем.
 * Не наследуется от Entity.
 * */
class User {
  static get URL() {
    return '/user';
  }

  /**
   * Устанавливает авторизованного пользователя в localStorage.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * или undefined, если его нет.
   * */
  static current() {
    const userJson = localStorage.getItem('user');
    if (!userJson) return undefined;
    try {
      return JSON.parse(userJson);
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Удаляет запись об авторизованном пользователе из localStorage.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Извлекает данные о текущем авторизованном пользователе.
   * GET-запрос на URL + '/current'.
   * */
  static fetch(callback) {
    createRequest({
      url: `${this.URL}/current`,
      method: 'GET',
      callback: (err, response) => {
        if (response && response.success && response.user) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        }
        if (typeof callback === 'function') {
          callback(err, response);
        }
      },
    });
  }

  /**
   * Регистрирует пользователя.
   * POST-запрос на URL + '/register'.
   * */
  static register(data, callback) {
    createRequest({
      url: `${this.URL}/register`,
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response && response.success && response.user) {
          User.setCurrent(response.user);
        }
        if (typeof callback === 'function') {
          callback(err, response);
        }
      },
    });
  }

  /**
   * Авторизует ранее зарегистрированного пользователя.
   * POST-запрос на URL + '/login'.
   * */
  static login(data, callback) {
    createRequest({
      url: `${this.URL}/login`,
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response && response.success && response.user) {
          User.setCurrent(response.user);
        }
        if (typeof callback === 'function') {
          callback(err, response);
        }
      },
    });
  }

  /**
   * Выход из системы.
   * POST-запрос на URL + '/logout'.
   * */
  static logout(callback) {
    createRequest({
      url: `${this.URL}/logout`,
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success) {
          User.unsetCurrent();
        }
        if (typeof callback === 'function') {
          callback(err, response);
        }
      },
    });
  }
}