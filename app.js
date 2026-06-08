//global variable to save array of classes
let allClasses = [];

//Asks backend for all classes
//
async function charClass() {
  const characterClasses = document.querySelector("#pokeClass");
  const url = "http://localhost:8080/api/characterClass";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    //save whole array
    allClasses = result;
    //loops through each class and creates an option element for the dropdown
    result.forEach((classItem) => {
      const option = document.createElement("option");
      option.value = classItem.id;
      option.textContent = classItem.name;
      characterClasses.appendChild(option);
    });

    updateStats();
  } catch (error) {
    console.error(error.message);
  }
}
document.querySelector("#pokeClass").addEventListener("change", updateStats);
//finds the id selected, searches all classes for that id and
//takes stats obj from that class to turn into html to display on the page
function updateStats() {
  const selectedId = parseInt(document.querySelector("#pokeClass").value);
  const selectedClass = allClasses.find((c) => c.id === selectedId);
  const container = document.querySelector("#statsContainer");
  //If a class has no stats linked to it
  if (!selectedClass || !selectedClass.stats) {
    container.innerHTML = "<p>No stats available</p>";
    return;
  }
  //Create list of stats for the table to populate based on class
  const stats = selectedClass.stats;
  container.innerHTML = `
    <h3>${selectedClass.name} Stats</h3>
    <ul>
      <li>Strength: ${stats.strength}</li>
      <li>Dexterity: ${stats.dexterity}</li>
      <li>Intelligence: ${stats.intelligence}</li>
      <li>Constitution: ${stats.constitution}</li>
      <li>Wisdom: ${stats.wisdom}</li>
      <li>Charisma: ${stats.charisma}</li>
    </ul>
  `;
}

//AGE
//queryselector to grab the value and input
const ageValue = document.querySelector("#ageValue");
const ageInput = document.querySelector("#pokeAge");
//Link the textual output to the current state of slider
ageValue.textContent = ageInput.value;
//Create event listener for the slider

ageInput.addEventListener("input", (event) => {
  ageValue.textContent = event.target.value;
});

//Height
//queryselector to grab the value and input
const heightValue = document.querySelector("#heightValue");
const heightInput = document.querySelector("#pokeHeight");
//Link the textual output to the current state of slider
heightValue.textContent = heightInput.value;
//Create event listener for the slider

heightInput.addEventListener("input", (event) => {
  heightValue.textContent = event.target.value;
});

//Weight
//queryselector to grab the value and input
const weightValue = document.querySelector("#weightValue");
const weightInput = document.querySelector("#pokeWeight");
//Link the textual output to the current state of slider
weightValue.textContent = weightInput.value;
//Create event listener for the slider

weightInput.addEventListener("input", (event) => {
  weightValue.textContent = event.target.value;
});

charClass();
