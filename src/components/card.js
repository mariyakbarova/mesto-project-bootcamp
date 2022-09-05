//функции для работы с карточками проекта Mesto
import { openPopup } from "./utils";
import { changeCardTape } from "./api";
// import { getInitialCards } from "./api";

export const popupImg = document.querySelector('#popup-image');
export const tapeTemplate = document.querySelector('#tapes').content;

export const tapeElement = tapeTemplate.querySelector('.tapes__elements')
export const tapeImg = tapeElement.querySelector('.tapes__photo');
export const tapeTitle = tapeElement.querySelector('.tapes__photo-name'); 

export function createTape(name, src) {
    const element = tapeElement.cloneNode(true)

    // tapeImg.src = src;
    // tapeImg.alt = name;
    // tapeTitle.textContent = name;

changeCardTape( tapeImg.src, tapeElement.value)
.then( (data) => {
    tapeImg.src = data.link;
    tapeImg.alt = data.name;
    tapeTitle.textContent = data.neme
})
.catch(console.log)
.finally(() => {
    console.log('Карты отправлены');
    });

    tapeImg.addEventListener('click', function(evt) {
        popupImg.querySelector('.popup__img').src = evt.target.src;
        popupImg.querySelector('.popup__img-name').textContent = evt.target.alt;
        openPopup(popupImg)
    });

    return element;
};

