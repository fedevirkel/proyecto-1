const maxPasswords = 5;
function validatePassword(element) {

    password = element.parentElement.getElementsByClassName("check-txt")[0].value;
    document.querySelector('.bg-modal').style.display = "flex";
    if (password.length === 0) {
        window.alert("No password inserted");
        password = ' ';
    }
    
    saveNewPassword(password);

    // Array with every posible char
    const keys = new Array();
    keys.push("[$@!%*#?&]");
    keys.push("[A-Z]");
    keys.push("[0-9]");
    keys.push("[a-z]"); 


    let passLenght = password.length >= 8;

    //security level
    let matchs = 0;
    //find level
    if(passLenght){
        for (let i = 0; i < keys.length; i++) {
            if (new RegExp(keys[i]).test(password)) {
                matchs++;
            }
        }
    }
    
    let passwordLevel = 'Your password level is: ';
    //show security level
    security = '';
    switch(matchs){
        case 0 :
            security = 'Just change your password, please.';
            break;
        case 1 :
            security = passwordLevel+'WEAK';
            break;
        case 2 :
            security = passwordLevel+'MEDIUM';
            break;
        case 3 :
            security = passwordLevel+'STRONG';
            break;
        case 4 :
            security = passwordLevel+'VERY STRONG you are unhackeable bro!';
            break;
    }


    modal = document.getElementsByClassName("password-level")[0];
    modal.innerHTML = '<tr><td> '+security+' </td></tr>';

    document.querySelector('.bg-modal').style.display = "flex";

    element.parentElement.getElementsByClassName("check-txt")[0].value="";  

    updateLastFive();
}

function toggle(element)
{
    element.classList.toggle("white-mode");
}

function initLocalStorage(){
    storage = window.localStorage;
    
    for(let i = 1 ; i <= maxPasswords ; i++){
        storage.setItem(i,'');
    }
}
    
function saveNewPassword(password){
    storage = window.localStorage;

    for(let i = maxPasswords ; i > 1 ; i--)
        storage.setItem(i, storage.getItem(i-1));
    storage.setItem('1',password);
}

function updateLastFive(){
    table = document.getElementsByClassName("lastFive")[0];

    let content = '<tr><td>Last five passwords checked</td></tr>';

    for(let i = 1 ; i <= maxPasswords ; i++){
        content += '<tr><td>'+i+') '+window.localStorage.getItem(i)+'</td></tr>';
    }
    table.innerHTML = content;
}


if(window.localStorage.getItem('1') === null)
    initLocalStorage();

updateLastFive();

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});