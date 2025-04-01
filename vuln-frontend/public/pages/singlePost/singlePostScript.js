const URLpath = window.location.pathname
const id = URLpath.split('/').pop()

const API_URL = `http://localhost:3002/api/posts/${id}`

const userToken = window.localStorage.getItem('loggedForumappUser')
const token = userToken ? "Bearer " + userToken.toString() : null

// Fetch and display posts
async function loadPost() {

    const response = await fetch(API_URL);
    const postWithComments = await response.json();

    // Seperate comments from posts using deconstructing
    const {comments, ...post} = postWithComments[0]

    console.log(post)

    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = ""; // Clear old values
    postContainer.innerHTML = `
        <h1>${post.title}</h1>
        <small>By <a href='/users/${post.user_id}'>${post.post_creator}</a> </small>
        <p>${post.content}</p>
        <p>${new Date(Date.parse(post.post_created_at)).toLocaleDateString()}</p>
        <hr>
    `
    
    const commentContainer = document.getElementById("comments-container")
    commentContainer.innerHTML = ""
    if (comments[0]['comment']) {
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `
                <h3>${comment.comment}</h3>
                <small>By <a href='/users/${comment.commenter_id}'>${comment.commenter}</a> ${new Date(Date.parse(comment.comment_created_at)).toLocaleDateString()}</small>
                <hr>
            `;
            commentContainer.appendChild(commentElement);
        });
    } else {
        const noCommentsElement = document.createElement('p')
        noCommentsElement.innerHTML = `<p>No comments posted</p>`
            commentContainer.appendChild(noCommentsElement)
    }
}

// Handle new comment submission
document.getElementById("commentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const comment = document.getElementById("comment").value;

    await fetch(API_URL + "/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": token },
        body: JSON.stringify({ comment })
    });

    // Clear form & reload
    e.target.reset();
    loadPost();
});

// Load posts on page load
loadPost();
