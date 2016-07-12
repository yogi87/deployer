// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function addDeployment() {
    // Cancel the form submit
    event.preventDefault();
    
    // Prep the data each field's contents
    var appId = document.getElementById('appId').value;
    var apiKey = document.getElementById('apiKey').value;
    var revision = document.getElementById('revision').value;
    var changelog = document.getElementById('changelog').value;
    var description = document.getElementById('description').value;
    var user = document.getElementById('user').value;

 // The URL to POST our data to
    var postUrl = 'https://api.newrelic.com/v2/applications/'+ appId + '/deployments.json';

    // Set up an asynchronous AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);


   var params = {
                       "deployment": {
                       "revision": revision,
                       "changelog": changelog,
                       "description": description,
                       "user": user
                     }
                   };

    // Set correct header for form data 
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('X-Api-Key', apiKey);

    // Handle request state change events
    xhr.onreadystatechange = function() { 
        // If the request completed
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';
            if (xhr.status == 201) {
                // If it was a success, close the popup after a short delay
                statusDisplay.innerHTML = 'Success...delpoyed!';
                window.setTimeout(window.close, 1000);
            } else {
                // Show what went wrong
                statusDisplay.innerHTML = 'Error deploying - ' + xhr.statusText;
            }
        }
    };

    // Send the request and set status
    params = JSON.stringify(params)
    xhr.send(params);
    statusDisplay.innerHTML = 'Depolying...';
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addDeployment function
    document.getElementById('add_deployment').addEventListener('submit', addDeployment);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {

    });
});