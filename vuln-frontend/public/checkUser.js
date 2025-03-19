const user = window.localStorage.getItem('forumUsername')

if (user) {
    // If user is logged in transform loginElement to logout element.
    const loginElement = document.getElementById('navbar-login')
    loginElement.style.display = "none"
    
    const userElement = document.getElementById('navbar-user')
    userElement.innerHTML = `Logged in as: ${user}`

    const logoutElement = document.getElementById('navbar-logout')
    logoutElement.style.display = "block"
}

document.getElementById('navbar-logout').addEventListener('click', async (e) => {
    window.localStorage.removeItem('loggedForumappUser')
    window.localStorage.removeItem('forumUsername')
    window.location.href = '/' // Go to front page
})