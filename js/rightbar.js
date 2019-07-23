class Righbar extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "closed" })
    }

    async connectedCallback() {
        let response = await Promise.all([fetch("../chunks/rightbar.html"), fetch("../css/rightbar.css")])
        let text = await Promise.all([response[0].text(), response[1].text()])
        this.shadow.innerHTML = text[0]
        this.shadow.appendChild(document.createElement("style")).textContent = text[1]
        this.addElem()
    }

    addElem() {
        let shadow = this.shadow;
        let burgerMenu = shadow.querySelector("input")
        let hidden = shadow.querySelector("aside")
    
        burgerMenu.onclick = function (event) {
            hidden.classList.value.includes("right-sidebar-hidden") ? hidden.classList.remove("right-sidebar-hidden") :
                hidden.classList.add("right-sidebar-hidden")
        }
        const category = ["sky", "water", "drive", "other", "mountains", "show all category"];
        let [first, second, third, forth, fifth, sixth] = category;
        let textA = shadow.querySelectorAll("a");
        [first, second, third, forth, fifth, sixth].forEach((elem, index) => textA[index].textContent = elem.toUpperCase());
        textA.forEach(elem => elem.onclick = click)

        let cardInfo

        function click(event) {
            event.preventDefault();
            location.hash = `${event.target.textContent.toLowerCase()}`;
            burgerMenu.click();
        }

        async function create(name) {
            let info = await (
                await fetch("https://fea13-anton.glitch.me/items")).json()
            name === "show all category" ? cardInfo = info.filter(x => x.category !== "no") :
                cardInfo = info.filter(x => x.category === name);
            createCard()
        }

        function createCard() {
            document.querySelector("main").innerHTML = ""
            let holder = document.createElement("div")
            holder.classList.add("holder")
            document.querySelector("main").appendChild(holder)
            cardInfo.forEach(item => {
                let card = document.createElement("card-elem")
                holder.appendChild(card)
                card.classList.add("card")
                card.setAttribute("changecard", JSON.stringify(item))
            })
        }

        location.hash === "" ? create("show all category") : locationHashChanged()
        window.onhashchange = locationHashChanged

        function locationHashChanged(event) {
            switch (location.hash) {
                case "#main":
                    create("show all category")
                    break
                case "#sky":
                    create("sky")
                    break
                case "#water":
                    create("water")
                    break
                case "#drive":
                    create("drive")
                    break
                case "#other":
                    create("other")
                    break
                case "#mountains":
                    create("mountains")
                    break
                case "#show%20all%20category":
                    create("show all category")
                    break
                default:
                    break
            }
        }
    }

}
customElements.define("right-side-bar", Righbar)

