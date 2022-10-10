function isLogged() {
    $.ajax({
        url: 'http://api.bakarya.com/api/auth/admin',
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        type: 'GET',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            console.log(data);
            if (!data.isAdmin) {
                window.location.href = "login.html";
            }
        },
        error: function (error) {
            console.log(error);
            window.location.href = "login.html";
        }
    })
}
isLogged()