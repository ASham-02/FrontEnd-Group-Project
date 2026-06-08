// Load classes from Spring Boot API
fetch("http://localhost:8080/api/classes")
  .then((response) => response.json())
  .then((data) => {
    const classSelect = document.getElementById("class");
    data.forEach((c) => {
      const option = document.createElement("option");
      option.value = c.id;
      option.textContent = c.className;
      classSelect.appendChild(option);
    });
  })
  .catch((error) => console.error("Could not load classes:", error));

// Load elements from Spring Boot API
fetch("http://localhost:8080/api/elements")
  .then((response) => response.json())
  .then((data) => {
    const elementSelect = document.getElementById("element");
    data.forEach((e) => {
      const option = document.createElement("option");
      option.value = e.id;
      option.textContent = e.elementName;
      elementSelect.appendChild(option);
    });
  })
  .catch((error) => console.error("Could not load elements:", error));

// Load stats from Spring Boot API
fetch("http://localhost:8080/api/stats")
  .then((response) => response.json())
  .then((data) => {
    window.statsData = data;
  })
  .catch((error) => console.error("Could not load stats:", error));

// When class is selected autofill stats
document.getElementById("class").addEventListener("change", function () {
  const selectedClassId = this.value;
  if (window.statsData && selectedClassId) {
    const stat = window.statsData.find(
      (s) => s.characterClassId == selectedClassId,
    );
    if (stat) {
      document.getElementById("strength").value = stat.strength;
      document.getElementById("agility").value = stat.agility;
      document.getElementById("intelligence").value = stat.intelligence;
      document.getElementById("charisma").value = stat.charisma;
      document.getElementById("endurance").value = stat.endurance;
    }
  }
});

// Validation function
function validate() {
  let valid = true;

  // Name
  const name = document.getElementById("name").value.trim();
  const nameError = document.getElementById("name-error");
  if (name.length < 2 || name.length > 100) {
    nameError.classList.add("show");
    document.getElementById("name").classList.add("invalid");
    valid = false;
  } else {
    nameError.classList.remove("show");
    document.getElementById("name").classList.remove("invalid");
  }

  // Age
  const age = document.getElementById("age").value.trim();
  const ageError = document.getElementById("age-error");
  if (age === "" || parseInt(age) < 1 || parseInt(age) > 999) {
    ageError.classList.add("show");
    document.getElementById("age").classList.add("invalid");
    valid = false;
  } else {
    ageError.classList.remove("show");
    document.getElementById("age").classList.remove("invalid");
  }

  // Height
  const height = document.getElementById("height").value.trim();
  const heightError = document.getElementById("height-error");
  if (height === "" || parseInt(height) < 1 || parseInt(height) > 300) {
    heightError.classList.add("show");
    document.getElementById("height").classList.add("invalid");
    valid = false;
  } else {
    heightError.classList.remove("show");
    document.getElementById("height").classList.remove("invalid");
  }

  // Weight
  const weight = document.getElementById("weight").value.trim();
  const weightError = document.getElementById("weight-error");
  if (weight === "" || parseInt(weight) < 1 || parseInt(weight) > 500) {
    weightError.classList.add("show");
    document.getElementById("weight").classList.add("invalid");
    valid = false;
  } else {
    weightError.classList.remove("show");
    document.getElementById("weight").classList.remove("invalid");
  }

  // Class
  const charClass = document.getElementById("class").value;
  const classError = document.getElementById("class-error");
  if (charClass === "") {
    classError.classList.add("show");
    document.getElementById("class").classList.add("invalid");
    valid = false;
  } else {
    classError.classList.remove("show");
    document.getElementById("class").classList.remove("invalid");
  }

  // Element
  const element = document.getElementById("element").value;
  const elementError = document.getElementById("element-error");
  if (element === "") {
    elementError.classList.add("show");
    document.getElementById("element").classList.add("invalid");
    valid = false;
  } else {
    elementError.classList.remove("show");
    document.getElementById("element").classList.remove("invalid");
  }

  return valid;
}

// Generate button — saves to Spring Boot and reveals card
document.getElementById("generate-btn").addEventListener("click", function () {
  if (validate()) {
    const character = {
      name: document.getElementById("name").value,
      age: parseInt(document.getElementById("age").value),
      height: parseInt(document.getElementById("height").value),
      weight: parseInt(document.getElementById("weight").value),
      artwork: document.getElementById("artwork").value,
      classId: parseInt(document.getElementById("class").value),
      elementId: parseInt(document.getElementById("element").value),
    };

    fetch("http://localhost:8080/api/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(character),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("card-name").textContent = data.name;
        document.getElementById("card-age").textContent = "Age: " + data.age;
        document.getElementById("card-height").textContent =
          "Height: " + data.height + " cm";
        document.getElementById("card-weight").textContent =
          "Weight: " + data.weight + " kg";
        document.getElementById("card-class").textContent =
          "Class: " +
          document.getElementById("class").options[
            document.getElementById("class").selectedIndex
          ].text;
        document.getElementById("card-element").textContent =
          "Element: " +
          document.getElementById("element").options[
            document.getElementById("element").selectedIndex
          ].text;

        const artwork = document.getElementById("artwork").value;
        if (artwork) {
          document.getElementById("card-artwork").src = artwork;
          document.getElementById("card-artwork").style.display = "block";
        } else {
          document.getElementById("card-artwork").style.display = "none";
        }

        document.getElementById("card-section").style.display = "block";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "Could not connect to the server. Make sure Spring Boot is running.",
        );
      });
  }
});

// Delete button — clears everything
document.getElementById("delete-btn").addEventListener("click", function () {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("class").value = "";
  document.getElementById("element").value = "";
  document.getElementById("artwork").value = "";
  document.getElementById("card-section").style.display = "none";

  document
    .querySelectorAll(".error-message")
    .forEach((e) => e.classList.remove("show"));
  document
    .querySelectorAll(".invalid")
    .forEach((e) => e.classList.remove("invalid"));
});
