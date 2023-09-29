function login() {
    window.location.href = "/account/login/";
}

function logout() {
    window.location.href = "/account/logout/";
}
if (document.getElementById("back") !== null) {
    document.getElementById("back").addEventListener("click", () => {
        console.log('ok')
        window.location.href = "http://127.0.0.1:8000";
    });
}
