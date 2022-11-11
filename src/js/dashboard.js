$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://api.bakarya.com/api/admin/overview",
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        success: function (data) {
            // Calculate increase percentage for users
            var usersIncreasePercentage = (data.totalUsers + data.newUsers) / data.totalUsers * 100 - 100;
            usersIncreasePercentage = usersIncreasePercentage.toFixed(2);
            var recipesIncreasePercentage = (data.totalRecipes + data.newRecipes) / data.totalRecipes * 100 - 100;
            recipesIncreasePercentage = recipesIncreasePercentage.toFixed(2);
            var productsIncreasePercentage = (data.totalProducts + data.newProducts) / data.totalProducts * 100 - 100;
            productsIncreasePercentage = productsIncreasePercentage.toFixed(2);
            $('#totalUsers').text(data.totalUsers);
            $('#newUsers').text(data.newUsers + " ↑ 24h");
            $('#totalRecipes').text(data.totalRecipes);
            $('#newRecipes').text(data.newRecipes + " ↑ 24h");
            $('#totalProducts').text(data.totalProducts);
            $('#newProducts').text(data.newProducts + " ↑ 24h");
        },
        error: function (data) {
            console.log(data);
        }
    })
});