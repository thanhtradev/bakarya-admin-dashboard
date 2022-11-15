const table = '<table id="datatablesSimple"><thead><tr><th>ID</th><th>Type</th><th>Reason</th><th>Reported recipe</th><th>Reported Date</th><th>Action</th></tr></thead></table>'
const recipeReportsTable = '<table id="recipeReportsTableDatatablesSimple"><thead><tr><th>ID</th><th>Type</th><th>Reason</th><th>Recipe ID</th><th>Reported Date</th><th>Resolved Date</th><th>Action</th></tr></thead></table>'

function getUsersRenderTable() {
    $.ajax({
        url: 'http://api.bakarya.com/api/admin/recipe-reports',
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        type: 'GET',
        contentType: 'application/json',
        async: true,
        success: function (recipeReports) {

            var pendingTableBody = '<tbody>'
            var recipeReportsTableBody = '<tbody>'
            recipeReports.forEach(recipeReport => {
                if (recipeReport.status == "Pending") {
                    pendingTableBody += '<tr>';
                    // body += '<td><a role="button" onclick="showQRCode(\'' + recipe.id + '\')">' + recipe.id + '</a></td>';
                    pendingTableBody += '<td>' + recipeReport._id + '</td>';
                    pendingTableBody += '<td>' + recipeReport.type + '</td>';
                    pendingTableBody += '<td>' + recipeReport.reason + '</td>';
                    pendingTableBody += '<td><a role="button" class="link-success" onclick="showRecipe(\'' + recipeReport.recipe_id + '\')">' + "View" + '</a></td>';
                    pendingTableBody += '<td>' + new Date(recipeReport.createdAt).toLocaleString() + '</td>';
                    var button = '<a role="button" class="btn btn-danger" onclick="blockRecipe(\'' + recipeReport.recipe_id + '\',\'' + recipeReport._id + '\')">Block</a>';
                    pendingTableBody += '<td>' + button + '</td>';
                    pendingTableBody += '</tr>';
                } else {
                    recipeReportsTableBody += '<tr>';
                    // body += '<td><a role="button" onclick="showQRCode(\'' + recipe.id + '\')">' + recipe.id + '</a></td>';
                    recipeReportsTableBody += '<td>' + recipeReport._id + '</td>';
                    recipeReportsTableBody += '<td>' + recipeReport.type + '</td>';
                    recipeReportsTableBody += '<td>' + recipeReport.reason + '</td>';
                    recipeReportsTableBody += '<td>' + recipeReport.recipe_id + '</td>';
                    recipeReportsTableBody += '<td>' + new Date(recipeReport.createdAt).toLocaleString() + '</td>';
                    recipeReportsTableBody += '<td>' + new Date(recipeReport.updatedAt).toLocaleString() + '</td>';
                    var button = '<a role="button" class="btn btn-success" onclick="unblockRecipe(\'' + recipeReport.recipe_id + '\',\'' + recipeReport._id + '\')">Unblock</a>';
                    recipeReportsTableBody += '<td>' + button + '</td>';
                    recipeReportsTableBody += '</tr>';
                }
            })
            pendingTableBody += '</tbody>';
            recipeReportsTableBody += '</tbody>';
            $('#pendingRecipeReportsTable').empty();
            $('#pendingRecipeReportsTable').append(table);
            $('#datatablesSimple').append(pendingTableBody);
            const datatablesSimple = document.getElementById('datatablesSimple');
            if (datatablesSimple) {
                new simpleDatatables.DataTable(datatablesSimple);
            }
            // Recipe Reports Table
            $('#recipeReportsTable').empty();
            $('#recipeReportsTable').append(recipeReportsTable);
            $('#recipeReportsTableDatatablesSimple').append(recipeReportsTableBody);
            const recipeReportsTableDatatablesSimple = document.getElementById('recipeReportsTableDatatablesSimple');
            if (recipeReportsTableDatatablesSimple) {
                new simpleDatatables.DataTable(recipeReportsTableDatatablesSimple);
            }
        },

    })

}
$(document).ready(function () {
    $('#pendingRecipeReportsTable').empty();
    $('#pendingRecipeReportsTable').append("Loading...");
    $('#recipeReportsTable').empty();
    $('#recipeReportsTable').append("Loading...");
    getUsersRenderTable();
    // const datatablesSimple = document.getElementById('datatablesSimple');
    // if (datatablesSimple) {
    //     new simpleDatatables.DataTable(datatablesSimple);
    // }
})

function blockRecipe(recipeId, reportId) {

    $.ajax({
        url: 'http://api.bakarya.com/api/admin/recipes/' + recipeId + '/block',
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        type: 'PUT',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            $.ajax({
                url: 'http://api.bakarya.com/api/admin/recipe-reports/' + reportId,
                type: 'PUT',
                contentType: 'application/json',
                headers: {
                    "x-access-token": sessionStorage.getItem("token")
                },
                data: JSON.stringify({
                    status: "Resolved"
                }),
                async: false,
                success: function (_) {
                    getUsersRenderTable();
                }
            })

        }
    })
}

function unblockRecipe(recipeId, reportId) {
    $.ajax({
        url: 'http://api.bakarya.com/api/admin/recipes/' + recipeId + '/unblock',
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        type: 'PUT',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            $.ajax({
                url: 'http://api.bakarya.com/api/admin/recipe-reports/' + reportId,
                type: 'PUT',
                contentType: 'application/json',
                headers: {
                    "x-access-token": sessionStorage.getItem("token")
                },
                data: JSON.stringify({
                    status: "Pending"
                }),
                async: false,
                success: function (_) {
                    getUsersRenderTable();
                }
            })
        }
    })
}

function showRecipe(text) {
    console.log(text);
    window.open(`http://bakarya.com/posts/${text}`, '_blank').focus();
    // $('#exampleModal').modal('show');
    // $('#qrcode').empty().qrcode({
    //     render: 'image',
    //     text: text,
    //     size: 300,
    // });
}