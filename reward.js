window.onload = async () => {

    let user = JSON.parse(sessionStorage.getItem("user"));

    document.getElementById("moneyBox").innerText = user.moneyBox;
    

}

class Gift {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}