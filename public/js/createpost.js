const createPost = async (event) => {
  console.log("fired")
  console.log(event)
  console.log('createPost')
  event.preventDefault();

  const newTitle = document.querySelector('#post-title').value;
  const newPost = document.querySelector('#contentNew').value;
  if (newTitle && newPost) {
    const response = await fetch('/api/post/create', {

      method: 'POST',
      body: JSON.stringify({
        title: newTitle,
        content: newPost
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(response)
    if (response.ok) {
      document.location.replace('/dashboard')

    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('#createBtn')
  .addEventListener('click', createPost)







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
