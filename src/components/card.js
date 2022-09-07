//функции для работы с карточками проекта Mesto
import { switchLike } from "./api";
import { openPopup, closePopup, checkIfLiked, handleToggleLike } from "./utils";
import { popupCardDelete } from "./modal";
import { deleteCardOnServer } from "./api";

export const popupImg = document.querySelector('#popup-image');
export let currentDeleteCard = null;

export function createTape(card, userId) {

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

    // const handleDeleteClick = () => {
    //     handleDeleteCard(element)
    // }
   
    if (card.owner._id !== userId) {
        deleteCard.remove()
    } else {
        deleteCard.addEventListener('click', function (evt) {
            currentDeleteCard = evt.target.closest('.tapes__elements'); //определяем краточку и записываем во временную переменную
            openPopup(popupCardDelete);
        });
    }

    if (checkIfLiked(card.likes, userId)) {
        likeButton.classList.add('tapes__button_active');
    } else {
        likeButton.classList.remove('tapes__button_active');
    };

    const handleImageClick = (evt) => {
        popupImg.querySelector('.popup__img').src = evt.target.src;
        popupImg.querySelector('.popup__img-name').textContent = evt.target.alt;
        openPopup(popupImg)
    }

    tapeImg.addEventListener('click', handleImageClick);

    const handleLikeOnClick = (evt) => {
        handleToggleLike(card._id, userId, likeButton, likeCounter);
    }

    likeButton.addEventListener('click', handleLikeOnClick);

    return element;
};

export function handleDeleteCard(evt) {
    evt.preventDefault();
    return deleteCardOnServer(currentDeleteCard.id)
        .then(() => {
            currentDeleteCard.remove();
            closePopup(popupCardDelete);
            currentDeleteCard = null;
        })
        .catch(console.log);
}



