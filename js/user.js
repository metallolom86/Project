class UserAcc extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
  }

  async connectedCallback() {
    let response = await Promise.all([fetch("../chunks/user.html"), fetch("../css/user.css")])
    let text = await Promise.all([response[0].text(), response[1].text()])
    this.shadow.innerHTML = text[0]
    this.shadow.appendChild(document.createElement("style")).textContent = text[1]
    this.addElem()
  }

  addElem() {
    let avatar = this.shadow.querySelector("img");
    let user
    let file = this.shadow.querySelector("#file");
    let changeAvatar = this.shadow.querySelector(".change-avatar")
    let login = this.shadow.querySelector(".login");
    let inputLogin = this.shadow.querySelector("#name");
    let mail = this.shadow.querySelector(".email");
    let inputEmail = this.shadow.querySelector("#email");
    let tel = this.shadow.querySelector(".tel");
    let inputtel = this.shadow.querySelector("#tel");
    let okLogin = this.shadow.querySelector(".ok-login");
    let okEmail = this.shadow.querySelector(".ok-email");
    let okTel = this.shadow.querySelector(".ok-tel");
    let inputs = this.shadow.querySelectorAll("input")
    const url = "https://fea13-anton.glitch.me/users/";

    document.body.addEventListener("userinfo", getUSerInfo);

    function getUSerInfo() {
      user = JSON.parse(localStorage["userInfo"]);
      login.textContent = user.login;
      avatar.src = user.avatar;
      mail.textContent = user.email;
      tel.textContent = user.tel || "Tel"
    }

    file.onchange = function (event) {
      let reader = new FileReader
      reader.readAsDataURL(this.files[0])
      if (this.files[0].type.split('/')[0] !== 'image') {
        login.textContent = "File not image";
        setTimeout(() => login.textContent = user.login, 5000)
      } else if (this.files[0].size > 100 * 1024) {
        login.textContent = "Max size img 100Kb";
        setTimeout(() => login.textContent = user.login, 5000)
      } else {
        reader.onload = function (event) {
          avatar.src = this.result
        }
      }
    }

    changeAvatar.onclick = async function (event) {
      let response = await (
        await fetch(`${url}${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            avatar: avatar.src
          })
        })
      ).json()
      localStorage.setItem("userInfo", JSON.stringify(response));
      document.body.dispatchEvent(new CustomEvent("user"));
    }

    okLogin.disabled = !inputLogin.valid
    inputLogin.oninput = function (event) {
      event.target.valid = event.target.value.length > 3
      event.target.style.color = event.target.valid ? "green" : "red"
      okLogin.disabled = !event.target.valid
    }

    okLogin.onclick = async function (event) {
      let response = await (
        await fetch(`${url}${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            login: inputLogin.value
          })
        })
      ).json()
      localStorage.setItem("userInfo", JSON.stringify(response));
      login.textContent = inputLogin.value;
      resetInput();
      document.body.dispatchEvent(new CustomEvent("user"));
    }

    let reMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    okEmail.disabled = !inputEmail.valid
    inputEmail.oninput = function (event) {
      event.target.valid = reMail.test(event.target.value)
      event.target.style.color = event.target.valid ? "green" : "red"
      okEmail.disabled = !event.target.valid
    }

    okEmail.onclick = async function (event) {
      let response = await (
        await fetch(url)
      ).json()
      let reg = response.some(user => user.email === inputEmail.value.toLowerCase())
      reg === false ? changeEmail() : mail.textContent = "Email already exists"

      async function changeEmail() {
        let response = await (
          await fetch(`${url}${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: inputEmail.value
            })
          })
        ).json()
        localStorage.setItem("userInfo", JSON.stringify(response));
        mail.textContent = inputEmail.value.toLowerCase();
        document.cookie = `userEmail=${inputEmail.value.toLowerCase()}`;
        resetInput();
      }
    }

    okTel.onclick = async function (event) {
      inputtel.value.length < 9 ? null : send()
      async function send() {
        let response = await (
          await fetch(`${url}${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              tel: inputtel.value
            })
          })
        ).json()
        localStorage.setItem("userInfo", JSON.stringify(response));
        tel.textContent = inputtel.value;
        resetInput();
      }
    }

    function resetInput() {
      for (let input of inputs) {
        input.value = null
      }
    }

    let del = this.shadow.querySelector(".delete")
    del.onclick = async function (event) {
      let info = await (
        await fetch(url)).json();
      let admin = info.find(x => x.email === user.email);
      admin.role == "admin" ? adminNoDel() : dele()
    }
    function adminNoDel() {
      login.textContent = `ADMIN not deleted`;
      setTimeout(() => login.textContent = user.login, 5000)
    }
    function dele() {
      fetch(`${url}${user.id}`, { method: "DELETE" });
      document.body.dispatchEvent(new CustomEvent("delete"));
    }

  }

}

customElements.define("user-elem", UserAcc)
