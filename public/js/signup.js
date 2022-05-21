function checkPasswords() {
    if ($("#password").val() == $("#retypePassword").val()) {
        $("#notMatching").remove();
    } else {
        $("#signupScreen").append('<p id="notMatching">The passwords do not match.</p>')
    }
}


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
    $("#retypePassword").change(() => {
        checkPasswords();
    })
}

$(document).ready(setup)