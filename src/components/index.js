import '../pages/index.css';

import { mestoSelectors, initialCards } from './data';
import { resetErrors, enableValidation } from './validate';
import { popupImg, createTape, tapeElement, tapeImg, tapeTitle } from './card';
import {
    popupAbout, popupAdd, popupAvatar,
    submitFormProfile, submitFormPlace, submitFormAvatar,
    initPopup,
    profileAvatar
} from './modal';
import { openPopup } from './utils';
import { getBasicData, getInitialCards} from './api';

export const container = document.querySelector('.tapes');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__profession');
export const nameInput = popupAbout.querySelector(".popup__form-name");
export const professionInput = popupAbout.querySelector(".popup__form-profession");

const openEditButton = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar');
const formEdit = document.querySelector('#profile-edit');
const formAdd = document.querySelector('#profile-add');
const formAvatar = document.querySelector('#avatar-form');


initPopup(popupAbout);
initPopup(popupAdd);
initPopup(popupImg);
initPopup(popupAvatar);


//получение хранящихся на сервере данных (имя, профессия, аватар)
getBasicData() 
   .then( (data) => {
    profileName.textContent = data.name; //в контент переменной записывается значение с сервера
    profileJob.textContent = data.about;
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    console.log(data);
   })
   .catch(console.log)
   .finally(() => {
      console.log('Вызов состоялся!!!');
      });

//получение данных, храниящихся на сервере (карты)
getInitialCards()
.then( (data) => {
    tapeImg.src = data.link;
    tapeImg.alt = data.name;
    tapeTitle.textContent = data.name;
    console.log(data)
})
.catch(console.log)
.finally(() => {
    console.log('Карты получены!!!');
    });


openEditButton.addEventListener("click", function () {
    
    nameInput.value = profileName.textContent;
    professionInput.value = profileJob.textContent;

    resetErrors(formEdit, mestoSelectors);
    openPopup(popupAbout);
});

buttonAdd.addEventListener('click', function () {
    const titleInput = document.querySelector('#title');
    const pictureInput = document.querySelector('#picture');

    titleInput.value = '';
    pictureInput.value = '';

    resetErrors(formAdd, mestoSelectors);

    openPopup(popupAdd);
});

avatarEditButton.addEventListener('click', function () {
    const avatarInput = document.querySelector('#avatar');

    avatarInput.value = '';

    resetErrors(formAvatar, mestoSelectors);
    openPopup(popupAvatar);
})

formEdit.addEventListener('submit', submitFormProfile);
formAdd.addEventListener('submit', submitFormPlace);
formAvatar.addEventListener('submit', submitFormAvatar);

container.addEventListener('click', function (e) {
    if (e.target.className === 'tapes__delete') {
        const listItem = e.target.closest('.tapes__elements')
        listItem.remove()
    }

    if (e.target.classList.contains('tapes__button')) {
        e.target.classList.toggle('tapes__button_active')
    }
})

initialCards.forEach((card) => {
    const tape = createTape(card.name, card.link)
    container.insertAdjacentElement('beforeend', tape)
})

enableValidation(mestoSelectors);



// import { getInitialCards } from './api.js'

// getInitialCards()
//   .then((result) => {
//     // обрабатываем результат
//   })
//   .catch((err) => {
//     console.log(err); // выводим ошибку в консоль
//   }); 


