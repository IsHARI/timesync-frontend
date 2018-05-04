document.addEventListener('DOMContentLoaded', function () {

    // Register view

    const registerUsername = document.getElementById('register-username');
    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    const registerRepeatPassword = document.getElementById('register-repeat-password');
    const registerSubmit = document.getElementById('register-submit');
    const registerWarningMatch = document.getElementById('register-warning-match');

    registerSubmit.addEventListener('click', function (e) {

        e.preventDefault();
        if (registerPassword.value === registerRepeatPassword.value) {

            let user = JSON.stringify({
                'username': registerUsername.value,
                'email': registerEmail.value,
                'password': registerPassword.value
            });
            ajaxFetch(serverUrl + '/users/sign-up', 'POST', user, '');
            window.location.href = '#login';
        } else {
            registerPassword.value = '';

            registerRepeatPassword.value = '';
            registerWarningMatch.classList.remove('hidden');
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

        ajaxFetch(serverUrl + '/login', 'POST', user, '')
            .then(response => response.headers.get('Authorization'))
            .then(loggedInJwt => {
                if (/Bearer .+/.test(loggedInJwt)) {
                    localStorage.setItem('loggedInUsername', loginUsername.value);
                    localStorage.setItem('loggedInJwt', loggedInJwt);
                    window.location.href = 'app.html#groups';
                } else {
                    document.getElementById('login-warning-wrong').classList.remove('hidden');
                    loginPassword.value = '';
                }
            });
    });
});