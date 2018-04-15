document.addEventListener('DOMContentLoaded', function () {

    // Register view

    const registerUsername = document.getElementById('register-username');
    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    const registerRepeatPassword = document.getElementById('register-repeat-password');
    const registerSubmit = document.getElementById('register-submit');

    registerSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        if(registerPassword.value === registerRepeatPassword.value)
        {
            let user = JSON.stringify({
                'username': registerUsername.value,
                'email': registerEmail.value,
                'password': registerPassword.value
            });

            ajaxFetch('/users/sign-up', 'POST', user, '');
        } else {
            console.log("passwords don't match");
        }
    });

    // Login view

    const loginUsername = document.getElementById('login-username');
    const loginPassword = document.getElementById('login-password');
    const loginSubmit = document.getElementById('login-submit');

    loginSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        let creds = JSON.stringify({
            'username': loginUsername.value,
            'password': loginPassword.value
        });

        ajaxFetch('/login', 'POST', creds, '')
            .then(response => response.headers.get('Authorization'))
            .then(authJwt => {

            });
    });

});

function ajaxFetch(path, method, body, jwt) {
    return fetch('http://localhost:8080' + path, {
        'method': method,
        'body': body,
        'headers': new Headers({
            'Authorization': jwt,
            'Content-Type': 'application/json'
        })
    });
}