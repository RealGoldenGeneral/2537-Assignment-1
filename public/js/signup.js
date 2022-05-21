function redirectToLandingPage() {
    location.href = "/";
}

function addAnAccount() {
    $.ajax({
        type: "put",
        url: "/addAccount",
        data: {
            username: $("#username").val(),
            password: $("#password").val(),
        },
        success: redirectToLandingPage
    })
}

function setup() {
    $("#signup").click(() => {
        addAnAccount();
    })
}

$(document).ready(setup)