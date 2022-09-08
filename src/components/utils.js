//утилитарные функции, которые используются в работе сразу нескольких других функций
import { handleEscPressed, popupCardDelete } from "./modal";

export function openPopup(popup) {
    document.addEventListener('keydown', handleEscPressed)
    popup.classList.add('popup_opened');
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', handleEscPressed)
};

// лайки

export const checkIfLiked = (likes, userId) => likes.some((item) => item._id === userId);





