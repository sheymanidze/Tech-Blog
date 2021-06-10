async function deletePost(event) {
  console.log(event)

  event.preventDefault();

  // const id = event.target.getAttribute("data-post")

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
    alert('Post is successfuly deleted')
    fetch('/dashboard')
      .then(
        document.location.replace('/dashboard')
      )
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteButton').addEventListener('click', deletePost)