
//Query Selectors and Variables
const characterName = document.querySelector("#character_name");
const characterImage = document.querySelector("#character_artwork");
const characterAge = document.querySelector("#character_age");
const characterHeight = document.querySelector("#character_height");
const characterWeight = document.querySelector("#character_weight");
const characterClass = document.querySelector("#character_class");
const characterElement = document.querySelector("#character_element");

const characterStrength = document.querySelector("#character_stats-strength");
const characterDexterity = document.querySelector("#character_stats-dexterity");
const characterIntelligence = document.querySelector(
    "#character_stats-intelligence",
);
const characterConstitution = document.querySelector(
    "#character_stats-constitution",
);
const characterWisdom = document.querySelector("#character_stats-wisdom");
const characterCharisma = document.querySelector("#character_stats-charisma");

// NEED TO FIND A WAY TO GRAB CHARACTER ID OF NEW CHARACTER
const characterID = window.location.search.id;

async function getCharacter() {
    try {
        const res = await fetch(`http://localhost:8080/api/characters/${characterID}`);
        if (!res.ok) { throw new Error(`Response Status: ${response.status}`)}
        const data = await res.json();
        console.log(data);
        makeCharacter(data);
    } catch (error){
        console.error(error.message);
    }
}



const makeCharacter = (character) => {
    characterName.innerHTML = character.name;
    characterImage.src = `${character.url}`;
    characterAge.innerHTML = character.age;
    characterHeight.innerHTML = character.height + "cm";
    characterWeight.innerHTML = character.weight + "kg";
    characterClass.innerHTML = character.characterClass;
    characterElement.innerHTML = character.Element;

    characterStrength.innerHTML = "Strength: " + 9;
    characterDexterity.innerHTML = "Dexterity: " + 8;
    characterIntelligence.innerHTML = "Intelligence: " + 1;
    characterConstitution.innerHTML = "Constitution: " + 1;
    characterWisdom.innerHTML = "Wisdom: " + 5;
    characterCharisma.innerHTML = "Charisma: " + 6;
};

getCharacter();
