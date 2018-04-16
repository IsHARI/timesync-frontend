let JWT = null;
let loggedInUser = null;

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

        let user = JSON.stringify({
            'username': loginUsername.value,
            'password': loginPassword.value
        });

        ajaxFetch('/login', 'POST', user, '')
            .then(response => response.headers.get('Authorization'))
            .then(authJwt => {
                JWT = authJwt;

                ajaxFetch('/users/search/findByUsername?username='+loginUsername.value, 'GET', '', JWT)
                    .then(response => response.json())
                    .then(responseJson => loggedInUser = responseJson);
            });

    });

    // Groups view

    const groups =  document.getElementById('groups');
    const groupsList = document.getElementById('groups-list');

    // groups.addEventListener('ta')

});

function ajaxFetch(path, method, body, jwt) {
    let request = {
        'method': method,
        'headers': new Headers({
            'Authorization': jwt,
            'Content-Type': 'application/json'
        })
    };

    if(method === 'POST') {
        request.body = body;
    }

    return fetch('http://localhost:8080' + path, request);
}