const addComments = async (event) => {
  // console.log(event.target.attributes[0].value)
  // console.log(event.target.getAttribute("data-post"))
  console.log('addComments')
  event.preventDefault();

  const comments = document.querySelector('#comments').value;


  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ post_id, comments }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload()
  } else {
    alert(response.statusText);
  }

};

document
  .querySelector('.comments-form')
  .addEventListener('submit', addComments);
