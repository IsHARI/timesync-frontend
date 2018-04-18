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

            window.addEventListener('hashchange', function (e) {

                // Groups view
                if(/#groups/.test(e.newURL)) {

                    const groupsList = document.getElementById('groups-list');
                    const userGroupsPath = loggedInUser._links.userGroups.href;

                    // Clear the list
                    groupsList.childNodes.forEach(oldChild => groupsList.removeChild(oldChild));

                    // Update the list
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
                }

                // Group view
                if(/#group\?/.test(e.newURL)) {

               }
            });

        });
});