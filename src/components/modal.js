//работa модальных окон
import {closePopup} from './utils';
import { createTape } from './card';
import { container, nameInput, profileName, profileJob, professionInput } from './index';
import { changeProfileData } from './api';

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
    profileAvatar.style.backgroundImage = `url(${avatarInput.value})`;
    closePopup(popupAvatar);
}

export function submitFormProfile(e) {
    e.preventDefault();
    // profileName.textContent = nameInput.value;
    // profileJob.textContent = professionInput.value;
    console.dir(nameInput);
    console.dir(professionInput);

    changeProfileData(nameInput.value, professionInput.value)
    .then( (data) => {
        console.log(data);
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
    container.prepend(createTape(name, src))
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


