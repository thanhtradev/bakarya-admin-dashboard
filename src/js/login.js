function login() {
    var username = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    $.ajax({
        url: 'http://api.bakarya.com/api/auth/signin',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password
        }),
        success: function (data) {
            sessionStorage.setItem('token', data.accessToken);
            window.location.href = 'index.html';
        },
        error: () =>
            alert('Username or password is incorrect')
    });

}

function logout() {
    sessionStorage.removeItem('token');
    window.location.href = 'login.html';
}