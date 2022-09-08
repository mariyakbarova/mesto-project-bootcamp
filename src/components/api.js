import { data } from "autoprefixer";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbc-cohort-1',
  headers: {
    authorization: '0ece32e5-0b11-41b4-bea5-614b42e17cd3',
    'Content-Type': 'application/json'
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(err => {
    err.code = res.status;

    return Promise.reject(err)
  });
}

export function getBasicData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(checkResponse);
};

export function changeProfileData(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
    .then(checkResponse)
}

export function changeProfileAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  })
    .then(checkResponse)
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkResponse)
}

export function createCardTape(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(checkResponse)
}

export const switchLike = (id, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method:  isLiked ? 'DELETE' : 'PUT',
    headers: config.headers,
  })
    .then(checkResponse)
}

export const deleteCardOnServer = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}