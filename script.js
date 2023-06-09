function initialization () {
    let myName = window.prompt("Comment t'appelles-tu ?");
    let limit = window.prompt("Combien de cigarettes fumes-tu par jour ?");
    document.getElementById("userName").innerText = "Welcome back " + myName;
    document.getElementById("limit").innerText += " "+limit;
    document.getElementById("counter").innerText = `Running Counter : ${counter}`;
}


let counter = 0;
initialization();

const counterButton = document.getElementById("counterBtn");
counterButton.addEventListener('click', event => {
    counter++;
    document.getElementById("counter").innerText = `Running Counter : ${counter}`;
    });



let stickPrice = 0.58;
