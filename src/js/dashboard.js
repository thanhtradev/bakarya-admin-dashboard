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
            $('#pendingReports').text(data.pendingReports);
        },
        error: function (data) {
            console.log(data);
        }
    })
    $.ajax({
        type: "GET",
        url: "http://api.bakarya.com/api/admin/recipe-chart",
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        success: function (data) {
            labels = [];
            values = [];
            labels = data.dates.map(date => new Date(date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric'
            }));
            values = data.recipeCount;


            // Chart
            // Set new default font family and font color to mimic Bootstrap's default styling
            Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
            Chart.defaults.global.defaultFontColor = '#292b2c';

            // Area Chart Example
            var ctx = document.getElementById("recipeChart");
            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Recipes",
                        lineTension: 0.3,
                        backgroundColor: "rgba(2,117,216,0.2)",
                        borderColor: "rgba(2,117,216,1)",
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(2,117,216,1)",
                        pointBorderColor: "rgba(255,255,255,0.8)",
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(2,117,216,1)",
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: values,
                    }],
                },
                options: {
                    scales: {
                        xAxes: [{
                            time: {
                                unit: 'date'
                            },
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 7
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                min: 0,
                                max: 1600,
                                maxTicksLimit: 5
                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, .125)",
                            }
                        }],
                    },
                    legend: {
                        display: false
                    }
                }
            });
        },
        error: function (data) {
            console.log(data);
        }
    });
    $.ajax({
        type: "GET",
        url: "http://api.bakarya.com/api/admin/user-chart",
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        success: function (data) {
            labels = [];
            values = [];
            labels = data.dates.map(date => new Date(date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric'
            }));
            values = data.userCount;
            console.log(labels);
            console.log(values);


            // Chart
            // Set new default font family and font color to mimic Bootstrap's default styling
            Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
            Chart.defaults.global.defaultFontColor = '#292b2c';

            // Area Chart Example
            var ctx = document.getElementById("userChart");
            var userLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Users",
                        lineTension: 0.3,
                        backgroundColor: "rgba(2,117,216,0.2)",
                        borderColor: "rgba(2,117,216,1)",
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(2,117,216,1)",
                        pointBorderColor: "rgba(255,255,255,0.8)",
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(2,117,216,1)",
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: values,
                    }],
                },
                options: {
                    scales: {
                        xAxes: [{
                            time: {
                                unit: 'date'
                            },
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 7
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                min: 0,
                                max: 150,
                                maxTicksLimit: 5
                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, .125)",
                            }
                        }],
                    },
                    legend: {
                        display: false
                    }
                }
            });
        },
        error: function (data) {
            console.log(data);
        }
    })
});