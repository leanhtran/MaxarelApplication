export function checkEmpty(stringStr) {
    return (stringStr == null || stringStr.trim() === "")
}

export function checkEmailValidate(email) {
    let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(email.trim());
}