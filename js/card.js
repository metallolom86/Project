// function addCard() {
//     var card = document.createElement("card-elem")
//     document.body.appendChild(card)
// }

class Card extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
    var template = `
    <link rel="stylesheet" href="css/normalize.css">
        <div class="card">
          <div id="img"><img src="" alt="item"></div>
          <h3 id="title"></h3>
          <p id="text"></p>
          <p id="card-id" class="hidden"></p>
          <span id="price"></span>
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
                
            .card {
              border: 2px solid #d0d0d0;
              border-radius: 20px;
              max-width: 320px;
              // margin: 5px auto;
              padding: 10px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              height: 420px;
              transition: 0.5s;
              background-color: #ffffff;
              overflow: hidden;
              position: relative;
            }
            
            h3 {
              color: #1f1f1f;
              justify-items: start;
              margin: 0;
            }
            
            img {
              cursor: pointer;
            }

            #img img {
              max-width: 300px;
            }
            
            #card p {
              padding: 0;
              margin: 0;
            }

            .card #text {
              width: 100%;
              padding: 0;
              margin: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding: 6px;
              align-self: flex-start;
            }
            
            #price {
              color: #0023ff;
            }
    
            #cross {
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
            
            #cross:active{
              transform: scale(0.8)
            }
            
            #cross:hover{
              color: red;
            }
    
            .icon-cross {
              font-size: 25px;
            }

            #img img {
              border-radius: 20px;
            }
    
            .hidden {
              display: none;
            }
            
            `
        return style
      })()

    )

  }

  connectedCallback() {
    
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
    let title = this.shadow.querySelector("#title");
    let text = this.shadow.querySelector("#text");
    let price = this.shadow.querySelector("#price");
    let cardId = this.shadow.querySelector("#card-id");
 
    img.src = info.photo;
    title.textContent = info.title;
    text.textContent = info.text;
    price.textContent = `${info.price}$`;
    cardId.textContent = info.id;

    this.shadow.querySelector("img").onclick = function (event) {
      let user = localStorage.getItem("userInfo");
      user ? fullCard() : noUser()
      
    }

    function fullCard() {
      let card = document.createElement("fullcard-elem")
      document.querySelector("main").appendChild(card)
      card.setAttribute("changecard", newVal)
    }

    function noUser() {
      let save = text.textContent;
      text.style.color = "red";
      text.textContent = "NEED AUTORIZATION";
      setTimeout(()=> {
        text.style.color = "inherit"
        text.textContent = save;
      } ,5000)
    }
    
  }

}

customElements.define("card-elem", Card)