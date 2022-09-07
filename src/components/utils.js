//утилитарные функции, которые используются в работе сразу нескольких других функций
import { handleEscPressed } from "./modal";
import { deleteCardOnServer, switchLike } from "./api";
import { container } from ".";

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
}

// export const checkIdOwnerOnCard = (userId, cardId) => userId.some((item) => item._id === cardId)

export const handleDeleteCard = ( cardElement ) => {
    // if (card.owner._id !== userId) {
    //     deleteButton.classList.remove('tapes__delete')
    // }
    deleteCardOnServer(cardElement.id)
    .then (() => {
        cardElement.remove()
    })
    .catch (console.log);


}



