const deletePost = async (event) => {
  console.log("fired")
  console.log(event.target.parentElement)
  console.log('deletePost')


  event.preventDefault();

  const id = event.target.parentElement.getAttribute("data-post")
  const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      post_id: id
    }),
    headers: {
      'Content-Type': 'aplication/json'
    }
  });
  console.log(response)
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

// document.querySelector('#deleteBtn').addEventListener('click', deletePost)
document.querySelectorAll('.dlete .submit')
  .forEach(ele => ele.addEventListener('click', deletePost))