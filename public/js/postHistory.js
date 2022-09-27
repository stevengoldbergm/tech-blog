const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document
        .querySelector('#post-title')
        .value
        .trim(); // used to be project-name
    const text = document
        .querySelector('#post-text')
        .value
        .trim(); // used to be project-desc
  
    if (title && text) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/post-history');
      } else {
        alert('Failed to create post!');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/post-history');
      } else {
        alert('Failed to delete post!');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);
  