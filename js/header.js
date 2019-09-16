class Headertop extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })

  }
  static get observedAttributes() {

  }

  attributeChangedCallback(attrName, oldVal, newVall) {

  }

  async connectedCallback() {
    let response = await Promise.all([fetch("../chunks/header.html"), fetch("../css/header.css")])
    let text = await Promise.all([response[0].text(), response[1].text()])
    this.shadow.innerHTML = text[0]
    this.shadow.appendChild(document.createElement("style")).textContent = text[1]
    this.addElem()
  }

  addElem() {
    let name = this.shadow.querySelector("#user-name");
    let avatar = this.shadow.querySelector(".img-avatar");
    let enter = this.shadow.querySelector(".enter");
    let nameli = this.shadow.querySelector(".name");
    // let basket = this.shadow.querySelector(".icon-basket");
    let ava = this.shadow.querySelector(".avatar");
    let exit = this.shadow.querySelector(".exit");
    let plus = this.shadow.querySelector(".plus");
    let iconPlus = this.shadow.querySelector(".icon-plus");
    let user
    const url = "https://fea13-anton.glitch.me/users/";

    function showEnter() {
      [ava, nameli, exit].forEach(item => item.classList.remove("hidden"));
      enter.classList.add("hidden");
    }
    function hiddenExit() {
      [ava, nameli, exit].forEach(item => item.classList.add("hidden"));
      enter.classList.remove("hidden");
    }

    (function userCheck() {
      let res = document.cookie.split("; ").map(x => {
        var tmp = x.split("=")
        var elem = {}
        elem[tmp[0]] = tmp[1]
        return elem
      })
      let id
      let mail
      res.forEach(
        elem => elem.userEmail ? mail = elem.userEmail : null);
      res.forEach(
        elem => elem.userId ? id = elem.userId : null);
      id === undefined ? null :
        typeof mail === "string" ? Userinfo(id) : null

      async function Userinfo(id) {
        user = await (await fetch(`${url}${id}`)).json()

        user.id != id ? resetCookie() :
          user.email != mail ? resetCookie() : login()

      }
    })()

    enter.onclick = function (event) {
      document.body.addEventListener("registration", login);
      document.querySelector("main").appendChild(document.createElement("authorization-elem"))
    }

    this.shadow.querySelector(".logosvg").onclick = function (event) {
      // document.querySelector("main").innerHTML = "";
      location.hash = "main";
    }

    function login() {
      let userLS = JSON.parse(localStorage["userInfo"]);
      name.textContent = userLS.login;
      avatar.src = userLS.avatar;
      showEnter()
      userLS.role === "admin" ? checkAdmin() : null;
      document.body.removeEventListener("registration", login)
      async function checkAdmin() {
        let admin = await (await fetch(`${url}${userLS.id}`)).json()
        admin.role === userLS.role ? addRoleAdmin() : null
      }
    }

    function userChangeInfo() {
      let userLS = JSON.parse(localStorage["userInfo"]);
      name.textContent = userLS.login;
      avatar.src = userLS.avatar;
    }


    exit.onclick = function (event) {
      name.textContent = "";
      avatar.src = "img/1.jpg";
      adminExit();
      hiddenExit();
      resetCookie();
      let user = document.querySelector("user-elem");
      if (user == true) {
        null
      } else {
        user.classList.add("user-hidden");
        name.style.color = "inherit";
      }
    }

    function resetCookie() {
      localStorage.removeItem("userInfo");
      document.cookie = "userEmail=; expires=" +
        new Date(0).toUTCString()
      document.cookie = "userId=; expires=" +
        new Date(0).toUTCString()
    }

    function adminExit() {
      plus.classList.value.includes("hidden") ? null : plus.classList.add("hidden");
      document.querySelector("admin-elem") ? document.querySelector("admin-elem").remove() : null;
      iconPlus.onclick = null
    }

    function addRoleAdmin() {
      plus.classList.remove("hidden");
      iconPlus.onclick = function (event) {
        let adminForm = document.createElement("admin-elem")
        document.querySelector("admin-elem") ?
          (document.querySelector("admin-elem").remove(), this.style.color = "inherit") :
          (document.querySelector(".left").appendChild(adminForm), this.style.color = "#0023ff")
      }
    }

    name.onclick = function (event) {
      let user = document.querySelector("user-elem")
      if (user.classList.value.includes("user-hidden") == true) {
        user.classList.remove("user-hidden");
        this.style.color = "#0023ff";
        document.body.addEventListener("user", userChangeInfo);
        document.body.addEventListener("delete", delUser);
        document.body.dispatchEvent(new CustomEvent("userinfo"));
      }
      else {
        user.classList.add("user-hidden");
        this.style.color = "inherit";
        document.body.removeEventListener("user", userChangeInfo)
        document.body.removeEventListener("delete", delUser)
      }
    }
    function delUser() {
      document.body.removeEventListener("delete", delUser);
      exit.onclick()
    }


  }

}




customElements.define("header-top", Headertop)
