document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    const registerErrorMessage = document.getElementById('registerErrorMessage');

    // Array to store registered users
    let users = [];

    // Switch to Login Form
    loginBtn.addEventListener('click', function () {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
        clearMessages();
    });

    // Switch to Registration Form
    registerBtn.addEventListener('click', function () {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
        clearMessages();
    });

    // Clear error messages
    function clearMessages() {
        loginErrorMessage.textContent = '';
        registerErrorMessage.textContent = '';
    }

    // Registration Form Validation
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearMessages();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const mobile = document.getElementById('registerMobile').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (name.trim() === '') {
            registerErrorMessage.textContent = 'Name is required!';
            return;
        }

        if (password !== confirmPassword) {
            registerErrorMessage.textContent = 'Passwords do not match!';
            return;
        }

        if (!validateEmail(email)) {
            registerErrorMessage.textContent = 'Invalid email format!';
            return;
        }

        if (!validateMobile(mobile)) {
            registerErrorMessage.textContent = 'Mobile number should be 10 digits!';
            return;
        }

        // Check if the email or mobile number already exists in the users array
        const userExists = users.some(user => user.email === email || user.mobile === mobile);
        if (userExists) {
            registerErrorMessage.textContent = 'User with this email or mobile number already exists!';
            return;
        }

        // Add the new user to the users array
        const newUser = {
            name: name,
            email: email,
            mobile: mobile,
            password: password
        };
        users.push(newUser);

        alert('Registration successful!');
        console.log(users); // Display the users array in the console for debugging
        // Optionally, switch to the login form after registration
        loginBtn.click();
    });

    // Login Form Validation
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearMessages();
        
        const emailOrMobile = document.getElementById('loginEmailOrMobile').value;
        const password = document.getElementById('loginPassword').value;

        if (!emailOrMobile || !password) {
            loginErrorMessage.textContent = 'Please fill in all fields!';
            return;
        }

        // Check if the user exists in the users array
        const user = users.find(user => (user.email === emailOrMobile || user.mobile === emailOrMobile) && user.password === password);

        if (!user) {
            loginErrorMessage.textContent = 'Invalid email/mobile number or password!';
            return;
        }

        alert('Login successful!');
        console.log(`Logged in as: ${user.name}`); // Log the name of the logged-in user for debugging

        
        window.location.href = 'home.html'; // Replace 'home.html' with your actual home page URL
    });

    // Email Validation
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Mobile Validation
    function validateMobile(mobile) {
        const mobilePattern = /^\d{10}$/;
        return mobilePattern.test(mobile);
    }
});
