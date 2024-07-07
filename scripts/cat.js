const catFace = document.getElementById("CatFace");
const catEars = document.getElementById("ears");
const catEyes = document.getElementById("Eyes");

if(isMobile()){
    //Function to make mobile devices have a more "fluid" experience
    catFace.style.transition = `transform .25s ease-in-out`;
    catEars.style.transition = `transform .25s ease-in-out`;

    //If it's the user's first visit on a mobile device, it shows a notification
    if (localStorage.getItem('visited') === null) {
        callNotification("Tente rotacionar o seu dispositivo :)")
        localStorage.setItem('visited', 'true');
    } else {
        console.log("Bem-vindo de volta!");
    }
}

document.addEventListener('mousemove', () => {
    //Make the mouse position fit a range
    let xFace = mapValue(event.clientX, 0, window.innerWidth, -28, -16);
    let yFace = mapValue(event.clientY, 0, window.innerHeight, -28, -10);
    let xEars = mapValue(event.clientX, 0, window.innerWidth, -47, -53);
    let yEars = mapValue(event.clientY, 0, window.innerHeight, -15, -30);

    //Move the cat's face and the cat's ears based on the mouse position
    catFace.style.transform = `translate(${xFace}%, ${yFace}%)`;
    catEars.style.transform = `translate(${xEars}%, ${yEars}%)`;
})

catFace.addEventListener('click', () => {
    playAnimation(catFace, 'tap-face--anim', 2000);
    playAnimation(catEars, 'tap-ears--anim', 2000);
    playAnimation(catEyes, 'tap-blink--anim', 2000);
})

function mapValue(value, minSource, maxSource, minTarget, maxTarget) {
    //function to make a number fit within some range
    return minTarget + ((value - minSource) * (maxTarget - minTarget) / (maxSource - minSource));
}

function playAnimation(element, animationClassName, delay) {
    element.classList.add(animationClassName);

    setTimeout(function() {
        element.classList.remove(animationClassName);
    }, delay);
}

function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileUserAgent = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    const isMobileWidth = window.innerWidth <= 800;
    return isMobileUserAgent && isMobileWidth;
}
