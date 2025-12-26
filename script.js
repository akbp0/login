// Form validation and interaction
const form = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const usernameError = document.getElementById('usernameError');

const strengthReq = document.getElementById('strengthReq');
const nameReq = document.getElementById('nameReq');
const lengthReq = document.getElementById('lengthReq');
const symbolReq = document.getElementById('symbolReq');

// Tab switching
const signupTab = document.getElementById('signupTab');
const signinTab = document.getElementById('signinTab');

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    signinTab.classList.remove('active');
});

signinTab.addEventListener('click', () => {
    signinTab.classList.add('active');
    signupTab.classList.remove('active');
});

// Password validation
passwordInput.addEventListener('input', validatePassword);

function validatePassword() {
    const password = passwordInput.value;
    const username = usernameInput.value.toLowerCase();
    const fullname = fullnameInput.value.toLowerCase();
    const email = emailInput.value.toLowerCase();

    // Length requirement
    if (password.length >= 8) {
        lengthReq.classList.add('valid');
        lengthReq.classList.remove('invalid');
    } else {
        lengthReq.classList.remove('valid');
        lengthReq.classList.add('invalid');
    }

    // Symbol or number requirement
    const hasSymbolOrNumber = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
    if (hasSymbolOrNumber) {
        symbolReq.classList.add('valid');
        symbolReq.classList.remove('invalid');
    } else {
        symbolReq.classList.remove('valid');
        symbolReq.classList.add('invalid');
    }

    // Name/email requirement
    const passwordLower = password.toLowerCase();
    const containsName = (username && passwordLower.includes(username)) || 
                        (fullname && passwordLower.includes(fullname)) ||
                        (email && passwordLower.includes(email.split('@')[0]));

    if (!containsName && password.length > 0) {
        nameReq.classList.add('valid');
        nameReq.classList.remove('invalid');
    } else if (password.length > 0) {
        nameReq.classList.remove('valid');
        nameReq.classList.add('invalid');
    }

    // Password strength
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const strengthText = strengthReq.querySelector('.req-text');
    if (password.length === 0) {
        strengthText.textContent = 'Password Strength : Weak';
        strengthReq.classList.remove('valid', 'invalid');
    } else if (strength <= 2) {
        strengthText.textContent = 'Password Strength : Weak';
        strengthReq.classList.add('invalid');
        strengthReq.classList.remove('valid');
    } else if (strength <= 4) {
        strengthText.textContent = 'Password Strength : Medium';
        strengthReq.classList.add('valid');
        strengthReq.classList.remove('invalid');
    } else {
        strengthText.textContent = 'Password Strength : Strong';
        strengthReq.classList.add('valid');
        strengthReq.classList.remove('invalid');
    }
}

// Username validation
usernameInput.addEventListener('blur', validateUsername);

function validateUsername() {
    const username = usernameInput.value;

    if (username.length < 3 || username.length > 15) {
        usernameInput.classList.add('error');
        usernameError.textContent = 'Username must be between 3 and 15 characters';
        usernameError.classList.add('show');
        return false;
    } else {
        usernameInput.classList.remove('error');
        usernameError.classList.remove('show');
        return true;
    }
}

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const isUsernameValid = validateUsername();
    const isPasswordValid = 
        lengthReq.classList.contains('valid') &&
        symbolReq.classList.contains('valid') &&
        nameReq.classList.contains('valid');

    if (isUsernameValid && isPasswordValid && 
        fullnameInput.value && emailInput.value) {

        // Show success message
        submitBtn.classList.add('submitted');
        successMessage.classList.add('show');

        // Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            successMessage.classList.remove('show');
            submitBtn.classList.remove('submitted');

            // Reset all validation states
            document.querySelectorAll('.requirement').forEach(req => {
                req.classList.remove('valid', 'invalid');
            });
        }, 3000);
    }
});

// Real-time validation trigger for name/email fields
usernameInput.addEventListener('input', validatePassword);
fullnameInput.addEventListener('input', validatePassword);
emailInput.addEventListener('input', validatePassword);