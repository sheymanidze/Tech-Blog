const addComments = async (event) => {
  const post_id = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-post")
  // console.log(event.target.attributes[0].value)
  // console.log(event.target.getAttribute("data-post"))
  console.log('addComments')
  console.log('hello')
  event.preventDefault();

  const comments = document.querySelector('#comments').value;
  const postId = ({ post_id: post_id, comments: comments })
  console.log(postId)

  const response = await fetch('/api/comments/', {
    method: 'POST',
    body: JSON.stringify(postId),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload()
  } else {
    alert(response.statusText);
  }

};

document
  .querySelector('#comment')
  .addEventListener('click', addComments);


function showComments(postId) {
  document.getElementById(`commentsForm${postId}`).style.display = "inline"
}

function showAllComments(postId) {
  document.getElementById(`commentsAll${postId}`).style.display = "inline"
}


