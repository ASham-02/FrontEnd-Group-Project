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

const exampleFunction = () => {
    characterName.innerHTML = "Conan";
    characterImage.src =
        "https://www.filmlinc.org/cdn-cgi/image/width=1200%2Cformat=auto%2Cquality=85/https://wp.filmlinc.org/wp-content/uploads/2019/07/MakeMyDay_Conan_01-1.jpg";
    characterAge.innerHTML = 94;
    characterHeight.innerHTML = 188 + "cm";
    characterWeight.innerHTML = 97 + "cm";
    characterClass.innerHTML = "Barbarian";
    characterElement.innerHTML = "Fire";

    characterStrength.innerHTML = "Strength: " + 9;
    characterDexterity.innerHTML = "Dexterity: " + 8;
    characterIntelligence.innerHTML = "Intelligence: " + 1;
    characterConstitution.innerHTML = "Constitution: " + 1;
    characterWisdom.innerHTML = "Wisdom: " + 5;
    characterCharisma.innerHTML = "Charisma: " + 6;
};

exampleFunction();
