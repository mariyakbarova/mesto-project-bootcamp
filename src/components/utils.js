//утилитарные функции, которые используются в работе сразу нескольких других функций
import { buttonSave } from "./modal";

export function openPopup(popup) {
    document.addEventListener('keydown', handleEscPressed)
    popup.classList.add('popup_opened');
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', handleEscPressed)
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

export function loadigSaveText(isLoading, popup) {
    if (isLoading) {
        buttonSave.textContent = 'Сохранение...'
        buttonSave.disabled = true;
    } else {
        buttonSave.textContent = 'Сохранить'
        buttonSave.disabled = false;
    }
}

export const checkIfLiked = (likes, userId) => likes.some((item) => item._id === userId);





