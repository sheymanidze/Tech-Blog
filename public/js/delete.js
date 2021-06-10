async function deletePost(event) {
  event.preventDefault();

  const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      post_id: id
    }),
    headers: {
      'Content-Type': 'aplication/json'
    }
  });
  if (response.ok) {
    alert('Post successfuly deleted')
    fetch('/api/users/dashboard')
      .then(
        document.location.replace('/api/users/dashboard')
      )
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.submit').addEventListener('click', deletePost)