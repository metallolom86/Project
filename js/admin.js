class Admin extends HTMLElement {

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "closed" })

    }

    async connectedCallback() {
        let response = await Promise.all([fetch("../chunks/admin.html"), fetch("../css/admin.css")])
        let text = await Promise.all([response[0].text(), response[1].text()])
        this.shadow.innerHTML = text[0]
        this.shadow.appendChild(document.createElement("style")).textContent = text[1]
        this.addElem()
    }

    static get observedAttributes() {
        // return ["visible"]
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

    }

    addElem() {
        let plus = this.shadow.querySelector("#add-card")
        let minus = this.shadow.querySelector("#del")
        let search = this.shadow.querySelector("#search")
        let pen = this.shadow.querySelector("#pen")
        let addCard = this.shadow.querySelector(".add-card")
        let del = this.shadow.querySelector(".del")
        let searItem = this.shadow.querySelector(".search")
        let divpen = this.shadow.querySelector(".pen")
        let main = document.querySelector("main")
        let shadow = this.shadow

        let button = [plus, minus, pen, search]
        button.forEach(x => x.onclick = visible)
        function visible(event) {
            [addCard, del, divpen, searItem].forEach(x => x.classList.add("hidden"));
            shadow.querySelector(`.${event.currentTarget.id}`).classList.remove("hidden");
            
        }

        let tit = this.shadow.querySelector("#title")
        let category = this.shadow.querySelector("#category")
        let text = this.shadow.querySelector("#text")
        let price = this.shadow.querySelector("#price")
        let file = this.shadow.querySelector("#file")
        let picture = this.shadow.querySelector("img")
        let addSubmit = this.shadow.querySelector("#add-submit")
        let inputs = this.shadow.querySelectorAll("input")

        function resetInput() {
            for (let input of inputs) {
                input.value = null
            }
            text.value = null
            picture.src = ""

        }

        addSubmit.onclick = function (event) {
            addCardItem()
        }

        file.onchange = function (event) {
            let reader = new FileReader
            reader.readAsDataURL(this.files[0])
            reader.onload = function (event) {
                picture.src = this.result
            }
        }

        function addCardItem() {
            fetch("https://fea13-anton.glitch.me/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: tit.value, category: category.value, text: text.value, price: price.value, photo: picture.src
                })
            })
            resetInput()
        }

        let delItem = this.shadow.querySelector(".del-items")
        let delUsers = this.shadow.querySelector(".del-users")
        let inputItems = this.shadow.querySelector("#items")
        let inputUsers = this.shadow.querySelector("#users")
        let delImg = this.shadow.querySelector(".del-img")
        let delP = this.shadow.querySelector(".del-p")
        let catDel = this.shadow.querySelector("#category-del")
        let delSubmit = this.shadow.querySelector(".del-submit")
        let number = this.shadow.querySelector("#number")

        delItem.onclick = async function (event) {
            inputUsers.value = ""
            reset();
            let info = await (
                await fetch("https://fea13-anton.glitch.me/items")).json();
            let card = info.find(x => x.title === inputItems.value)
            card ? additem() : null;
            function additem() {
                delImg.src = card.photo;
                delP.textContent = `ID: ${card.id}`
                catDel.value = "items"
                number.value = card.id
            }
        }

        delUsers.onclick = async function (event) {
            inputItems.value = ""
            reset();
            let info = await (
                await fetch("https://fea13-anton.glitch.me/users")).json();
            let user = info.find(x => x.email === inputUsers.value.toLowerCase());
            user ? additem() : null
            function additem() {
                delImg.src = user.avatar;
                delP.textContent = `ID: ${user.id}`
                catDel.value = "users"
                number.value = user.id
            }
        }

        function reset() {
            delImg.src = "";
            delP.textContent = `ID:`;
        }

        function resetDel() {
            for (let input of inputs) {
                input.value = null
            }
            delImg.src = "";
            delP.textContent = `DELETED`;
            setTimeout(() => delP.textContent = `ID:`, 5000)
        }

        delSubmit.onclick = async function (event) {
            catDel.value === "users" ? null : dele()
            let info = await (
                await fetch("https://fea13-anton.glitch.me/users")).json();
            let user = info.find(x => x.email === inputUsers.value.toLowerCase());
            user.role == "admin" ? adminNoDel() : dele()

        }

        function adminNoDel() {
            delP.textContent = `ADMIN not deleted`;
            setTimeout(() => delP.textContent = `ID:`, 5000)
        }

        function dele() {
            fetch(`https://fea13-anton.glitch.me/${catDel.value}/${number.value}`, { method: "DELETE" });
            resetDel()
        }

        let penItem = this.shadow.querySelector("#pen-items")
        let penSearch = this.shadow.querySelector(".pen-search")
        let penImg = this.shadow.querySelector(".pen-img")
        let penFile = this.shadow.querySelector("#pen-file")
        let penTitle = this.shadow.querySelector("#pen-title")
        let penCategory = this.shadow.querySelector("#pen-category")
        let penText = this.shadow.querySelector("#pen-text")
        let penPrice = this.shadow.querySelector("#pen-price")
        let penId = this.shadow.querySelector(".pen-id")
        let penSubmit = this.shadow.querySelector("#pen-submit")

        penFile.onchange = function (event) {
            let reader = new FileReader
            reader.readAsDataURL(this.files[0])
            reader.onload = function (event) {
                penImg.src = this.result
            }
        }

        penSearch.onclick = async function (event) {
            let info = await (
                await fetch("https://fea13-anton.glitch.me/items")).json();
            let card = info.find(x => x.title === penItem.value);
            card ? additem() : null
            function additem() {
                penImg.src = card.photo;
                penTitle.value = card.title;
                penCategory.value = card.category;
                penText.value = card.text;
                penPrice.value = card.price;
                penId.textContent = card.id
            }
        }

        penSubmit.onclick = function (event) {
            putCardItem()
        }

        function putCardItem() {
            fetch(`https://fea13-anton.glitch.me/items/${penId.textContent}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: penTitle.value, category: penCategory.value, text: penText.value, price: penPrice.value, photo: penImg.src
                })
            })
            resetInput();
            penImg.src = ""
        }

        let searchDone = this.shadow.querySelector(".search-done")
        let done = this.shadow.querySelector("#done")
        let orderUser = this.shadow.querySelector("#orders-user")
        let orderDate = this.shadow.querySelector("#orders-date")
        let searchOrder = this.shadow.querySelector(".search-order")
        let catDone = this.shadow.querySelector("#category-done")
        let numbOrder = this.shadow.querySelector("#number-order")
        let cangOrder = this.shadow.querySelector(".change-order")
        let pNumDel = this.shadow.querySelector(".num-order-del")
        let numOrderDel = this.shadow.querySelector("#order-number")
        let butOrderDel = this.shadow.querySelector(".order-number-del")
        let showAll = this.shadow.querySelector(".show-all")


        searchDone.onclick = async function (event) {
            let info = await (
                await fetch("https://fea13-anton.glitch.me/orders")).json();

            let don = info.filter(x => x.done === done.value);
            document.querySelector("main").innerHTML = ""
            let full = document.createElement("div")
            full.classList.add("full")
            main.appendChild(full)
            don.forEach(x => createP(x))
        }

        function createP(x) {
            let p = document.createElement("p")
            p.classList.add("orderlist")
            document.querySelector(".full").appendChild(p)
            // p.textContent = ` №: ${x.id}, ${x.date}, ${x.user}, ${x.tel}, ${x.title}, quantity: ${x.quantity}, done: ${x.done}, ${x.price}`
           let content = [`№: ${x.id}`, x.date, x.user, x.tel, x.title, `quantity: ${x.quantity}`, `done: ${x.done}`, x.price]
           content.forEach(item => {
            let span= document.createElement("span");
            span.classList.add("order");
            span.textContent = item;
            p.appendChild(span)
           })
         
        }

        searchOrder.onclick = async function (event) {
            let user
            let info = await (
                await fetch("https://fea13-anton.glitch.me/orders")).json();
            orderUser.value ? user = info.filter(x => x.user === orderUser.value.toLowerCase()) : null
            orderDate.value ? user = info.filter(x => x.date === orderDate.value) : null
            document.querySelector("main").innerHTML = ""
            let full = document.createElement("div")
            full.classList.add("full")
            main.appendChild(full)
            user.forEach(x => createP(x))
        }

        cangOrder.onclick = function (event) {
            fetch(`https://fea13-anton.glitch.me/orders/${numbOrder.value}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    done: catDone.value
                })
            })
        }

        showAll.onclick = async function (event) {
            document.querySelector("main").innerHTML = "";
            let user = await (
                await fetch("https://fea13-anton.glitch.me/users")).json();
            let full = document.createElement("div")
            full.classList.add("full")
            main.appendChild(full)
            let p = document.createElement("p")
            p.classList.add("orderlist")
            full.appendChild(p)
            user.forEach(x =>{
                p.textContent += ` ${x.email} : ${x.tel} ;`;
            })
        }

        butOrderDel.onclick = function (event) {
            fetch(`https://fea13-anton.glitch.me/orders/${numOrderDel.value}`, { method: "DELETE" });
            pNumDel.textContent = `№: ${numOrderDel.value} DELETED `
            setTimeout(() => pNumDel.textContent = "", 5000)
        }


    }
}

customElements.define("admin-elem", Admin)
