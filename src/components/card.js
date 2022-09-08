//функции для работы с карточками проекта Mesto
import { switchLike } from "./api";
import { openPopup, closePopup, checkIfLiked, handleToggleLike } from "./utils";
import { popupCardDelete } from "./modal";
import { deleteCardOnServer, switchLike } from "./api";

export const popupImg = document.querySelector('#popup-image');
export let currentDeleteCard = null;

export function createCard(card, userId) {

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
   
    if (card.owner._id !== userId) {
        deleteCard.remove()
    } else {
        deleteCard.addEventListener('click', function (evt) {
            currentDeleteCard = element;
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

export const handleToggleLike = (id, userId, likeButton, likeCounter) => {
    console.log(userId)
    // узнаём лайкнута ли карточка изначально
    const isLiked = likeButton.classList.contains('tapes__button_active');

    switchLike(id, isLiked)
        .then(({ likes }) => {
            likeCounter.textContent = likes.length;
            console.log(`Liked? ${checkIfLiked(likes, userId)}!`);

            if (checkIfLiked(likes, userId)) {
                likeButton.classList.add('tapes__button_active');
            } else {
                likeButton.classList.remove('tapes__button_active');
            };
        })
        .catch(console.dir); // Выведем ошибку
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



