//утилитарные функции, которые используются в работе сразу нескольких других функций

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
    const profileSubmitButton = popup.querySelector('.popup__save');
    if (isLoading) {
        profileSubmitButton.textContent = 'Сохранение...'
        profileSubmitButton.disabled = true;
    } else {
        profileSubmitButton.textContent = 'Сохранить'
        profileSubmitButton.disabled = false;
    }
}

export const checkIfLiked = (likes, userId) => likes.some((item) => item._id === userId);





