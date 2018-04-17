const serverUrl = 'http://localhost:8080';

// Load auth data
let loggedInJwt = localStorage.getItem('loggedInJwt');

let loggedInUsername = localStorage.getItem('loggedInUsername');

document.addEventListener('DOMContentLoaded', function () {

    // Nav username

    const navUsername = document.getElementById('nav-username');

    navUsername.innerText = loggedInUsername;

    // Get logged in user
    ajaxFetch(serverUrl + '/users/search/findByUsername?username=' + loggedInUsername, 'GET', '', loggedInJwt)
        .then(response => response.json())
        .then(loggedInUser => {

            // Groups view

            const userGroupsPath = loggedInUser._links.self.href;

            ajaxFetch(userGroupsPath, 'GET', '', loggedInJwt)
                .then(response => response.json())
                .then(userGroups => {
                    for (let key in userGroups) {
                        if (!key.startsWith('_')) {
                            console.log(key + " -> " + userGroups[key]);
                        }
                    }
                });

            const groups = document.getElementById('groups');
            const groupsList = document.getElementById('groups-list');

        });
});

function ajaxFetch(url, method, body, jwt) {
    let request = {
        'method': method,
        'headers': new Headers({
            'Authorization': jwt,
            'Content-Type': 'application/json'
        })
    };

    if (method === 'POST') {
        request.body = body;
    }

    return fetch(url, request);
}