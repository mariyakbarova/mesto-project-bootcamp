import { data } from "autoprefixer";
import { nameInput, professionInput } from "./index";
// import { profileAvatar } from "./modal";

//функция первичной обработки данных
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//получить  данные с сервера, вызов в index.js
export function getBasicData() {
  return fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me', {
    headers: {
      authorization: '0ece32e5-0b11-41b4-bea5-614b42e17cd3',
      'Content-Type': 'aplication/json'
    }
  })
    .then(checkResponse);
}

getBasicData()


//получение данных (имя, профессия)
// export function getProfileInfo() {
//   fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me', { //адрес сервера, с которого получаем данные
//     headers: {
//       authorization: '0ece32e5-0b11-41b4-bea5-614b42e17cd3', // мой персональный токен
//       'Content-Type': 'aplication/json' //типа данных
//     },
//   })
//     .then(checkResponse)
//     .then((result) => {
//       profileName.textContent = result.name,
//         profileJob.textContent = result.about,
//         profileAvatar.style.backgroundImage = `url(${result.avatar})`
//     })
//     .catch((err) => {
//       console.log(err)
//     });
// }


//функция замены имени и профессии
export function changeProfileData() {
  return fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me', { 
    method: 'PATCH', 
    headers: {
      authorization: '0ece32e5-0b11-41b4-bea5-614b42e17cd3', 
      'Content-Type': 'aplication/json'
    },
    body: JSON.stringify({ // тело вызовова, JSON.stringigy - преобразует значение JS в строку
      name: nameInput.value, // имя с сервера записывается в текстовое значние из переменной
      about: professionInput.value
    })
  })
    .then(checkResponse) // вызов первичной обработки данных
    .then(getBasicData)
    .catch((err) => {
      console.log(err);
    });
}



