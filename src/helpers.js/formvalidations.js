export function validateRegisterForm({ username, password }) {
    if (!username) {
        return { valid: false, message: "ENTER USERNAME" };
    }

    if (!password) {
        return { valid: false, message: "ENTER PASSWORD" };
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
        return { valid: false, message: "Password must be exactly 6 letters OR exactly 6 digits." };
    }

    return { valid: true };
}


export function validateLoginForm({ username, password }) {


    if (!username) {
        return { valid: false, message: "ENTER USERNAME" };
    }
    if (!password) {
        return { valid: false, message: "ENTER PASSWORD" };
    }
    if (password.length < 6) {
        return { valid: false, message: "Password must be at least 6 characters long." };
    }
    return { valid: true };
}


export function validatePollForm({ title, options, duration, visibility, allowedUsers }) {
    if (!title || !title.trim()) {
        return { valid: false, message: "Please enter poll title." };
    }
    const validOptions = Array.isArray(options) ? options.filter(opt => opt && opt.trim()) : [];
    if (validOptions.length < 2) {
        return { valid: false, message: "Please provide at least 2 options." };
    }
    if (!duration || isNaN(duration) || Number(duration) <= 0) {
        return { valid: false, message: "Please provide a valid poll duration." };
    }
    if (!visibility || (visibility !== "public" && visibility !== "private")) {
        return { valid: false, message: "Please select poll visibility." };
    }
    if (visibility === "private" && (!allowedUsers || allowedUsers.length === 0)) {
        return { valid: false, message: "Please select allowed users for private poll." };
    }
    return { valid: true };
}
