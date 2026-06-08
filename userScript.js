const loginBtn = document.querySelector('#loginBtn');
const registerBtn = document.querySelector('#registerBtn');
const logoutBtn = document.querySelector('#logoutBtn');
const registerContainer = document.querySelector('.register-container');
const loginContainer = document.querySelector('.login-container');
const dashboardContainer = document.querySelector('.dashboard-container');
const dashboardUsername = document.querySelector('.dashboard-username');
const registerForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
const logginMessage = document.querySelector('#logginMessage');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const logginUsernameInput = document.querySelector('#logginUsername');
const logginPasswordInput = document.querySelector('#logginPassword');
const successfulRegister = document.querySelector('#successfulRegister');
const usernameError = document.querySelector('#usernameError');
const logginUsernameError = document.querySelector('#logginUsernameError');
const logginPasswordError = document.querySelector('#logginPasswordError');
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
    const usernameVlaue = usernameInput.value;
    const emailVlaue = emailInput.value;
    const passwordVlaue = passwordInput.value;

    if (!registerValidateForm(usernameVlaue, emailVlaue, passwordVlaue)) {
        return
    }

    successfulRegister.style.color = "green"
    successfulRegister.innerText = "You have successfully register. Now try logging in."
    
    console.log(`User successfully registered:
    {
        username: "${usernameVlaue}",
        email: "${emailVlaue}",
        password: "${passwordVlaue}"
        }`
    );

})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usernameVlaue = logginUsernameInput.value;
    const passwordVlaue = logginPasswordInput.value;

    // temporary value
    const username = "user123";
    const password = "123";

    if (!loginValidateForm(usernameVlaue, passwordVlaue, username, password)) {
        return
    }


    console.log(`logged-in successfully :
    {
        username: "${usernameVlaue}",
        password: "${passwordVlaue}"
    }`
    );

    console.log('Successfully Logged In');
    loginContainer.style.display = 'none';
    dashboardContainer.style.display = 'block';
    dashboardUsername.innerText = usernameVlaue
})

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    dashboardContainer.style.display = 'none';
    registerContainer.style.display = 'block';
})


const registerValidateForm = (usernameVlaue, emailVlaue, passwordVlaue) => {
    let isValid = true;

    if (usernameVlaue.trim() == '') {
        usernameError.innerText = 'Username is required';
        isValid = false;
    } else if (usernameVlaue.length <= 1) {
        usernameError.innerText = 'Username needs to be more than one character long';
        isValid = false;
    } else {
        usernameError.style.color = 'green'
        usernameError.innerHTML = 'Valid Username'
    }

    if (emailVlaue.trim() == '') {
        emailError.innerText = 'Email is required';
        isValid = false;
    } else if (!validateEmail(emailVlaue)) {
        emailError.innerText = 'Invalid email address';
        isValid = false
    } else {
        emailError.style.color = 'green'
        emailError.innerHTML = 'Valid email address'
    }

    if (passwordVlaue.trim() == '') {
        passwordError.innerText = 'Password is required';
        isValid = false;
    } else if (passwordVlaue.length < 3) {
        passwordError.innerText = 'Password must be at least 3 characters';
        isValid = false
    } else {
        passwordError.style.color = 'green'
        passwordError.innerHTML = 'Valid password'
    }

    return isValid
}

const loginValidateForm = (usernameVlaue, passwordVlaue, username, password) => {
    isValid = true;
    
    if (usernameVlaue.trim() == '') {
        logginUsernameError.innerText = "Username required"
        isValid = false
    } else if (passwordVlaue.trim() == '') {
        logginPasswordError.innerText = "Password required"
        isValid = false
    } else if (username !== usernameVlaue && password !== passwordVlaue) {
        logginMessage.style.color = 'red'
        logginMessage.innerText = "Username or Password is incorrect"
        isValid = false
    } else {
        logginMessage.style.color = 'green'
        logginMessage.innerText = "You have successfully logged in"
    }

    return isValid
}

const validateEmail = (emailVlaue) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailVlaue)
}

const getData = async () => {
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


