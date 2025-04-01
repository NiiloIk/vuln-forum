const API_URL = 'http://localhost:3002/api/posts';


const loggedUser = window.localStorage.getItem('forumUsername')
const userToken = window.localStorage.getItem('loggedForumappUser')
const token = userToken ? "Bearer " + userToken.toString() : null


// Fetch and display posts
async function loadPosts() {
    const response = await fetch(API_URL);
    const posts = await response.json();

    console.log(posts)

    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; // Clear old posts

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        let elementText = `
            <h3><a href='/posts/${post.id}'>${post.title}</a></h3>
            <p>${post.content}</p>
            <small>By <a href='/users/${post.user_id}'>${post.username}</a></small>
            <p>${new Date(Date.parse(post.created_at)).toLocaleDateString()}</p>
        `
        if (loggedUser === post.username) {
            elementText += `<button onclick=handleButtonClick(${post.id})>delete</button>`
        } 
        elementText += '<hr>'

        postElement.innerHTML = elementText;
        postsContainer.appendChild(postElement);
    });
}

// Handle deletion of post
async function handleButtonClick (id) {
    const DEL_API_URL = API_URL + `/${id}`
    await fetch(DEL_API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", 'authorization': token }
    });
    // Reload posts
    loadPosts();
}

// Handle new post submission
document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const newPost = { title, content };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'authorization': token },
        body: JSON.stringify(newPost)
    });

    // Clear form & reload posts
    e.target.reset();
    loadPosts();
});

// Load posts on page load
loadPosts();
