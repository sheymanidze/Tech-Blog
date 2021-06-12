const addComments = async (post_id) => {
  //console.log(event)
  //event.preventDefault();
  if (true) {
    //const post_id = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-post")

    console.log(post_id)
    //const postIdStr = JSON.stringify(post_id);

    const comments = document.querySelector(`#comment-${post_id}`).value;
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
  }

};

// document
//   .querySelectorAll('.allPosts, .submit')
//   .addEventListener('click', addComments);
// document.querySelectorAll(".allPosts .submit")
//   .forEach(ele => ele.addEventListener('click', function (event) {
//     console.log(event)
//   }))


function showComments(postId) {
  document.getElementById(`commentsForm${postId}`).style.display = "inline"
}

function showAllComments(postId) {
  document.getElementById(`commentsAll${postId}`).style.display = "inline"
  document.getElementById(`hide${postId}`).style.display = "none"
}




