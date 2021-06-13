const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const errorElement = document.getElementById('error');
  const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/
  const letters = /[a-zA-Z]/;
  const upperCase = /[A-Z]/;


  if (password.length < 6) {
    errorElement.textContent = 'Password must be longer than 6 characters'
  } else if (password.length > 20) {
    errorElement.textContent = 'Password must be less than 20 characters'

  } else if (!symbols.test(password)) {
    errorElement.textContent = 'Password must contain at least one special characters'


  } else if (!letters.test(password)) {
    errorElement.textContent = 'Password must contain at least one letter'

  } else if (!upperCase.test(password)) {
    errorElement.textContent = 'Password must contain at least one upper-case letter'


  } else if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.sign-up-form')
  .addEventListener('submit', signupFormHandler);