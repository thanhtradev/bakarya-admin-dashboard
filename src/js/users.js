function getUsersRenderTable() {
    $.ajax({
        url: 'http://api.bakarya.com/api/admin/users',
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        type: 'GET',
        contentType: 'application/json',
        async: false,
        success: function (users) {
            var body = '<tbody>'
            users.forEach(user => {
                if (user.roles.map(role => role.name).includes("admin"))
                    return;
                body += '<tr>';
                body += '<td>' + user._id + '</td>';
                body += '<td>' + user.username + '</td>';
                body += '<td>' + user.email + '</td>';
                body += '<td>' + user.roles.map((role) => role.name) + '</td>';
                body += '<td>' + new Date(user.createdAt).toLocaleString() + '</td>';
                var button = user.isBlocked ? '<a role="button" class="btn btn-danger" onclick="unblockUser(\'' + user._id + '\')">Unblock</a>' : '<a role="button" class="btn btn-success" onclick="blockUser(\'' + user._id + '\')">Block</a>';
                body += '<td>' + button + '</td>';
                body += '</tr>';
            })
            body += '</tbody>';
            $('#datatablesSimple').append(body);
        }
    })

}
$(document).ready(function () {
    getUsersRenderTable();
    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
})

function blockUser(id) {
    $.ajax({
        url: 'http://api.bakarya.com/api/admin/users/' + id + '/block',
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        type: 'PUT',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            $('#usersTable').empty();
            var table = '<table id="datatablesSimple"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Register Date</th><th>Block/UnBlock</th></tr></thead></table>'
            $('#usersTable').append(table);
            getUsersRenderTable();
            const datatablesSimple = document.getElementById('datatablesSimple');
            if (datatablesSimple) {
                new simpleDatatables.DataTable(datatablesSimple);
            }
        }
    })
}

function unblockUser(id) {
    $.ajax({
        url: 'http://api.bakarya.com/api/admin/users/' + id + '/unblock',
        headers: {
            "x-access-token": sessionStorage.getItem("token")
        },
        type: 'PUT',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            $('#usersTable').empty();
            var table = '<table id="datatablesSimple"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Register Date</th><th>Block/UnBlock</th></tr></thead></table>'
            $('#usersTable').append(table);
            getUsersRenderTable();
            const datatablesSimple = document.getElementById('datatablesSimple');
            if (datatablesSimple) {
                new simpleDatatables.DataTable(datatablesSimple);
            }
        }
    })
}