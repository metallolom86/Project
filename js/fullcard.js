function addCard() {
  var card = document.createElement("fullcard-elem")
  document.body.appendChild(card)
}

class Fullcard extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
    var template = `
    <link rel="stylesheet" href="../css/icomoon.css">
    <link rel="stylesheet" href="css/normalize.css">
    <div class="card-full">
      <button class="cross"><span class="icon-cross"></span></button>
      <div class="img"><img src="" alt="item"></div>
      <div class="options">
        <h3>Parachute jump</h3>
        <p class="text black"></p>
        <p id="card-id" class="hidden"></p>
        <p class="black">COST<span class="price">50$</span><br></p>
        <label for="number" class="form-row">QUANTITY
          <input id="number" type="tel" autocomplete="off" maxlength="1">
        </label>
        <label for="tel" class="form-row">Tel
          <input id="tel" type="tel" autocomplete="off" >
        </label>
        <button class="send">Issue order</button>
      </div>
      <div class="wrap hidden">
        <p class="closed">Your order is accepted.<br> Wait for the call.</p>
      </div>
    </div>
    `
    this.shadow.innerHTML = template

    this.shadow.appendChild(
      (() => {
        let style = document.createElement('style')
        style.textContent = `
          *, *::before, *::after {
            box-sizing: border-box;
          }
          
          .card-full {
            outline: 2px solid #ededef;
            width: 100%;
            height: calc(100% - 70px);
            padding: 10px;
            display: flex;
            margin: 0;
            padding: 0;
            flex-direction: column;
            align-items: center;
            background-color: #ffffff;
            overflow: hidden;
            position: fixed;
            left: 0;
            bottom:0;
            z-index: 5;
          }
          
          h3 {
            color: #1f1f1f;
            justify-items: start;
            margin: 0;
          }
          .img{
            width: 100%;
            height: 45%;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            outline: 2px solid #ededef;
          }
          .img img{
            width: 320px;
            padding: 0;
            margin: 0;
          }
          
          .options {
            height: 55%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            background-color: #f0f0f0;
            padding-bottom: 30px;
            outline: 2px solid #ededef;
            overflow: hidden;
          }

          .black,
          label {
            color: #3b3b3b;
          }
          
          .card-full  .text {
            width: 100%;
            padding: 10px 5px;
            margin: 5px;
            overflow-y: auto;
            align-self: flex-start;
          }
          
          .card-full  span {
            color: #0023ff;
            margin-left: 50px;
          }
          
          #number{
            width: 40px;
            border-radius: 20px;
            border: none;
            outline: none;
            margin-left: 20px;
            padding: 5px 15px;
          }
          
          #tel{
            width: 150px;
            border-radius: 20px;
            border: none;
            outline: none;
            margin-left: 20px;
            padding: 5px 15px;
          }
          
          .options button {
            background-color: #0023ff;
            color: #ffffff;
            border: none;
            outline: none;
            user-select: none;
            border-radius: 20px;
            padding: 10px 20px;
            box-shadow: 2px 2px 5px #000000;
            transition: 0.2s;
          }
          
          .options button:active {
            transform: scale(0.97);
            box-shadow: inset 2px 2px 5px #000000;
          }

          .cross {
            padding: 5px;
            position: absolute;
            color: #0023ff;
            top: 0;
            right: 0;
            cursor: pointer;
            border: none;
            outline: none;
            background: none;
            transition: 0.2s;
            user-select: none;
          }
          
          .cross:active {
            transform: scale(0.8)
          }
          
          .cross:hover {
            color: red;
          }
          
          .icon-cross {
            font-size: 25px;
          }

          .wrap {
            left:0;
            bottom:0;
            top:0;
            right: 0;
            position: fixed;
            z-index: 20;
            background-color: rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .closed {
            font-size: 18px;
            width: 320px;
            background-color: #ffffff;
            border: 2px solid #d0d0d0;
            padding: 50px;
            border-radius: 20px;
          }

          input {
            margin: 10px;
          }
          
          @media (min-width: 640px)  {
            .card-full {
              width: 100%;
              flex-direction: row;
            }
            .img {
              display: flex;
              align-items: center;
            }
            .options .text {
              width: 100%;
              margin: 0;
              text-overflow: ellipsis;
              overflow: hidden;
              overflow-y: auto;
              padding: 20px;
              white-space: normal;
            }
            .options{
              height: 100%;
            }
            .black{
              margin-bottom:5px;
            }

            .options button{
              margin: 10px;
            }
            .options {
              padding: 30px 20px 100px 20px;
            }
          
            .img img{
              width: 100%;
            }
          }
          
          @media (min-width: 768px) {
            .wrap {
              padding: 90px 0 0 0;
            }
            .img img{
              width: 100%;
            }
          }
          
          @media (min-width: 1024px) {
            .img {
              height: 100%;
              width: 60vw;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .img img {
              width: 100%;
            }
            .options {
              padding-bottom: 100px;
            }
          }
          
          @media (min-width: 1280px) {
            .card-full {
              position: absolute;
              width: 100%;
              height: calc(100% - 70px);
            }
            .img {
              height: 100%;
              width: 60vw;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }

          .hidden {
            display: none;
          }
          
          `
        return style
      })()
    )

  }


  static get observedAttributes() {
    return ["changecard"]
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.getCardInfo(newVal)
  }

  getCardInfo(newVal) {
    let info = JSON.parse(newVal)
    let img = this.shadow.querySelector("img");
    let title = this.shadow.querySelector("h3");
    let text = this.shadow.querySelector(".text");
    let price = this.shadow.querySelector(".price");
    let cardId = this.shadow.querySelector("#card-id");
    let user = JSON.parse(localStorage["userInfo"])

    img.src = info.photo;
    title.textContent = info.title;
    text.textContent = info.text;
    price.textContent = `${info.price}$`;
    cardId.textContent = info.id;



    this.shadow.querySelector(".cross").onclick = function (event) {
      end()
    }
    let end = () => this.remove()
    let input = this.shadow.querySelector("#number")
    let tel = this.shadow.querySelector("#tel")
    let send = this.shadow.querySelector(".send")
    user.tel ? sendTel() : null

    function validNumber() {
      let num = /^\d{1,}$/;
      return input.value > 0 && num.test(input.value)
    }

    function vlaidTel() {
      let num = /^\d{1,}$/;
      return tel.value.length > 9 && num.test(tel.value)
    }

    function validButton() {
      return validNumber() && vlaidTel()
    }

    send.disabled = true;
    input.oninput = function (event) {
      send.disabled = !validButton()
    }
    tel.oninput = function (event) {
      send.disabled = !validButton()
    }

    function sendTel() {
      tel.value = user.tel
   }
   let wrap = this.shadow.querySelector(".wrap")
    send.onclick = async function (event) {
      function formatDate(date) {
        if (date.indexOf(".") !== -1) return date;
        var mass = date.split("/")
        return [mass[1], mass[0], mass[2]].join(".")
      }
      let prc = info.price * input.value
      fetch("https://fea13-anton.glitch.me/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: user.email, title: title.textContent, tel: tel.value, quantity: input.value, done: "false", date: formatDate(new Date().toLocaleDateString()), price: `${prc}$`
        })
      })
      wrap.classList.remove("hidden")
    setTimeout(() => end() , 5000);
    }
  }



}

customElements.define("fullcard-elem", Fullcard)
