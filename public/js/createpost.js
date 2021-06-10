const createPost = async (event) => {
  console.log(event)
  console.log('createPost')
  event.preventDefault();

  const newTitle = document.querySelector('#post-title').value;
  const newPost = document.querySelector('#contentNew').value;
  const response = await fetch(`/api/post/${id}`, {

    method: 'POST',
    body: JSON.stringify({
      newTitle,
      newPost
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (response.ok) {
    fetch('/dashboard')
      .then(
        document.location.replace('/dashboard')
      );
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.createPost')
  .addEventListener('create', createPost)







// const newTitle = document.getElementById('post-title');
// const newPost = document.getElementById('contentNew');
// const createPost = document.getElementById('create');

// createPost.addEventListener('click', function (event) {
//   event.preventDefault();
//   const nT = newTitle.value
//   const nP = newPost = document.value

//   fetch('/api/post', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',

//     }
//   })
// })
