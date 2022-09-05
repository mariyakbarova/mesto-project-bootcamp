//функции для работы с карточками проекта Mesto
import { openPopup } from "./utils";
// import { getInitialCards } from "./api";

export const popupImg = document.querySelector('#popup-image');

export function createTape(card) {

    const tapeTemplate = document.querySelector('#tapes').content;
    const tapeElement = tapeTemplate.querySelector('.tapes__elements')
    const element = tapeElement.cloneNode(true)
    const tapeImg = element.querySelector('.tapes__photo');
    const tapeTitle = element.querySelector('.tapes__photo-name'); 

    tapeImg.src = card.link;
    tapeImg.alt = card.name;
    tapeTitle.textContent = card.name;
    element.id = card._id;


    tapeImg.addEventListener('click', function(evt) {
        popupImg.querySelector('.popup__img').src = evt.target.src;
        popupImg.querySelector('.popup__img-name').textContent = evt.target.alt;
        openPopup(popupImg)
    });

    return element;
};

