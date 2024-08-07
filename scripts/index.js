const body = document.getElementById("body");
const calcBase = document.getElementById("calculator-base");
const settingsBtn = document.getElementById("settings");
const settingsMenu = document.getElementById("settingsMenu");
const settingsMenuBG = document.getElementById("settingsMenuBG");
const rotateBtn = document.getElementById("rotate");

const darkModeCheckbox = document.getElementById("dark-mode-input");
const rotateButtonCheckbox = document.getElementById("rotate-button-check");

const notification = document.getElementById("notification");

checkPage();

rotateBtn.addEventListener('click', () => {
    if (calcBase.classList.contains('portrait')) {
        calcBase.classList.remove('portrait');
        calcBase.classList.add('landscape');
    } else {
        calcBase.classList.remove('landscape');
        calcBase.classList.add('portrait');
    }
})

function showRotate() {
    if(rotateButtonCheckbox.checked == true) {
        rotateBtn.style.display = 'block';
        localStorage.setItem('rotate-button', true);
    }
    else {
        rotateBtn.style.display = 'none';
        localStorage.setItem('rotate-button', false);
    }
}

function showSettings() {
    settingsMenu.classList.toggle('active');
    settingsMenuBG.classList.toggle('active');
}

function setDarkMode() {
    if(darkModeCheckbox.checked == true) {
        body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', true);
    }
    else {
        body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', false);
    }
}

function checkPage() {
    //Verifies the data on local storage and set it's configurations on document
    if(localStorage.getItem('dark-mode') === 'true') {
        darkModeCheckbox.checked = true;
        body.classList.add('dark-mode');
    }
    else {
        darkModeCheckbox.checked = false;
        body.classList.remove('dark-mode');
    }

    if(localStorage.getItem('rotate-button') === 'false') {
        rotateButtonCheckbox.checked = false;
        rotateBtn.style.display = 'none'
    }
    else {
        rotateButtonCheckbox.checked = true;
    }
}

function resetCalculator() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
}

function callNotification(text) {
    const textNotification = document.getElementById("textNotification");

    textNotification.innerHTML = text;
    notification.style.display = 'block';
}

function closeNotification(e) {
    notification.style.display = 'none';
}
