let token;


// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const form = document.getElementById("signinForm");
    const formData = new FormData(form);

    // Create AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:4304/auth/login"); // Replace with your URL
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Handle response
    xhr.onload = function () {
        if (xhr.status === 201 || 200) {
            const response = xhr.responseText;
            token = JSON.parse(response).accessToken;
            id = JSON.parse(response).id;
            console.log(response);
            document.cookie = `jwt=${id}`
        }
    };

    // Send form data
    xhr.send(new URLSearchParams(formData));
}



// Attach submit event listener to the form
const form = document.getElementById("signinForm");
form.addEventListener("submit", submitForm);