document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;
    
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const errorFirstName = document.getElementById('error-first-name');
    const errorLastName = document.getElementById('error-last-name');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');
    
    // Clear previous error messages
    errorFirstName.textContent = '';
    errorLastName.textContent = '';
    errorEmail.textContent = '';
    errorMessage.textContent = '';
    
    // Validate First Name
    if (firstName.value.trim() === '') {
        isValid = false;
        errorFirstName.textContent = 'First Name is required';
    }
    
    // Validate Last Name
    if (lastName.value.trim() === '') {
        isValid = false;
        errorLastName.textContent = 'Last Name is required';
    }
    
    // Validate Email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    if (!email.value.match(emailPattern)) {
        isValid = false;
        errorEmail.textContent = 'Invalid Email address';
    }
    
    // Validate Message
    if (message.value.trim() === '') {
        isValid = false;
        errorMessage.textContent = 'Message is required';
    }
    
    if (isValid) {
        alert('Form submitted successfully!');
        // Perform the actual form submission here
    }
});
