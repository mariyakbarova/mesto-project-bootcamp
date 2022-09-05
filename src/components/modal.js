//работa модальных окон
import {closePopup} from './utils';
import { createTape} from './card';
import { container, nameInput, profileName, profileJob, professionInput, titleInput, pictureInput } from './index';
import { changeProfileData, changeProfileAvatar, createCardTape } from './api';

export const popupAbout = document.querySelector('#popup-edit');
export const popupAdd = document.querySelector('#popup-add');
export const popupAvatar = document.querySelector('#popup-avatar');

export const profileAvatar = document.querySelector('#profile-avatar');
const avatarInput = popupAvatar.querySelector('#avatar');

const likeButton = document.querySelector('#like');
const likeCounter = document.querySelector('#like-counter');

export function submitFormAvatar(e) {
    e.preventDefault();
    console.dir(profileAvatar);
    console.dir(avatarInput);
    // profileAvatar.style.backgroundImage = `url(${avatarInput.value})`;
    changeProfileAvatar(avatarInput.value)
    .then( (data) => {
        profileAvatar.style.backgroundImage = `url(${avatarInput.value})`; 
    })
    .catch(console.log)
    .finally(() => {
        console.log('Аватар загрузился');
        });

    closePopup(popupAvatar);
}

export function submitFormProfile(e) {
    e.preventDefault();
    console.dir(nameInput);
    console.dir(professionInput);

    changeProfileData(nameInput.value, professionInput.value)
    .then( (data) => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;    
    })
    .catch(console.log)
    .finally(() => {
        console.log('Вызов состоялся.');
        });


    closePopup(popupAbout);
};

export function submitFormPlace(e) {
    e.preventDefault()
    const name = popupAdd.querySelector('#title').value;
    const src = popupAdd.querySelector('#picture').value;
    // container.prepend(createTape(name, src))

    console.dir(titleInput);
    console.dir(pictureInput);

    createCardTape(name, src)
.then( (data) => {
    titleInput.textContent = data.name;
    titleInput.alt = data.name;
    pictureInput.src = data.link;
    console.dir(data)
})
.catch(console.log)
.finally(() => {
    console.log('Карты отправлены');
    });

    closePopup(popupAdd)
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


