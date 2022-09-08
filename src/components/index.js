import '../pages/index.css';

import { mestoSelectors} from './data';
import { resetErrors, enableValidation } from './validate';
import { popupImg, createCard, handleDeleteCard } from './card';
import {
    popupAbout, popupAdd, popupAvatar,
    submitFormProfile, submitFormPlace, submitFormAvatar,
    initPopup,
    profileAvatar, popupCardDelete
} from './modal';
import { openPopup } from './utils';
import { getBasicData, getInitialCards } from './api';

export const container = document.querySelector('.tapes');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__profession');
export const nameInput = popupAbout.querySelector(".popup__form-name");
export const professionInput = popupAbout.querySelector(".popup__form-profession");
export const titleInput = document.querySelector('#title');
export const pictureInput = document.querySelector('#picture');

export let currentUserId = '';

const openEditButton = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const avatarInput = document.querySelector('#avatar');
const avatarEditButton = document.querySelector('.profile__avatar');
const formEdit = document.querySelector('#profile-edit');
const formAdd = document.querySelector('#profile-add');
const formAvatar = document.querySelector('#avatar-form');
const formDelete = document.querySelector('#delete-form');

initPopup(popupAbout);
initPopup(popupAdd);
initPopup(popupImg);
initPopup(popupAvatar);
initPopup(popupCardDelete);

    Promise.all([getBasicData(), getInitialCards()])
    // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
      .then(([data, cards]) => {
        profileName.textContent = data.name; //в контент переменной записывается значение с сервера
        profileJob.textContent = data.about;
        profileAvatar.style.backgroundImage = `url(${data.avatar})`;
        currentUserId = data._id;
          // и тут отрисовка карточек
          cards.reverse().forEach((card) => {
            const tape = createCard(card, currentUserId)
            container.prepend(tape)
        })
      })
      .catch(err => {
        console.log(err);
      });

openEditButton.addEventListener("click", function () {

    nameInput.value = profileName.textContent;
    professionInput.value = profileJob.textContent;

    resetErrors(formEdit, mestoSelectors);
    openPopup(popupAbout);
});

buttonAdd.addEventListener('click', function () {

    titleInput.value = '';
    pictureInput.value = '';

    resetErrors(formAdd, mestoSelectors);

    openPopup(popupAdd);
});

avatarEditButton.addEventListener('click', function () {
    avatarInput.value = '';

    resetErrors(formAvatar, mestoSelectors);
    openPopup(popupAvatar);
})

formEdit.addEventListener('submit', submitFormProfile);
formAdd.addEventListener('submit', submitFormPlace);
formAvatar.addEventListener('submit', submitFormAvatar);
formDelete.addEventListener('submit', handleDeleteCard);

enableValidation(mestoSelectors);