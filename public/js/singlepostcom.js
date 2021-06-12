const addComments = async (id) => {
  //console.log(event)
  //event.preventDefault();
  if (true) {
    //const post_id = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-post")

    console.log(id)
    //const postIdStr = JSON.stringify(post_id);

    const comments = document.querySelector(`#comment-${id}`).value;
    const postId = ({ post_id: id, comments: comments })
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