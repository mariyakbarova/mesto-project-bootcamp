const button = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const container = document.querySelector('.tape')

const tapeTemplate = document.querySelector('#tape').content

function createTape(name, src) {
    const tapeElement = tapeTemplate.querySelector('.tape__elements')
    const element = tapeElement.cloneNode(true)
    const tapeImg = element.querySelector('.tape__photo');
    const tapeTitle = element.querySelector('.tape__photo-name'); 

    tapeImg.src = src;
    tapeImg.alt = name;
    tapeTitle.innerHTML = name;

    element.querySelector('.tape__photo').addEventListener('click', function(evt) {
        popupImg.querySelector('img').src = evt.target.src;
        popupImg.querySelector('.popup__img-name').textContent = evt.target.alt;
        openPopup(popupImg)
    });

    return element;
}

const popupAbout = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupImg = document.querySelector('#popup-image');


function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closedPopup(popup) {
    popup.classList.remove('popup_opened')
}


function initPopup(element) {
    const popupContent = element.querySelector('.popup__content')
    const closeBtn = element.querySelector('.popup__exit')

    closeBtn.addEventListener('click', (e) => {
        closedPopup(element)
        popupContent.reset()
    })

    // popupContent.addEventListener('click', (e) => {
    //     e.stopPropagation()
    // })

    // element.addEventListener('click', () => {
    //     closedPopup(element)
    //     popupContent.reset()
    // })
}

initPopup(popupAbout)
initPopup(popupAdd)
initPopup(popupImg)

button.addEventListener('click', function () {
    openPopup(popupAbout);
})

const buttonAdd = document.querySelector('.profile__add-button');

buttonAdd.addEventListener('click', function () {
    openPopup(popupAdd);
});

const nameInput = document.querySelector('#name');
const professionInput = document.querySelector('#profession');

function formSubmitHandler (e) {
    e.preventDefault();

    const newName = popupAbout.querySelector('#name').value;
    const newJob = popupAbout.querySelector('#profession').value;

    const beforName = document.querySelector('.popup__form-name');
    const beforJob = document.querySelector('.popup__form-profession');

    beforName.textContent = newName;
    beforJob.textContent = newJob;

    const profileName = document.querySelector('.profile__name');
    profileName.innerHTML = newName;

    const profileJob = document.querySelector('.profile__profession');
    profileJob.innerHTML = newJob;

    closedPopup(popupAbout);
}

popupAbout.addEventListener('submit', formSubmitHandler);

popupAdd.addEventListener('submit', e => {
    e.preventDefault()
    const name = popupAdd.querySelector('#title').value;
    const src = popupAdd.querySelector('#picture').value;

    const newCard = createTape(name, src)
    container.insertAdjacentElement('afterbegin', newCard)

    



    closedPopup(popupAdd)
})

//--------------

container.addEventListener('click', function(e) {
    if (e.target.className  === 'tape__delete') {
        const listItem = e.target.closest('.tape__elements')
        listItem.remove()
    }

    if (e.target.classList.contains('tape__button')) {
        e.target.classList.toggle('tape__button_active')
    }
})


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const openImg = document.querySelectorAll('.tape__photo');

initialCards.forEach((card) => {
    const tape = createTape(card.name, card.link)
    container.insertAdjacentElement('beforeend', tape)


})



// openImg.forEach(function (image){
//     image.addEventListener('click', function(evt) {
//         popupImg.querySelector('img').src = evt.target.src;
//         popupImg.querySelector('.popup__img-name').textContent = evt.target.alt;
//         openPopup(popupImg)
//     });
// });



// openImg.forEach(function (image){
//     image.addEventListener('click', function(evt) {
//         popupImg.querySelector('img').src = evt.target.src;
//         popupImg.querySelector('.popup__img-name').textContent = evt.target.alt;
//         openPopup(popupImg)
//     });
// });
