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
            console.log(err);
        })
}

// Handles the response
function handleRes(key) {
    setCookie(key);
}