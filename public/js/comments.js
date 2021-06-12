const addComments = async (post_id) => {

  if (true) {
    console.log(post_id)
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


function showComments(postId) {
  document.getElementById(`commentsForm${postId}`).style.display = "inline"
}

function showAllComments(postId) {
  document.getElementById(`commentsAll${postId}`).style.display = "inline"
  document.getElementById(`hide${postId}`).style.display = "none"
}




