//функции для работы с карточками проекта Mesto
import { openPopup, checkIfLiked, handleToggleLike } from "./utils";
// import { getInitialCards } from "./api";

export const popupImg = document.querySelector('#popup-image');

export function createTape(card) {

    const tapeTemplate = document.querySelector('#tapes').content;
    const tapeElement = tapeTemplate.querySelector('.tapes__elements')
    const element = tapeElement.cloneNode(true)
    const tapeImg = element.querySelector('.tapes__photo');
    const tapeTitle = element.querySelector('.tapes__photo-name'); 

    const likeButton = element.querySelector('.tapes__button');
    const likeCounter = element.querySelector('.tapes__like-counter');
    const deleteCard = element.querySelector('.tapes__delete');

    tapeImg.src = card.link;
    tapeImg.alt = card.name;
    tapeTitle.textContent = card.name;
    element.id = card._id;
    likeCounter.textContent = card.likes.length;

    const handleImageClick = (evt) => {
        popupImg.querySelector('.popup__img').src = evt.target.src;
        popupImg.querySelector('.popup__img-name').textContent = evt.target.alt;
        openPopup(popupImg)
    }

    tapeImg.addEventListener('click', handleImageClick);

    const handleLikeOnClick = (evt) => {
        handleToggleLike(card._id, likeButton, likeCounter);
    }


    likeButton.addEventListener('click', handleLikeOnClick);
 
    return element;
};



