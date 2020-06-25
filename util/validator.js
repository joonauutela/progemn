const { CheckResultAndHandleErrors } = require("apollo-server")

module.exports.validateRegisterInput = (username, password, confirmPassword) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (password === '') {
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}