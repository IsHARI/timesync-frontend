document.addEventListener('DOMContentLoaded', function () {

    // Register view

    const registerUsername = document.getElementById('register-username');
    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    const registerRepeatPassword = document.getElementById('register-repeat-password');
    const registerSubmit = document.getElementById('register-submit');

    registerSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        if (registerPassword.value === registerRepeatPassword.value) {
            let user = JSON.stringify({
                'username': registerUsername.value,
                'email': registerEmail.value,
                'password': registerPassword.value
            });

            ajaxFetch(serverUrl+'/users/sign-up', 'POST', user, '');
            window.location.href='#login';
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

        ajaxFetch(serverUrl+'/login', 'POST', user, '')
            .then(response => response.headers.get('Authorization'))
            .then(loggedInJwt => {
                localStorage.setItem('loggedInUsername', loginUsername.value);
                localStorage.setItem('loggedInJwt', loggedInJwt);
                window.location.href='app.html#groups';
            });
    });
});