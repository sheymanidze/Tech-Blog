const editPost = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#postTitle').value;
  const content = document.querySelector('#content').value;

  const response = await fetch(`/api/post/${id}`, {
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
  .querySelector('.edit-post')
  .addEventListener('submit', editPost);

