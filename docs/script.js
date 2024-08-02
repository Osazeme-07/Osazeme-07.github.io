document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;
    
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const disclaimer = document.getElementById('privacy-policy');

    const errorFirstName = document.getElementById('error-first-name');
    const errorLastName = document.getElementById('error-last-name');
    const errorEmail = document.getElementById('error-email');
    const errordisclaimer = document.getElementById('error-privacy-policy');
    
    // Clear previous error messages
    errorFirstName.textContent = '';
    errorLastName.textContent = '';
    errorEmail.textContent = '';
    errordisclaimer.textContent= '';
    
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

    // Validate Disclaimer Checkbox
    if (!disclaimer.checked) {
        isValid = false;
        errordisclaimer.textContent = 'You must agree to the policies in the disclaimer';
    }
    
    // If the form is valid, proceed with submission and clear the form
    if (isValid) {
        alert('Form submitted successfully!');
        
        // Here you would perform the actual form submission, e.g., using fetch or XMLHttpRequest

        // Clear the form fields
        document.getElementById('contact-form').reset();
    }
});
