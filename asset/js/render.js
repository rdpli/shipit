var shipment = $("#shipment-templ").html();
var template = Handlebars.compile(shipment);

toastr.options.showMethod = 'slideDown';
toastr.options.hideMethod = 'slideUp';
toastr.options.closeMethod = 'slideUp';
toastr.options.showEasing = 'swing';
toastr.options.hideEasing = 'linear';
toastr.options.closeEasing = 'linear';

toastr.options.closeButton = true;

function loadShipment(id) {
    $("#shipped-placeholder").hide();
    $("#shipped").prepend(template(id));

    /*var sid = "#copy-share-link" + id;
    var clipboard = new Clipboard(sid);
    clipboard.on('success', function (e) {
        toastr.success("Link successfully copied to clipboard!");
    });*/

    $(".modal-close").on("click", closeShipper);
    $(".modal-background").on("click", closeShipper);

}

$("#launch").on("click", openShipper);

function openShipper() {
    console.log(firebase.auth().currentUser);
    if (firebase.auth().currentUser != null) {
        $("#ship-modal").addClass("is-active");
    } else {
        forceLogin();
    }
}

function forceLogin() {
    $("#login-modal").addClass("is-active");
}

function closeShipper() {
    $(".modal").removeClass("is-active");
}

function shareShipment(uid) {
    $("#share-modal" + uid).addClass("is-active");
}

$.get("https://api.github.com/repos/mj66/shipit-frontend/commits", function (data, status) {
    $("#commit-id").html(data[0].sha);
    $("#commit-id").attr("href", data[0].html_url);
    $("#commit-id").attr("title", data[0].commit.message);
});