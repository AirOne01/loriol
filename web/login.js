// On form submit
function onSubmit() {
    const password = document.getElementById('pwd').value;
    const remember = document.getElementById('remember').checked;
    if (hasCookie()) {
        alert(getCookie());
    } else {
        request(password);
    }
}

// On focus or password change > blanks the "bad password" text
function removeError() {
    document.getElementById('badResText').innerHTML = '';
}

// Checks for the cookie
function hasCookie() {
    return document.cookie.includes('key=');
}

// Sets the cookie
function setCookie(key) {
    document.cookie = 'key=' + key;
}

// Gets the cookie
function getCookie() {
    return document.cookie.replace('key=', '');
}

// Requests for a key with a password
function request(pwd) {
    const url = window.location.origin + '/password';
    axios.post(url, {"password": pwd})
        .then(res => {
            handleRes(res['data']['key']);  // Gets the key and sends it to handleRes()
        })
        .catch(err => {
            if (err.response.status === 401) {
                document.getElementById('badResText').innerHTML = 'Mot de passe incorrect';
            } else {
                document.getElementById('badResText').innerHTML = `Erreur ${err.response.status}. Voir la console du navigateur pour plus de détails`;
                console.log(err);
            }
        })
}

// Handles the response
function handleRes(key) {
    setCookie(key);
    window.location.href = '/';
}