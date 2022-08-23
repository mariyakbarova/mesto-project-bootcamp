import '../pages/index.css';

import { mestoSelectors, initialCards } from './data';
import { resetErrors, enableValidation } from './validate';
import { popupImg, createTape } from './card';
import {
    popupAbout, popupAdd,
    submitFormProfile, submitFormPlace,
    initPopup
} from './modal';
import { openPopup } from './utils';

export const container = document.querySelector('.tapes');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__profession');
const openEditButton = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const formEdit = document.querySelector('#profile-edit');
const formAdd = document.querySelector('#profile-add');


initPopup(popupAbout)
initPopup(popupAdd)
initPopup(popupImg)


openEditButton.addEventListener("click", function () {
    const nameInput = popupAbout.querySelector(".popup__form-name");
    nameInput.value = profileName.textContent;
    const professionInput = popupAbout.querySelector(".popup__form-profession");
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

formEdit.addEventListener('submit', submitFormProfile);
formAdd.addEventListener('submit', submitFormPlace);

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