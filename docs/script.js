document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    let isValid = true;
    
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const disclaimer = document.getElementById('privacy-policy');

    const errorFirstName = document.getElementById('error-first-name');
    const errorLastName = document.getElementById('error-last-name');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');
    const errorDisclaimer = document.getElementById('error-privacy-policy');
    
    // Clear previous error messages
    errorFirstName.textContent = '';
    errorLastName.textContent = '';
    errorEmail.textContent = '';
    errorMessage.textContent = '';
    errorDisclaimer.textContent = '';
    
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
        errorDisclaimer.textContent = 'You must agree to the policies in the disclaimer';
    }
    
    // If the form is valid, proceed with submission
    if (isValid) {
        try {
            const formData = new FormData(document.getElementById('contact-form'));
            const response = await fetch('/send-email', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                document.getElementById('contact-form').reset();
            } else {
                const errorText = await response.text();
                alert(`Error: ${errorText}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred while submitting the form.');
        }
    }
});
