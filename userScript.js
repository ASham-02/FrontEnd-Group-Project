const loginBtn = document.querySelector('#loginBtn');
const registerBtn = document.querySelector('#registerBtn');
const logoutBtn = document.querySelector('#logoutBtn');
const registerContainer = document.querySelector('.register-container');
const loginContainer = document.querySelector('.login-container');
const dashboardContainer = document.querySelector('.dashboard-container');
const dashboardUsername = document.querySelector('.dashboard-username');
const registerForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
const loginMessage = document.querySelector('#loginMessage');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const loginUsernameInput = document.querySelector('#loginUsername');
const loginPasswordInput = document.querySelector('#loginPassword');
const successfulRegister = document.querySelector('#successfulRegister');
const usernameError = document.querySelector('#usernameError');
const loginUsernameError = document.querySelector('#loginUsernameError');
const loginPasswordError = document.querySelector('#loginPasswordError');
const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');

loginBtn.addEventListener('click', () => {
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
})

registerBtn.addEventListener('click', () => {
    registerContainer.style.display = 'block';
    loginContainer.style.display = 'none';
})

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameValue = usernameInput.value;
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    if (!registerValidateForm(usernameValue, emailValue, passwordValue)) {
        return;
    }

    successfulRegister.style.color = "green"
    successfulRegister.innerText = "You have successfully register. Now try logging in."
    
    console.log(`User successfully registered:
    {
        username: "${usernameValue}",
        email: "${emailValue}",
        password: "${passwordValue}"
        }`);

})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usernameValue = loginUsernameInput.value;
    const passwordValue = loginPasswordInput.value;

    // temporary value
    const username = "user123";
    const password = "123";

    if (!loginValidateForm(usernameValue, passwordValue, username, password)) {
        return;
    }


    console.log(`logged-in successfully :
    {
        username: "${usernameValue}",
        password: "${passwordValue}"
    }`);

    console.log('Successfully Logged In');
    loginContainer.style.display = 'none';
    dashboardContainer.style.display = 'block';
    dashboardUsername.innerText = usernameValue;
})

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    dashboardContainer.style.display = 'none';
    registerContainer.style.display = 'block';
})


const registerValidateForm = (usernameValue, emailValue, passwordValue) => {
    let isValid = true;

    if (usernameValue.trim() == "") {
        usernameError.innerText = "Username is required";
        isValid = false;
    } else if (usernameValue.length <= 1) {
        usernameError.innerText =
            "Username needs to be more than one character long";
        isValid = false;
    } else {
        usernameError.style.color = "green";
        usernameError.innerHTML = "Valid Username";
    }

    if (emailValue.trim() == "") {
        emailError.innerText = "Email is required";
        isValid = false;
    } else if (!validateEmail(emailValue)) {
        emailError.innerText = "Invalid email address";
        isValid = false;
    } else {
        emailError.style.color = "green";
        emailError.innerHTML = "Valid email address";
    }

    if (passwordValue.trim() == "") {
        passwordError.innerText = "Password is required";
        isValid = false;
    } else if (passwordValue.length < 3) {
        passwordError.innerText = "Password must be at least 3 characters";
        isValid = false;
    } else {
        passwordError.style.color = "green";
        passwordError.innerHTML = "Valid password";
    }

    return isValid;
};

const loginValidateForm = (
    usernameValue,
    passwordValue,
    username,
    password,
) => {
    isValid = true;

    if (usernameValue.trim() == "") {
        loginUsernameError.innerText = "Username required";
        isValid = false;
    } else if (passwordValue.trim() == "") {
        loginPasswordError.innerText = "Password required";
        isValid = false;
    } else if (username !== usernameValue && password !== passwordValue) {
        loginMessage.style.color = "red";
        loginMessage.innerText = "Username or Password is incorrect";
        isValid = false;
    } else {
        loginMessage.style.color = "green";
        loginMessage.innerText = "You have successfully logged in";
    }

    return isValid;
};

const validateEmail = (emailValue) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailValue);
};

const getData = async () => {
    //double check the URL as it is only grabbing from user with ID 1 currently
    const url = "http://localhost:8080/api/user/1";

    try {
        const res = await fetch(url) 
        
        if (!res.ok) {
            throw new Error(`Responce status: ${res.status}`);
        }
        const result = await res.json();
        console.log(result);
        console.log(result.username);
        console.log(result.password);
    } catch (error) {
        console.error(error.message);
    }
}

// getData()


