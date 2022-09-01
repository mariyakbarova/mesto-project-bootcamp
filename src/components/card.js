//функции для работы с карточками проекта Mesto
import { openPopup } from "./utils";
// import { getInitialCards } from "./api";

export const popupImg = document.querySelector('#popup-image');
export const tapeTemplate = document.querySelector('#tapes').content;

export function createTape(name, src) {

    const tapeElement = tapeTemplate.querySelector('.tapes__elements')
    const element = tapeElement.cloneNode(true)
    const tapeImg = element.querySelector('.tapes__photo');
    const tapeTitle = element.querySelector('.tapes__photo-name'); 

    tapeImg.src = src;
    tapeImg.alt = name;
    tapeTitle.textContent = name;


    tapeImg.addEventListener('click', function(evt) {
        popupImg.querySelector('.popup__img').src = evt.target.src;
        popupImg.querySelector('.popup__img-name').textContent = evt.target.alt;
        openPopup(popupImg)
    });

    return element;
};

