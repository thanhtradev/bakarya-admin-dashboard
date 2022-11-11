const table = '<table id="datatablesSimple"><thead><tr><th>ID</th><th>Name</th><th>Categories</th><th>Created Date</th><th>Block/UnBlock</th></tr></thead></table>'

function getUsersRenderTable() {
    $.ajax({
        url: 'http://api.bakarya.com/api/admin/recipes',
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        type: 'GET',
        contentType: 'application/json',
        async: true,
        success: function (recipes) {

            var body = '<tbody>'
            recipes.forEach(recipe => {
                body += '<tr>';
                // body += '<td><a role="button" onclick="showQRCode(\'' + recipe.id + '\')">' + recipe.id + '</a></td>';
                body += '<td>' + recipe.id + '</td>';
                body += '<td>' + recipe.name + '</td>';
                body += '<td>' + recipe.categories + '</td>';
                body += '<td>' + new Date(recipe.createdTime).toLocaleString() + '</td>';
                var button = !recipe.isActive ? '<a role="button" class="btn btn-danger" onclick="unblockRecipe(\'' + recipe.id + '\')">Unblock</a>' : '<a role="button" class="btn btn-success" onclick="blockRecipe(\'' + recipe.id + '\')">Block</a>';
                body += '<td>' + button + '</td>';
                body += '</tr>';
            })
            body += '</tbody>';
            $('#recipesTable').empty();
            $('#recipesTable').append(table);
            $('#datatablesSimple').append(body);
            getUsersRenderTable();
            const datatablesSimple = document.getElementById('datatablesSimple');
            if (datatablesSimple) {
                new simpleDatatables.DataTable(datatablesSimple);
            }
        },

    })

}
$(document).ready(function () {
    $('#recipesTable').empty();
    $('#recipesTable').append("Loading...");
    getUsersRenderTable();
    // const datatablesSimple = document.getElementById('datatablesSimple');
    // if (datatablesSimple) {
    //     new simpleDatatables.DataTable(datatablesSimple);
    // }
})

function blockRecipe(id) {
    $.ajax({
        url: 'http://api.bakarya.com/api/admin/recipes/' + id + '/block',
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        type: 'PUT',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            $('#recipesTable').empty();
            $('#recipesTable').append(table);
            getUsersRenderTable();
            const datatablesSimple = document.getElementById('datatablesSimple');
            if (datatablesSimple) {
                new simpleDatatables.DataTable(datatablesSimple);
            }
        }
    })
}

function unblockRecipe(id) {
    $.ajax({
        url: 'http://api.bakarya.com/api/admin/recipes/' + id + '/unblock',
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        type: 'PUT',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            $('#recipesTable').empty();
            $('#recipesTable').append(table);
            getUsersRenderTable();
            const datatablesSimple = document.getElementById('datatablesSimple');
            if (datatablesSimple) {
                new simpleDatatables.DataTable(datatablesSimple);
            }
        }
    })
}

function showQRCode(text) {
    console.log(text);
    $('#exampleModal').modal('show');
    $('#qrcode').empty().qrcode({
        render: 'image',
        text: text,
        size: 300,
    });

}