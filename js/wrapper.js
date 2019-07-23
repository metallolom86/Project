(function () {
    const promises = [customElements.whenDefined("wrapper-elem"),
    customElements.whenDefined("header-top"),
    customElements.whenDefined("right-side-bar"),
    customElements.whenDefined("authorization-elem"),
    customElements.whenDefined("card-elem"),
    customElements.whenDefined("fullcard-elem"),
    customElements.whenDefined("admin-elem"),
    customElements.whenDefined("user-elem")
    ]
    Promise.all(promises)
        .then(document.body.appendChild(document.createElement("wrapper-elem")))
})()

class Wrapp extends HTMLElement {

    constructor() {
        super()

    }

    async connectedCallback() {
        let response = await Promise.all([fetch("../chunks/wrapper.html"), fetch("../css/wrapper.css")])
        let text = await Promise.all([response[0].text(), response[1].text()])
        this.innerHTML = text[0]
        this.appendChild(document.createElement("style")).textContent = text[1]
        this.addElem()
    }

    static get observedAttributes() {
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

    }

    addElem() {
        let left = document.querySelector(".left")
        let user = document.createElement("user-elem")
        user.classList.add("user", "user-hidden")
        left.appendChild(user)
        let header = document.querySelector("header")
        let headerTop = document.createElement("header-top")
        header.appendChild(headerTop)
        let right = document.querySelector(".right")
        let rightSideBar = document.createElement("right-side-bar")
        right.appendChild(rightSideBar)

    }


}

customElements.define("wrapper-elem", Wrapp)
