import { data } from "autoprefixer";
import { nameInput, professionInput } from "./index";
// import { profileAvatar } from "./modal";

//функция первичной обработки данных
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(err => {
    err.code = res.status;

    return Promise.reject(err)
  });
}

//получить  данные с сервера, вызов в index.js
export function getBasicData() {
  return fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me', {
    headers: {
      authorization: '0ece32e5-0b11-41b4-bea5-614b42e17cd3',
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse);
}

//отправка на сервер данных имени и профессии, аватара
export function changeProfileData(name, about) {
  return fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '0ece32e5-0b11-41b4-bea5-614b42e17cd3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, about })// тело вызовова, JSON.stringigy - преобразует значение JS в строку  // имя с сервера записывается в текстовое значние из переменной

  })
    .then(checkResponse) // вызов первичной обработки данных
}

//отправка на сервер данных по автару
export function changeProfileAvatar(avatar) {
  return fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me/avatar ', {
    method: 'PATCH',
    headers: {
      authorization: '0ece32e5-0b11-41b4-bea5-614b42e17cd3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar })// тело вызовова, JSON.stringigy - преобразует значение JS в строку  // имя с сервера записывается в текстовое значние из переменной

  })
    .then(checkResponse) // вызов первичной обработки данных
}

//получение массива карточек с сервера

export function getInitialCards() {
  return fetch('https://nomoreparties.co/v1/wbc-cohort-1/cards', {
    headers: {
      authorization: '0ece32e5-0b11-41b4-bea5-614b42e17cd3',
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}

//отправка карточек на сервер

export function createCardTape(data) {
  return fetch('https://nomoreparties.co/v1/wbc-cohort-1/cards', {
    method: 'POST',
    headers: {
      authorization: '0ece32e5-0b11-41b4-bea5-614b42e17cd3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse)
}



export const switchLike = (id, isLiked) => {
  return fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/likes/${id}`, {
    headers: {
      method:  isLiked ? 'DELETE' : 'PUT',
      authorization: '0ece32e5-0b11-41b4-bea5-614b42e17cd3',
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}
