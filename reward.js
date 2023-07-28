window.onload = () => {

    let user = JSON.parse(localStorage.getItem("user"));

    document.getElementById("moneyBox").innerText = user.moneyBox;

}