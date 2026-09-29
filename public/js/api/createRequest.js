/**
 * Основная функция для совершения запросов на сервер.
 * Возвращает объект XMLHttpRequest.
 * */
const createRequest = (options = {}) => {
  const {
    url = '',
    data = {},
    method = 'GET',
    responseType = 'json',
    callback
  } = options;

  const xhr = new XMLHttpRequest();
  xhr.responseType = responseType;
  // сессионные куки (cookie-session на сервере)
  xhr.withCredentials = true;

  let requestUrl = url;
  let requestBody = null;

  if (method.toUpperCase() === 'GET') {
    // Для GET — данные уходят в query-строку
    const params = new URLSearchParams(data).toString();
    if (params) {
      requestUrl += (url.includes('?') ? '&' : '?') + params;
    }
  } else {
    // Для не-GET — данные уходят в FormData
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    requestBody = formData;
  }

  // Перехват сетевых ошибок (как рекомендовано в md/api.md)
  try {
    xhr.open(method, requestUrl, true);
    xhr.send(requestBody);
  } catch (e) {
    if (typeof callback === 'function') {
      callback(e);
    }
  }

  xhr.onload = function () {
    if (typeof callback !== 'function') return;
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, xhr.response);
    } else {
      callback(new Error(`Ошибка запроса: ${xhr.status}`), xhr.response);
    }
  };

  xhr.onerror = function () {
    if (typeof callback === 'function') {
      callback(new Error('Сетевая ошибка'), null);
    }
  };

  return xhr;
};