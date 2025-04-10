const URLpath = window.location.pathname
const id = URLpath.split('/').pop()

const API_URL = `http://localhost:3002/api/users/${id}`

// Fetch and display posts
async function loadPosts() {
    const response = await fetch(API_URL, { credentials: "include" });
    const posts = await response.json();
    
    const headerElem = document.getElementById('usernameHeader')
    headerElem.innerText = `Posts of user ${posts[0].username}`

    const postsCountElem = document.getElementById('postsCount')
    postsCountElem.innerText = `Amount of posts: ${posts.length}`

    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; // Clear old posts

    console.log(posts)

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        // Create title
        const titleElement = document.createElement("h3")
        const titleLinkElement = document.createElement("a")
        titleLinkElement.setAttribute("href", `/posts/${encodeURIComponent(post.id)}`) 
        titleLinkElement.innerText = post.title
        titleElement.appendChild(titleLinkElement)
        postElement.appendChild(titleElement)

        // Create content text
        const contentElement = document.createElement("p")
        contentElement.innerText = post.content
        postElement.appendChild(contentElement)

        // Create user text
        const userElement = document.createElement("small")
        const userLinkElement = document.createElement("a")
        userLinkElement.setAttribute("href", `/users/${encodeURIComponent(post.user_id)}`)
        userLinkElement.innerText = post.username
        userElement.innerText = "By "
        userElement.appendChild(userLinkElement)
        postElement.appendChild(userElement)
        
        // Create date text
        const dateElement = document.createElement("p")
        dateElement.innerText = new Date(Date.parse(post.created_at)).toLocaleDateString()
        postElement.appendChild(dateElement)

        // Create hr
        postElement.appendChild(document.createElement("hr"))
        postsContainer.appendChild(postElement);
    });
}

// Load posts on page load
loadPosts();
