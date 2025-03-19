const URLpath = window.location.pathname
const id = URLpath.split('/').pop()

const API_URL = `http://localhost:3002/api/users/${id}`

// Fetch and display posts
async function loadPosts() {
    const response = await fetch(API_URL);
    const posts = await response.json();
    
    const headerElem = document.getElementById('usernameHeader')
    headerElem.innerHTML = `Posts of user ${posts[0].username}`

    const postsCountElem = document.getElementById('postsCount')
    postsCountElem.innerHTML = `Amount of posts: ${posts.length}`

    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; // Clear old posts

    console.log(posts)

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h3><a href='/posts/${post.id}'>${post.title}</a></h3>
            <p>${post.content}</p>
            <small>By <a href='/users/${post.user_id}'>${post.username}</a></small>
            <p>${new Date(Date.parse(post.created_at)).toLocaleDateString()}</p>
            <hr>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Load posts on page load
loadPosts();
