// global variables
var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');
var loginBtn = document.getElementById('login');

var signName = document.getElementById('signName');
var signEmail = document.getElementById('signEmail');
var signPassword = document.getElementById('signPassword');
var signup = document.getElementById('signup');
var userName = document.getElementById('username');
var active = '';

var logout = document.getElementById('logout');
var deleteEmail = document.getElementById('deleteEmail');

// conditions for first time
if (localStorage.getItem('Emails') != null) {
    var allEmails = JSON.parse(localStorage.getItem('Emails'));
} else {
    var allEmails = [];
}
if (localStorage.getItem('easyLogin') != null) {
    var easyLog = JSON.parse(localStorage.getItem('easyLogin'));
    if (loginEmail && loginPassword) {

        loginEmail.value = easyLog.tempEmail;
        loginPassword.value = easyLog.tempPass;
    }
} else {
    var easyLog = {
        tempEmail: '',
        tempPass: ''
    }
}
if (userName) {
    var active = localStorage.getItem('activeName');
    userName.innerHTML = active;
}

var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


var flag1 = false;
function addAccount() {
    if (signName.value == '' || signEmail.value == ''
        || signPassword.value == '') {
        alert('fill all fields')
        if (signName.value == "") {
            signName.style.border = '2px solid #ff000070';
        } else {
            signName.style.border = '1px solid #dee2e6';
        }
        if (signEmail.value == "") {
            signEmail.style.border = '2px solid #ff000070';
        } else {
            signEmail.style.border = '1px solid #dee2e6';
        }
        if (signPassword.value == "") {
            signPassword.style.border = '2px solid #ff000070';
        } else {
            signPassword.style.border = '1px solid #dee2e6';
        }
    } else if (signEmail.value.match(validRegex)) {
        var person = {
            name: signName.value,
            email: signEmail.value,
            password: signPassword.value
        }
        for (let i = 0; i < allEmails.length; i++) {
            if (allEmails[i].email == signEmail.value) {
                flag1 = true;
                break
            }
        }
        if (flag1) {
            signName.style.border = '1px solid #dee2e6';
            signPassword.style.border = '1px solid #dee2e6';
            alert('Email is used \n Please enter new email')
            signEmail.style.border = '2px solid #ff000070';
        } else {
            allEmails.push(person);
            localStorage.setItem('Emails', JSON.stringify(allEmails));
            alert('Successful Sign Up');
            easyLog = {
                tempEmail: signEmail.value,
                tempPass: signPassword.value
            }
            localStorage.setItem('easyLogin', JSON.stringify(easyLog))
            signName.value = '';
            signEmail.value = '';
            signPassword.value = '';
            signName.style.border = '1px solid #dee2e6';
            signEmail.style.border = '1px solid #dee2e6';
            signPassword.style.border = '1px solid #dee2e6';

            window.open('index.html', '_self')

        }
        flag1 = false;
    } else {
        signName.style.border = '1px solid #dee2e6';
        signPassword.style.border = '1px solid #dee2e6';
        alert('invalid Email')
        signEmail.style.border = '2px solid #ff000070';
    }


}

var flag2 = false;
function login() {
    for (let i = 0; i < allEmails.length; i++) {
        if ((allEmails[i].email == loginEmail.value) && (allEmails[i].password == loginPassword.value)) {
            flag2 = true;
            active = allEmails[i].name;
            localStorage.setItem('activeName', active);
            easyLog = {
                tempEmail: loginEmail.value,
                tempPass: loginPassword.value
            }
            localStorage.setItem('easyLogin', JSON.stringify(easyLog))
            break
        }
    }
    if (flag2) {
        window.open('home.html', '_self')
    } else {
        if ((loginEmail.value != "") && (loginPassword.value != "")) {
            alert('Incorrect Email or Password')
            loginEmail.style.border = '1px solid #dee2e6';
            loginPassword.style.border = '1px solid #dee2e6';
        } else {
            if (loginEmail.value == "") {
                loginEmail.style.border = '2px solid #ff000070';
            } else {
                loginEmail.style.border = '1px solid #dee2e6';
            }
            if (loginPassword.value == "") {
                loginPassword.style.border = '2px solid #ff000070';
            } else {
                loginPassword.style.border = '1px solid #dee2e6';
            }
        }

    }
}

function logOut() {
    localStorage.removeItem('easyLogin');
    window.open('index.html', '_self');
}

var index = -1;
function deleteE() {
    // var tempinfo = localStorage.getItem('easyLogin');
    for (let i = 0; i < allEmails.length; i++) {
        if ((allEmails[i].email == easyLog.tempEmail) && (allEmails[i].password == easyLog.tempPass) && (allEmails[i].name == localStorage.getItem('activeName'))) {
            alert('Email is Deleted')
            index = i;
            break
        }
    }
    allEmails.splice(index, 1);
    localStorage.setItem('Emails', JSON.stringify(allEmails))
    localStorage.removeItem('easyLogin');
    window.open('index.html', '_self');
}

if (logout && deleteEmail) {
    logout.addEventListener('click', logOut)
    deleteEmail.addEventListener('click',deleteE)
}
if (signup) {
    signup.addEventListener('click', addAccount);
}
if (loginBtn) {
    loginBtn.addEventListener('click', login)
}

