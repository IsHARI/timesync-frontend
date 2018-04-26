const serverUrl = 'http://localhost:8080';

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