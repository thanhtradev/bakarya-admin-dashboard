$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://api.bakarya.com/api/admin/overview",
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        success: function (data) {
            $('#totalUsers').text(data.totalUsers);
            $('#totalRecipes').text(data.totalRecipes);
            $('#totalProducts').text(data.totalProducts);
        },
        error: function (data) {
            console.log(data);
        }
    })
});