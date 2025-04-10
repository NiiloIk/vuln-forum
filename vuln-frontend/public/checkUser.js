const user = getUsername()

if (user) {
    // If user is logged in transform loginElement to logout element.
    const loginElement = document.getElementById('navbar-login')
    loginElement.style.display = "none"
    
    const userElement = document.getElementById('navbar-user')
    userElement.innerText = `Logged in as: ${user}`

    const logoutElement = document.getElementById('navbar-logout')
    logoutElement.style.display = "block"
}

document.getElementById('navbar-logout').addEventListener('click', async (e) => {
    await fetch('http://localhost:3002/api/login/logout', { credentials: "include" })
    window.location.href = '/' // Go to front page
})