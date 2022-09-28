const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document
        .querySelector('#post-title')
        .value
        .trim();
    const text = document
        .querySelector('#post-text')
        .value
        .trim();

    console.log("\n\n", title, text, "\n\n")
  
    if (title && text) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post!');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id') && event.target.classList.contains("btn-danger")) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post!');
      }
    }
  };
  
  const editButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id') && event.target.classList.contains("btn-info")) {
        const id = event.target.getAttribute('data-id');
        document.location.replace(`/posts/edit/${id}`);
    }
  };

  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostHandler);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);

  document
  .querySelector('.post-list')
  .addEventListener('click', editButtonHandler);