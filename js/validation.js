/**FORM VALIDATIN */
function validateForm() {
    document.querySelector('.secondPoliceLabel').style.color = "#2e2e2e";
    document.querySelector('#myBtn').style.color = "#2e2e2e";
    document.querySelector('.second-police').classList.remove("error");
    let name = document.forms["frm"]["name"].value;
    let alphaExp = /^[a-zA-Z]+$/;
    if (name == "" || !name.match(alphaExp)) {
        document.getElementById('name').style.borderColor = "#F44336"
        document.querySelector('.nameLabel').style.color = "#F44336"
            // alert(name);
        return false;
    }
    document.getElementById('name').style.borderColor = "#19AAF8";
    document.querySelector('.nameLabel').style.color = "#BFBFBF";
    let addr = document.forms["frm"]["address"].value;
    if (addr == "") {
        document.getElementById('address').style.borderColor = "#F44336"
        document.querySelector('.addressLabel').style.color = "#F44336"
        return false;
    }
    document.getElementById('address').style.borderColor = "#19AAF8"
    document.querySelector('.addressLabel').style.color = "#BFBFBF"
    var regMail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var email = document.getElementById('email').value;
    if (!regMail.test(email)) {
        document.getElementById('email').style.borderColor = "#F44336";
        document.querySelector('.emailLabel').style.color = "#F44336";
        return false;
    }
    document.getElementById('email').style.borderColor = "#19AAF8";
    document.querySelector('.emailLabel').style.color = "#BFBFBF";
    let phone = document.forms["frm"]["telephone"].value;
    var regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (phone == "" || !regPhone.test(phone)) {
        document.getElementById('telephone').style.borderColor = "#F44336"
        document.querySelector('.telephoneLabel').style.color = "#F44336"
        return false;
    }
    document.getElementById('telephone').style.borderColor = "#19AAF8";
    document.querySelector('.telephoneLabel').style.color = "#BFBFBF";
    let firstPolice = document.forms["frm"]["firstPolice"].checked;
    let secondPolice = document.forms["frm"]["secondPolice"].checked;
    if (firstPolice == false && secondPolice == false) {
        document.getElementById('firstPolice').style.borderColor = "#F44336";
        document.querySelector('.first-police').classList.add("error");
        document.querySelector('.firstPoliceLabel').style.color = "#F44336";
        document.getElementById('secondPolice').style.borderColor = "#F44336";
        document.querySelector('.secondPoliceLabel').style.color = "#F44336";
        document.querySelector('.second-police').classList.add("error");
        document.querySelector('#myBtn').style.color = "#F44336";
        return false;
    }
    if (firstPolice == false) {
        document.querySelector('.firstPoliceLabel').style.color = "#F44336";
        document.querySelector('.first-police').classList.add("error");
        return false;
    }
    document.querySelector('.firstPoliceLabel').style.color = "#2e2e2e";
    document.querySelector('.first-police').classList.remove("error");
    if (secondPolice == false) {
        document.querySelector('.secondPoliceLabel').style.color = "#F44336";
        document.querySelector('.second-police').classList.add("error");
        document.querySelector('#myBtn').style.color = "#F44336";
        return false;
    }
    return true;
}