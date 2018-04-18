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

            const groups = document.getElementById('groups');
            const groupsList = document.getElementById('groups-list');
            const userGroupsPath = loggedInUser._links.userGroups.href;

            ajaxFetch(userGroupsPath, 'GET', '', loggedInJwt)
                .then(response => response.json())
                .then(userGroups => {
                    userGroups._embedded.userGroups.forEach(userGroup => {
                        newLi = document.createElement('LI');
                        newA = document.createElement('A');
                        newA.innerText = userGroup.name;

                        groupHref = userGroup._links.self.href;
                        groupId = groupHref.substr(groupHref.search(/\d+$/));
                        newA.setAttribute('href', '#group?id='+groupId);

                        newLi.appendChild(newA);
                        groupsList.appendChild(newLi);
                    })
                });

        });
});