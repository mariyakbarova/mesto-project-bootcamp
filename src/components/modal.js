//работa модальных окон
import { closePopup } from './utils';
import { createCard } from './card';
import { container, nameInput, profileName, profileJob, professionInput, titleInput, pictureInput, currentUserId } from './index';
import { changeProfileData, changeProfileAvatar, createCardTape } from './api';

export const popupAbout = document.querySelector('#popup-edit');
export const popupAdd = document.querySelector('#popup-add');
export const popupAvatar = document.querySelector('#popup-avatar');
export const popupCardDelete = document.querySelector('#popup-delete-card')

const name = popupAdd.querySelector('#title').value;
const link = popupAdd.querySelector('#picture').value;

export const profileAvatar = document.querySelector('#profile-avatar');
const avatarInput = popupAvatar.querySelector('#avatar');

export function submitFormAvatar(e) {
    e.preventDefault();
    loadigSaveText(true, popupAvatar);
    console.dir(profileAvatar);
    console.dir(avatarInput);
    changeProfileAvatar(avatarInput.value)
        .then((data) => {
            profileAvatar.style.backgroundImage = `url(${avatarInput.value})`;
        })
        .catch(console.log)
        .finally(() => {
            console.log('Аватар загрузился');
            loadigSaveText(false, popupAvatar)
        });
}

export function submitFormProfile(e) {
    e.preventDefault();
    loadigSaveText(true, popupAbout);
    console.dir(nameInput);
    console.dir(professionInput);

    changeProfileData(nameInput.value, professionInput.value)
        .then((data) => {
            profileName.textContent = data.name;
            profileJob.textContent = data.about;
            closePopup(popupAbout)
        })
        .catch(console.log)
        .finally(() => {
            console.log('Вызов состоялся.');
            loadigSaveText(false, popupAbout);
        });
};

export function submitFormPlace(e) {
    e.preventDefault()
    loadigSaveText(true, popupAdd);

    console.dir(titleInput);
    console.dir(pictureInput);

    createCardTape({ link, name })
        .then((data) => {
            container.prepend(createCard(data, currentUserId));
            closePopup(popupAdd)
        })
        .catch(console.log)
        .finally(() => {
            console.log('Карты отправлены');
            loadigSaveText(false, popupAdd);
        });
};


export const handleEscPressed = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup)
    }
}

export function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup)
    }
}

export function initPopup(element) {
    const closeBtn = element.querySelector('.popup__exit')
    element.addEventListener('click', closePopupOverlay);
    closeBtn.addEventListener('click', () => {
        closePopup(element)
    })
}

export function loadigSaveText(isLoading, popup) {
    const buttonSave = popup.querySelector('.popup__save');
    if (isLoading) {
        buttonSave.textContent = 'Сохранение...'
        buttonSave.disabled = true;
    } else {
        buttonSave.textContent = 'Сохранить'
        buttonSave.disabled = false;
    }
};


