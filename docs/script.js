document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    let isValid = true;
    
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const disclaimer = document.getElementById('privacy-policy').checked;

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
    if (firstName === '') {
        isValid = false;
        errorFirstName.textContent = 'First Name is required';
    }
    
    // Validate Last Name
    if (lastName === '') {
        isValid = false;
        errorLastName.textContent = 'Last Name is required';
    }
    
    // Validate Email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    if (!email.match(emailPattern)) {
        isValid = false;
        errorEmail.textContent = 'Invalid Email address';
    }

    // Validate Disclaimer Checkbox
    if (!disclaimer) {
        isValid = false;
        errorDisclaimer.textContent = 'You must agree to the policies in the disclaimer';
    }
    
    // If the form is valid, proceed with submission
    if (isValid) {
        try {
            // Create URL-encoded data
            const data = new URLSearchParams();
            data.append('first-name', firstName);
            data.append('last-name', lastName);
            data.append('email', email);
            data.append('message', message);

            const response = await fetch('https://secure-plains-83795-fc8873439e5b.herokuapp.com/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data.toString()
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
