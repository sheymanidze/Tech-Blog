const deleteComment = async (event) => {
  console.log("fired")
  console.log(event.target.parentElement)
  console.log('deletePost')


  event.preventDefault();

  // const id = event.target.parentElement.getAttribute("data-post")
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      comment_id: id
    }),
    headers: {
      'Content-Type': 'aplication/json'
    }
  });
  console.log(response)
  if (response.ok) {
    alert('Comments are successfuly deleted')
    fetch('/dashboard')
      .then(
        document.location.replace('/dashboard')
      )
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#delcomBtn').addEventListener('click', deleteComment)