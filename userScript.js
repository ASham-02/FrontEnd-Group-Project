const registerContainer = document.querySelector('.register-container');
const loginContainer = document.querySelector('.login-container');
const dashboardContainer = document.querySelector('.dashboard-container');

const loginBtn = document
    .querySelector('#loginBtn')
    .addEventListener('click', () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

const registerBtn = document
    .querySelector('#registerBtn')
    .addEventListener('click', () => {
        registerContainer.style.display = 'block';
        loginContainer.style.display = 'none';
    });

const registerForm = document
    .querySelector('#registerForm')
    .addEventListener('submit', async (e) => {
        e.preventDefault();
        const usernameInput = document.querySelector('#username');
        const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#password');
        const successfulRegister = document.querySelector(
            '#successfulRegister',
        );

        const usernameVlaue = usernameInput.value;
        const emailVlaue = emailInput.value;
        const passwordVlaue = passwordInput.value;

        if (!registerValidateForm(usernameVlaue, emailVlaue, passwordVlaue)) {
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameVlaue,
                    email: emailVlaue,
                    password: passwordVlaue,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                successfulRegister.style.color = 'green';
                successfulRegister.innerText =
                    'You have successfully register. Now try logging in.';
                console.log(data);
            } else {
                successfulRegister.style.color = 'red';
                successfulRegister.innerText = 'Registeration Failed';

                console.log(data.message);
            }
        } catch (error) {
            console.error(error);
            successfulRegister.style.color = 'red';
            successfulRegister.innerText =
                'An error occurred while registering.';
        }
    });

const loginForm = document
    .querySelector('#loginForm')
    .addEventListener('submit', async (e) => {
        e.preventDefault();

        const logginUsernameInput = document.querySelector('#logginUsername');
        const logginPasswordInput = document.querySelector('#logginPassword');
        const dashboardUsername = document.querySelector('.dashboard-username');
        const logginUsernameError = document.querySelector(
            '#logginUsernameError',
        );
        const logginPasswordError = document.querySelector(
            '#logginPasswordError',
        );
        const logginMessage = document.querySelector('#logginMessage');
        const usernameVlaue = logginUsernameInput.value;
        const passwordVlaue = logginPasswordInput.value;

        if (usernameVlaue.trim() == '') {
            logginUsernameError.innerText = 'Username required';
            return;
        } else if (passwordVlaue.trim() == '') {
            logginPasswordError.innerText = 'Password required';
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameVlaue,
                    password: passwordVlaue,
                    // userId: 
                }),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                console.log(data);
                logginMessage.style.color = 'green';
                logginMessage.innerText = `${data.message}`;

                localStorage.setItem("userId", data.userID);

                window.location.href = 'character-creator.html'


            } else {
                logginMessage.style.color = 'red';
                logginMessage.innerText = `${data.message}`;
            }
        } catch (error) {
            console.error(error);
            alert('Server error');
        }
    });


const registerValidateForm = (usernameValue, emailValue, passwordValue) => {
    let isValid = true;
    const usernameError = document.querySelector('#usernameError');
    const emailError = document.querySelector('#emailError');
    const passwordError = document.querySelector('#passwordError');

    if (usernameValue.trim() == '') {
        usernameError.innerText = 'Username is required';
        isValid = false;
    } else if (usernameValue.length <= 1) {
        usernameError.innerText =
            'Username needs to be more than one character long';
        isValid = false;
    } else {
        usernameError.style.color = 'green';
        usernameError.innerHTML = 'Valid Username';
    }

    if (emailValue.trim() == '') {
        emailError.innerText = 'Email is required';
        isValid = false;
    } else if (!validateEmail(emailValue)) {
        emailError.innerText = 'Invalid email address';
        isValid = false;
    } else {
        emailError.style.color = 'green';
        emailError.innerHTML = 'Valid email address';
    }

    if (passwordValue.trim() == '') {
        passwordError.innerText = 'Password is required';
        isValid = false;
    } else if (passwordValue.length < 3) {
        passwordError.innerText = 'Password must be at least 3 characters';
        isValid = false;
    } else {
        passwordError.style.color = 'green';
        passwordError.innerHTML = 'Valid password';
    }

    const validateEmail = (emailVlaue) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(emailVlaue);
    };
};
