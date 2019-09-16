class Authorization extends HTMLElement {
  constructor() {
    super()
    let hash = location.hash
    location.hash = "autorization"
    let shadow = this.attachShadow({ mode: "closed" })
    var template = `
    <link rel="stylesheet" href="../css/icomoon.css">
    <div class="wrapper">
    <div class="reg-btn">
      <button>Sing in</button>
      <button>Sing up</button>
      <span class="icon-cross"></span>
    </div>
    <p class="show-error hidden"></p>
    <div class="login">
      <form action="#" method="GET">
        <label for="email-1" class="form-row">Email
          <input id="email-1" type="email" placeholder="Email" autocomplete="off">
        </label>
        <label for="password" class="form-row">Password
          <input id="password" type="password" placeholder="Password" autocomplete="off">
        </label>
      </form>
      <button id="submit" class="submit">Login</button>
    </div>
    <div class="registretion hidden">
      <form action="#" method="GET">
        <label for="name" class="form-row">Login
          <input id="name" type="text" placeholder="Name" autocomplete="off">
        </label>
        <label for="email-2" class="form-row">Email
          <input id="email-2" type="email" placeholder="Email" autocomplete="off">
        </label>
        <label for="pass-1" class="form-row">Password
          <input id="pass-1" type="password" placeholder="Password: xxxXXX123" autocomplete="off">
        </label>
        <label for="pass-2" class="form-row">Password
          <input id="pass-2" type="password" placeholder="Confirm password" autocomplete="off">
        </label>
        <input type="file" name="file" id="file" class="inputfile">
        <label for="file" class="form-file">Select avatar</label>
        <section>
          <img src="" alt="avatar" width="80">
        </section>
      </form>
      <button id="submit" class="submit">Registration</button>
    </div>
    </div>
        `
    shadow.innerHTML = template

    shadow.appendChild(
      (() => {
        let style = document.createElement('style')
        style.textContent = `
        *, *::before, *::after {
          box-sizing: border-box;
        }

        .wrapper {
          font-size: 18px;
          left:0;
          bottom:0;
          top:0;
          right: 0;
          display: flex;
          font-size: 18px;
          align-items: center;
          // justify-content: center; 
          flex-direction: column;
          padding-top: 50px;
          position: fixed;
          z-index: 20;
          background-color: rgba(0, 0, 0, 0.4);
        }
        
        .login,
        .registretion {
          width: 320px;
          border: 2px solid #d0d0d0;
          border-radius: 25px;
          padding: 25px 15px 0 15px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background-color: #ffffff;
        }
        
        .reg-btn,
        .form-row {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 1s;
        }
        
        .reg-btn {
          width: 320px;
        }
        
        label {
          user-select: none;
        }

        .icon-cross,
        .login button,
        .registretion button,
        .inputfile + label,
        .reg-btn button {
          font-size:18px;
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

        .icon-cross:active,
        .login button:active,
        .inputfile + label:active,
        .registretion button:active,
        .reg-btn button:active {
          transform: scale(0.97);
          box-shadow: inset 2px 2px 5px #000000;
        }
        
        input {
          border: 1px solid #d0d0d0;
          padding: 5px 10px;
          outline: none;
          background: none;
          font-size: 16px;
          width: 200px;
          border-radius: 20px;
        }
        
        input:focus {
          box-shadow: 2px 2px 5px #000000;
          outline: none;
        }
        
        .hidden {
          display: none;
        }
        
        .reg-ok{
          text-align: center;
          color: #0023ff;
          transition: 0.2s;
        }
        
        .show-error{
          font-size: 18px;
          padding: 5px 10px;
          width: 320px;
          border: 2px solid red;
          border-radius: 25px;
          text-align: center;
          color: red;
          margin-top: 0;
          background-color: #ffffff;
        }
        
        .inputfile {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          z-index: -1;
          position: absolute;
        }
        
        .form-file {
          width: 150px;
          text-align: center;
          display: block;
          margin: 0 auto 20px;
        
        }
        
        form img {
          width: 100px;
          max-height: 100px;
        }
        
        .submit {
          margin-bottom: 20px;
          text-align: center;
        }
        
        section {
          border: 2px solid #d0d0d0;
          width: 100px;
          border-radius: 30px;
          height: 100px;
          overflow: hidden;
          display: flex;
          margin: 0 auto 20px;
          align-items: center;
          justify-content: center;
        }

        .icon-cross {
          color: #ffffff;
          font-size: 18px;
          order: 2;
        }
        
        .reg-btn button:nth-child(1){
          order: 1;
        }
        .reg-btn button:nth-child(2){
          order: 3;
        }
        `
        return style
      })()
    )

    let showError = shadow.querySelector("p")
    let inputs = shadow.querySelectorAll("input")
    let login = shadow.querySelector(".login")
    let register = shadow.querySelector(".registretion")
    let singIn = shadow.querySelectorAll("button")[0]
    let submit = shadow.querySelectorAll("#submit")
    let file = shadow.querySelector("#file")
    let picture = shadow.querySelector("img")

    function resetInput() {
      for (let input of inputs) {
        input.value = null
      }
      picture.src = "img/1.jpg"
    }

    function delerror() {
      for (let input of inputs) {
        showError.textContent = ""
        showError.classList.add("hidden")
      }
    }

    function showP() {
      showError.classList.remove("hidden")
    }

    singIn.onclick = function (event) {
      register.classList.value.includes("hidden") ? console.log("null") :
        (register.classList.add("hidden"), login.classList.remove("hidden"), resetInput(), delerror())
    }

    let singUp = shadow.querySelectorAll("button")[1]
    singUp.onclick = function (event) {
      register.classList.value.includes("hidden") ? (register.classList.remove("hidden"), login.classList.add("hidden"), resetInput(), delerror()) : null
    }

    submit[0].onclick = function (event) {
      logIn()
    }

    submit[1].onclick = function (event) {
      regPostValidator()
    }

    file.onchange = function (event) {
      let reader = new FileReader
      reader.readAsDataURL(this.files[0])
      if ( this.files[0].type.split('/')[0] !== 'image' ) {
        showP(), showError.textContent = "File not image" 
      } else if (this.files[0].size > 100 * 1024){
        showP(), showError.textContent = "Max size img 100Kb" 
      }
      else{
        reader.onload = function (event) {
          picture.src = this.result
        }
      }
    }

    shadow.querySelector("#password").disabled = !shadow.querySelector("#email-1").valid;
    submit[0].disabled = !shadow.querySelector("#password").valid;
    let reMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    let rePass = /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    shadow.querySelector("#email-1").oninput = function (event) {
      event.target.valid = reMail.test(shadow.querySelector("#email-1").value)
      event.target.style.color = event.target.valid ? "blue" : "red"
      shadow.querySelector("#password").disabled = !event.target.valid
    }
    shadow.querySelector("#password").oninput = function (event) {
      event.target.valid = rePass.test(event.target.value)
      event.target.style.color = event.target.valid ? "blue" : "red"
      submit[0].disabled = !event.target.valid;
    }

    shadow.querySelector("#email-2").disabled = !shadow.querySelector("#name").valid;
    shadow.querySelector("#pass-1").disabled = !shadow.querySelector("#email-2").valid;
    shadow.querySelector("#pass-2").disabled = !shadow.querySelector("#pass-1").valid;
    submit[1].disabled = !shadow.querySelector("#pass-2").valid;
    shadow.querySelector("#name").oninput = function (event) {
      event.target.valid = event.target.value.length > 3
      event.target.style.color = event.target.valid ? "blue" : "red"
      shadow.querySelector("#email-2").disabled = !event.target.valid
    }
    shadow.querySelector("#email-2").oninput = function (event) {
      event.target.valid = reMail.test(event.target.value)
      event.target.style.color = event.target.valid ? "blue" : "red"
      shadow.querySelector("#pass-1").disabled = !event.target.valid
    }
    shadow.querySelector("#pass-1").oninput = function (event) {
      event.target.valid = rePass.test(event.target.value)
      event.target.style.color = event.target.valid ? "blue" : "red"
      shadow.querySelector("#pass-2").disabled = !event.target.valid
    }
    shadow.querySelector("#pass-2").oninput = function (event) {
      event.target.valid = event.target.value === inputs[4].value
      event.target.style.color = event.target.valid ? "blue" : "red"
      submit[1].disabled = !event.target.valid
    }
    let password = [shadow.querySelector("#password"), shadow.querySelector("#pass-2")]
    password.forEach((elem,index) => 
      elem.onkeyup =  function (event){
        event.keyCode === 13 ? submit[index].click() : null
      }
    );
   
  



    async function regPostValidator() {
      let response = await (
        await fetch(`https://fea13-anton.glitch.me/users`)
      ).json()
      let reg = response.some(user => user.email === inputs[3].value.toLowerCase())
      reg === false ? regPost() : (showP(), showError.textContent = "Email already exists")
    }

    async function regPost() {
      let pswd2 = Sha256.hash(shadow.querySelector("#pass-2").value)
      let response = await (
        await fetch("https://fea13-anton.glitch.me/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            login: inputs[2].value, role: "user", email: inputs[3].value.toLowerCase(), password: pswd2, avatar: picture.src
          })
        })).json()
      localStorage.setItem("userInfo", JSON.stringify(response))
      resetInput()
      enter()
    }

    async function logIn() {
      let pswd = Sha256.hash(inputs[1].value)
      let email = inputs[0].value.toLowerCase()
      let response = await (
        await fetch(`https://fea13-anton.glitch.me/users`)
      ).json()
      let user = response.find(x => x.email === email);
      user ? null : error()
      localStorage.setItem("userInfo", JSON.stringify(user))
      user.password === pswd ? enter() : error()
      function error() { showP(), showError.textContent = "Incorrect mail/password" }
    }

    shadow.querySelector(".icon-cross").onclick = function (event) {
      end();
      location.hash = "main"
    }

    let end = () => this.remove();
    let enter = () => {
      let user = JSON.parse(localStorage["userInfo"])
      document.cookie = `userEmail=${user.email}`;
      document.cookie = `userId=${user.id}`;
      document.body.dispatchEvent(new CustomEvent("registration"))
      this.remove()
      location.hash = hash 

    }

  }
}
customElements.define("authorization-elem", Authorization)