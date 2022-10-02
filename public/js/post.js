const eventTest = async (event) => {
    event.preventDefault();
    // Check if login button
    let loginCheck = event.target.textContent.trim();
    if (loginCheck === "Log In!") {
        document.location.replace(`/login`);
    };

    // Pull post ID
    const url = window.location.pathname
    const post_id = url.substring(url.lastIndexOf('/') + 1);
    // console.log(postId); // working

    // Get the comment text
    let text = document.getElementById("comment-text").value.trim();
    // console.log(text); // Working

    let body = JSON.stringify({text, post_id});
    console.log(body);

    const response = await fetch(`/api/comments/`, {
        method: "POST",
        body: JSON.stringify({text, post_id}),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace(`/post/${post_id}`);
        console.log('It worked!');
    } else {
        alert('Failed to update post!');
    };


    console.log('\n\n\nThe code to add a comment goes here\n\n\n')
}
document.querySelector('.new-comment-form').addEventListener('submit', eventTest);
