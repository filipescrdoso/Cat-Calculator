const body = document.getElementById('body');
const calcBase = document.getElementById('calculator-base');
const settingsBtn = document.getElementById("settings");
const settingsMenu = document.getElementById("settingsMenu");
const settingsMenuBG = document.getElementById("settingsMenuBG");
const rotateBtn = document.getElementById("rotate");

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
    rotateBtn.style.display === 'none' ? rotateBtn.style.display = 'block' : rotateBtn.style.display = 'none';
}

function showSettings() {
    settingsMenu.classList.toggle('active');
    settingsMenuBG.classList.toggle('active');
}

function setDarkMode() {
    body.classList.toggle('dark-mode');
}