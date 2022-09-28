const editButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id') && event.target.classList.contains("btn-info")) {
        const id = event.target.getAttribute('data-id');
        document.location.replace(`/posts/edit/${id}`);
    }
  };

document
.querySelector('.post-list')
.addEventListener('click', editButtonHandler);