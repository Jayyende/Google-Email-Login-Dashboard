// Function to decode Google JWT Token
function parseJwt(token) {

    let base64Url = token.split('.')[1];

    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    let jsonPayload = decodeURIComponent(

        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')

    );

    return JSON.parse(jsonPayload);
}


// Function called after successful Google Login
function handleCredentialResponse(response) {

    // Decode user information
    const user = parseJwt(response.credential);

    // Greeting according to current time
    let hour = new Date().getHours();
    let greeting = "";

    if (hour < 12) {
        greeting = "Good Morning";
    }
    else if (hour < 18) {
        greeting = "Good Afternoon";
    }
    else {
        greeting = "Good Evening";
    }

    // Console Output
    console.log("Google User Details");
    console.log(user);

    console.table({
        Name: user.name,
        Email: user.email,
        GoogleID: user.sub,
        Verified: user.email_verified,
        LoginTime: new Date().toLocaleString()
    });

    // Hide Google Sign-In Button
    document.querySelector(".g_id_signin").style.display = "none";

    // Dashboard
    document.getElementById("profile").innerHTML = `

    <div class="dashboard">

        <h2>Google Account Dashboard</h2>

        <img src="${user.picture}" class="profile-img">

        <h3>${greeting}, ${user.name}</h3>

        <p class="role">Student</p>

        <p class="verified">✔ Verified Google Account</p>

        <div class="card">
            <p><strong>📧 Email</strong></p>
            <p>${user.email}</p>
        </div>

        <div class="card">
            <p><strong>🆔 Google User ID</strong></p>
            <p>${user.sub}</p>
        </div>

        <div class="card">
            <p><strong>📅 Login Time</strong></p>
            <p>${new Date().toLocaleString()}</p>
        </div>

        <div class="card">
            <p><strong>✔ Email Verified</strong></p>
            <p>${user.email_verified}</p>
        </div>

        <div class="card">
            <p><strong>🌍 Account Status</strong></p>
            <p>Active</p>
        </div>

        <button class="logout-btn" onclick="logout()">
            Logout
        </button>

    </div>

    `;
}


// Logout Function
function logout() {

    // Show Google Login Button Again
    document.querySelector(".g_id_signin").style.display = "block";

    // Remove Dashboard
    document.getElementById("profile").innerHTML = "";

    console.clear();
}
