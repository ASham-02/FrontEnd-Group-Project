const API_URL = "http://localhost:8080";
const userId = localStorage.getItem("userId"); 

const form = document.querySelector("#characterForm");

const nameInput = document.querySelector("#nameInput");
const ageInput = document.querySelector("#ageInput");
const heightInput = document.querySelector("#heightInput");
const weightInput = document.querySelector("#weightInput");
const artworkInput = document.querySelector("#artworkInput");

const elementSelect = document.querySelector("#elementSelect");
const classSelect = document.querySelector("#classSelect");

const loadElements = async () => {
  const response = await fetch("http://localhost:8080/api/elements");
  const elements = await response.json();

  elements.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.id;
    option.textContent = `${element.element} - ${element.nation}`;
    elementSelect.appendChild(option);
  });
};

const loadCharacterClasses = async () => {
  const response = await fetch("http://localhost:8080/api/characterClass");
  const characterClasses = await response.json();

  characterClasses.forEach((characterClass) => {
    const option = document.createElement("option");

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

  const response = await fetch(`${API_URL}/api/characters/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  });

  if (!response.ok) {
    console.error("Failed to create character");
    return;
  }

  const savedCharacter = await response.json();
  console.log("Saved character:", savedCharacter);

  // Later this can go to your card page
  // For now, redirect after saving:
  window.location.href = "cards.html";
};

loadElements();
loadCharacterClasses();

form.addEventListener("submit", createCharacter);


const getData = async () => {
    try {
        const res = await fetch(`http://localhost:8080/api/user/${userId}`) 
        if (!res.ok) {
            throw new Error(`Responce status: ${res.status}`);
        }
        const result = await res.json();
        console.log(result);
    } catch (error) {
      console.log(error);
      
    }
}

getData();