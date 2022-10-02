const eventTest = async (event) => {
    event.preventDefault();

    // Pull Post ID
    const url = window.location.pathname
    const postId = url.substring(url.lastIndexOf('/') + 1);
    // console.log(postId); // working

    // Get the Updated Title
    let title = document.getElementById("post-title").value.trim();
    console.log(title); // Working

    let text = document.getElementById("post-text").value.trim();

    console.log(text); // Working

    let body = JSON.stringify({ title, text });
    console.log(body);

    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ title, text }),
        headers: {
            'Content-Type': 'application/json',
        },
    }); 

    if (response.ok) {
        document.location.replace(`/post/${postId}`);
        console.log('It worked!');
    } else {
        alert('Failed to update post!');
    };



    // console.log('\n\n\nThe code to update a post goes here\n\n\n') // Working
}
document.querySelector('.new-post-form').addEventListener('submit', eventTest);