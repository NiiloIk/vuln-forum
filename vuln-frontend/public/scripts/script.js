const API_URL = 'http://localhost:3000/posts.json';

// Fetch and display posts
async function loadPosts() {
    const response = await fetch(API_URL);
    const posts = await response.json();
    
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; // Clear old posts

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>By ${post.user_id}</small>
            <hr>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Handle new post submission
document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const author = "Anonymous";

    const newPost = { title, content, author };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost)
    });

    // Clear form & reload posts
    e.target.reset();
    loadPosts();
});

// Load posts on page load
loadPosts();
