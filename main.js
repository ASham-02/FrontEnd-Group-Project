const API_URL = 'http://localhost:8080';
const USER_ID = localStorage.getItem('userId');

const form = document.querySelector('#characterForm');

const nameInput = document.querySelector('#nameInput');
const ageInput = document.querySelector('#ageInput');
const heightInput = document.querySelector('#heightInput');
const weightInput = document.querySelector('#weightInput');
const artworkInput = document.querySelector('#artworkInput');

const elementSelect = document.querySelector('#elementSelect');
const classSelect = document.querySelector('#classSelect');

const loadElements = async () => {
    const response = await fetch('http://localhost:8080/api/elements');
    const elements = await response.json();

    elements.forEach((element) => {
        const option = document.createElement('option');
        option.value = element.id;
        option.textContent = `${element.element} - ${element.nation}`;
        elementSelect.appendChild(option);
    });
};

const loadCharacterClasses = async () => {
    const response = await fetch('http://localhost:8080/api/characterClass');
    const characterClasses = await response.json();

    characterClasses.forEach((characterClass) => {
        const option = document.createElement('option');

        option.value = characterClass.id;
        option.textContent = characterClass.name;

        classSelect.appendChild(option);
    });
};

const createCharacter = async (event) => {
    event.preventDefault();

    const newCharacter = {
        name: nameInput.value,
        age: Number(ageInput.value),
        height: Number(heightInput.value),
        weight: Number(weightInput.value),
        artwork: artworkInput.value,

        element: {
            id: Number(elementSelect.value),
        },

        characterClass: {
            id: Number(classSelect.value),
        },
    };

    const response = await fetch(
        `http://localhost:8080/api/characters/${USER_ID}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCharacter),
        },
    );

    if (!response.ok) {
        console.error('Failed to create character');
        return;
    }

    const savedCharacter = await response.json();
    console.log('Saved character:', savedCharacter);

    // Later this can go to your card page
    // For now, redirect after saving:
    window.location.href = 'cards.html';
};
// logout btn
const logoutBtn = document
    .querySelector('#logoutBtn')
    .addEventListener('click', () => {
        window.location.href = 'index.html';
    });

loadElements();
loadCharacterClasses();

form.addEventListener('submit', createCharacter);

const getData = async () => {
    try {
        console.log(USER_ID);
        const res = await fetch(`http://localhost:8080/api/user/${USER_ID}`);
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }
        const result = await res.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// getData();

// backup cards
const fetchCharacters = async () => {
    try {
        console.log(USER_ID);
        const res = await fetch(`http://localhost:8080/api/user/${USER_ID}`);
        const data = await res.json();
        console.log(data);
        renderCharacters(data.characters);
    } catch (error) {
        console.error(error);
    }
};

const renderCharacters = (characters) => {
    const cardContainer = document.querySelector('#tempCardContainer');

    cardContainer.innerHTML = '';

    characters.forEach((character) => {
        const card = document.createElement('div');
        card.classList.add('temp-card');
        card.setAttribute('id', character.id);

        card.innerHTML = `
      <img
              width="100%"
              src="${character.artwork}"
              alt="${character.name}"
            />
            <div class="card-content">
              <h2>${character.name}</h2>
              <p><strong>Age:</strong> ${character.age}</p>
              <p><strong>Weight:</strong> ${character.weight}</p>
              <p><strong>Height:</strong> ${character.height}</p>
              <p><strong>Element:</strong> ${character.element.element}</p>
              <p><strong>Class:</strong> ${character.characterClass.name}</p>
            </div>
    `;

        cardContainer.appendChild(card);
        console.log(character.id);
        card.addEventListener('click', () => {
            console.log(character.id);
            window.sessionStorage.setItem('characterId', `${character.id}`);
            window.location.href = `character.html?id=${character.id}`;
        });
    });
};

fetchCharacters();
