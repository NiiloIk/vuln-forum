const API_URL = 'http://localhost:3002/api/posts';


function getUsername() {
    let name = "username" + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
const loggedUser = getUsername()

async function getCSRFToken() {
    const res = await fetch('http://localhost:3002/api/csrf-token', {
        credentials: 'include'
    });
    const data = await res.json();
    return data.csrfToken;
}

// Fetch and display posts
async function loadPosts() {
    const response = await fetch(API_URL);
    const posts = await response.json();

    console.log(posts)

    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; // Clear old posts

    posts.forEach(post => {
        const postElement = document.createElement("div")
        postElement.classList.add("post")

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

        // Create delete button
        if (loggedUser === post.username) {
            const deleteButtonElement = document.createElement("button")
            deleteButtonElement.addEventListener("click", () => handleButtonClick(post.id))
            deleteButtonElement.innerText = "delete"
            postElement.appendChild(deleteButtonElement)
        }

        postElement.appendChild(document.createElement("hr"))
        postsContainer.appendChild(postElement)
    });
}

// Handle deletion of post
async function handleButtonClick (id) {
    const csrfToken = await getCSRFToken()
    const DEL_API_URL = API_URL + `/${id}/delete`
    await fetch(DEL_API_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
        },
        credentials: "include"
    });
    // Reload posts
    loadPosts();
}

// Handle new post submission
document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const csrfToken = await getCSRFToken()

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const newPost = { title, content };

    await fetch(API_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify(newPost),
        credentials: "include"
    });

    // Clear form & reload posts
    e.target.reset();
    loadPosts();
});

// Load posts on page load
loadPosts();
