const editPost = async (event) => {
  // console.log(event.target.attributes[0].value)
  console.log(event.target.getAttribute("data-post"))
  console.log('editPost')
  event.preventDefault();
  const title = document.querySelector('#postTitle').value;
  const content = document.querySelector('#content').value;
  const id = event.target.getAttribute("data-post")

  const response = await fetch(`/api/post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    fetch('/dashboard')
      .then(
        document.location.replace('/dashboard')
      )
  } else {
    alert(response.statusText);
  }

};

document
  .querySelector('.form-edit')
  .addEventListener('submit', editPost);

