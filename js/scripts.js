function ExtractUserData(event) {
    const isValid = ValidateForm(event);

    if (isValid === false)
        return;

    const form = document.getElementById('myForm');

    const username = form.elements['username'].value;
    const password = form.elements['password'].value;
    const email = form.elements['email'].value;
    const phone = form.elements['tel'].value;
    const rememberMe = form.elements['rememberMe'].checked;
    const gender = form.elements['gender'].value;
    const country = form.elements['country'].value;

    if (rememberMe === false)
        return;

    SaveUserData(username, password, email, phone, gender, country);

}

function ViewUserData(event) {
    event.preventDefault();

    const form = document.getElementById('myForm');

    const username = form.elements['username'].value;
    const password = form.elements['password'].value;
    const email = form.elements['email'].value;
    const phone = form.elements['tel'].value;
    const rememberMe = form.elements['rememberMe'].checked;
    const gender = form.elements['gender'].value;
    const country = form.elements['country'].value;

    const userData = "Имя: " + username +
        "\nПароль: " + password +
        "\nПочта: " + email +
        "\nНомер телефона: " + phone +
        "\nПол: " + gender +
        "\nСтрана: " + country +
        "\nЗапомнить меня: " + rememberMe;

    alert(userData);
}

function SaveUserData(username, password, email, phone, gender, country) {
    document.cookie = `username=${username};`
    document.cookie = `password=${password};`
    document.cookie = `email=${email};`
    document.cookie = `phone=${phone};`
    document.cookie = `gender=${gender};`
    document.cookie = `country=${country};`

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('gender', gender);
    localStorage.setItem('country', country);

    const userObject = {
        "username": username,
        "password": password,
        "email": email,
        "phone": phone,
        "gender": gender,
        "country": country,
    };

    const userJson = JSON.stringify(userObject);
    console.log(userJson);
}

function ValidateForm(event) {
    event.preventDefault();
    if (ValidPass() && ValidMail() && ValidPhone()) {
        alert("Все данные корректны");
        return true;
    }
    return false;

}

function ValidPass() {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    var password = document.getElementById("password").value;
    var valid = re.test(password);

    if (valid == false)
        alert("Пароль введен не правильно! Пароль должен содержать хотя бы одну цифру, одну заглавную и одну строчную букву и быть длиной от 6 до 20 символов");

    return valid;
}

function ValidMail() {
    var re = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    var myMail = document.getElementById("email").value;
    var valid = re.test(myMail);

    if (valid == false)
        alert('Введен не корректный email');

    return valid;
}

function ValidPhone() {
    var re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
    var myPhone = document.getElementById("tel").value;
    var valid = re.test(myPhone);

    if (myPhone.length < 7)
        valid = false;

    if (valid == false)
        alert('Номер телефона введен не правильно!');

    return valid;
}