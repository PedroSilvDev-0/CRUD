function onChangeEmail() {
    const email = form.email().value
    form.emailRequiredError().style.display = email ? "none" : "block"

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block"
    
    toggleRegisterButtonsDisable()
}

function onChangePassword() {
    const password = form.password().value
    form.passwordRequiredError().style.display = password ? "none" : "block"

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block"

    validatePasswordsMatch()
    toggleRegisterButtonsDisable()
}

function onChangeConfirmPassword() {
    validatePasswordsMatch()
    toggleRegisterButtonsDisable()
}

function register() {
    showLoading()

    const email = form.email().value
    const password = form.password().value
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading() // esconder o componente de loading
        window.location.href = "home.html"
    }).catch(error => { // Se der error, vai capturar o error, esconder o loading e retornar o erro
        hideLoading()
        alert(getErrorMessage(error))
    })
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso."
    }
    return error.message
}

function validatePasswordsMatch() {
    const password = form.password().value
    const confirmPassword = form.confirmPassword().value

    form.confirmPasswordDoesnMatchError().style.display = password == confirmPassword ? "none" : "block"
}

function toggleRegisterButtonsDisable() {
    form.registerButton().disabled = !isFormValid()
}

function isFormValid() {
    const email = form.email().value
    if (!email || !validateEmail(email)) {
        return false
    }

    const password = form.password().value
    if (!password || password.length < 6) {
        return false
    }

    const confirmPassword = form.confirmPassword().value
    if (password != confirmPassword) {
        return false
    }

    return true
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesnMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
}