const addComments = async (event) => {
  console.log(event)
  const post_id = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-post")

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

// document
//   .querySelectorAll('.allPosts, .submit')
//   .addEventListener('click', addComments);
document.querySelectorAll(".allPosts .submit")
  .forEach(ele => ele.addEventListener('click', addComments))


function showComments(postId) {
  document.getElementById(`commentsForm${postId}`).style.display = "inline"
}

function showAllComments(postId) {
  document.getElementById(`commentsAll${postId}`).style.display = "inline"
}




