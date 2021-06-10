const editFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;

  const response = await fetch('/api/users/login', {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    fetch('/api/users/dashboard')
      .then(
        document.location.replace('/api/users/dashboard')
      )
  } else {
    alert(response.statusText);
  }

};

document
  .querySelector('.submit')
  .addEventListener('submit', editFormHandler);

