//nef

const productGrid = document.getElementById("productGrid")
const seemore = document.getElementById("seemore")
const banner = document.getElementById("banner")

const words = ["AMAZING", "EXQUISITE", "LOVELY", "ASTOUNDING", "SHOCKING", "STUNNING"]

let functional = false
let show = 10

function basicRandom(max) {
    return Math.ceil(Math.random() * max)
}

banner.innerHTML = `
<h2>${words[basicRandom(words.length-1)]} DEALS!</h2>
<span>Limited time offer!</span>
`

function loadEverything(scrolling) {
    productGrid.innerHTML = ``
    fetch('https://neffbox.nyaco.tk/backend/marketplace.json').then(function(response) {
        return response.json();
    }).then(function(data) {
        // load the product grid
        functional = true
        let index = -1
    
        seemore.style.display = `none`
    
        data.forEach(item => {
    
            /*
            <div class="product">
                    <div class="usericon">
                        <div class="outline" style="background-image: url('https://neffbox.nyaco.tk/assets/icons/bases/neck_outline.gif');"></div>
                        <div style="background-image: url('https://neffbox.nyaco.tk/assets/icons/bases/white_neck_base.gif');"></div>
                        <div class="outline" style="background-image: url('https://neffbox.nyaco.tk/assets/icons/bases/circle_outline.gif');"></div>
                        <div style="background-image: url('https://neffbox.nyaco.tk/assets/icons/bases/white_circle_base.gif');"></div>
                    </div>
                    <span class="name">hey</span>
                    <div class="priceSection">
                        <span class="price">300p</span>
                        <button class="cart"><i class="fa-solid fa-plus"></i><i class="fa-solid fa-shopping-cart"></i></button>
                    </div>
                    <div class="review">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <span>(500)</span>
                    </div>
                </div>
            */
           index ++
    
           if (index >= show) return seemore.style.display = ``;
    
            if (item.type == "bundle") return;
            
            const product = document.createElement("div")
            product.classList.add("product")
            product.title = item.name
    
            // icon shenanigans
            const icon = document.createElement("div")
            icon.classList.add("usericon")
            if (item.type == "bases") {
                icon.innerHTML = `
                <div class="outline" style="background-image: url('https://neffbox.nyaco.tk/assets/icons/bases/neck_outline.gif');"></div>
                        <div style="background-image: url('https://neffbox.nyaco.tk/assets/icons/bases/${item.filename}_neck_base.gif');"></div>
                        <div class="outline" style="background-image: url('https://neffbox.nyaco.tk/assets/icons/bases/circle_outline.gif');"></div>
                        <div style="background-image: url('https://neffbox.nyaco.tk/assets/icons/bases/${item.filename}_circle_base.gif');"></div>
                `
            } else if (item.type == "cosmetics") {
                icon.innerHTML = `
                <div class="outline" style="background-image: url('https://neffbox.nyaco.tk/assets/icons/cosmetics/${item.filename}.gif');"></div>
                `
                if (item.filename == "mahoraga_wheel") {
                    icon.innerHTML = `
                    <div class="outline mahoraga" style="background-image: url('https://neffbox.nyaco.tk/assets/icons/cosmetics/${item.filename}.gif');"></div>
                    `
                }
            } else if (item.type == "mouth") {
                icon.innerHTML = `
                <div class="outline" style="background-image: url('https://neffbox.nyaco.tk/assets/icons/faces/mouth/${item.filename}.gif');"></div>
                `
            }else if (item.type == "eye") {
                icon.innerHTML = `
                <div class="outline" style="background-image: url('https://neffbox.nyaco.tk/assets/icons/faces/eye/${item.filename}.gif');"></div>
                `
            }
            
            
            const prodName = document.createElement("span")
            prodName.classList.add("name")
            prodName.innerHTML = item.name
    
            const priceSec = document.createElement("div")
            priceSec.classList.add("priceSection")
            const prodPrice = document.createElement("span")
            prodPrice.innerHTML = `${item.price} <i class="fa-solid fa-coins"></i>`
            const prodBtn = document.createElement("button")
            prodBtn.classList.add("cart")
            prodBtn.innerHTML = `<i class="fa-solid fa-plus"></i><i class="fa-solid fa-shopping-cart"></i>`
    
            const prodRev = document.createElement("div")
            prodRev.classList.add("review")

            let stars = basicRandom(5)

            for (let index = 0; index < 5; index++) {
                if (index <= stars) {
                    prodRev.innerHTML += `<i class="fa-solid fa-star"></i>`
                } else {
                    prodRev.innerHTML += `<i class="fa-regular fa-star"></i>`
                }

            }

            prodRev.innerHTML += `
            <span>(${basicRandom(100)})</span>`

            let roll = basicRandom(100)
            if (roll <= 25) {
                let off = basicRandom(100) + 10
                if (off >= 100) {
                    off = 90 + basicRandom(5)
                }
                product.classList.add("sale")
                icon.innerHTML += `
                <div class="outline" style="background-image: url('');z-index:99999;">
                <div class="salesDiv">
                <span>${off}% OFF!</span>
                </div>
                </div>
                `
                prodPrice.classList.add("sale")
                prodPrice.innerHTML = `${Math.ceil( item.price - (item.price * (off/100)) )} <i class="fa-solid fa-coins"></i>`
                prodPrice.innerHTML += `<span class="saled">(${item.price}<i class="fa-solid fa-coins"></i>)</span>`
            }   
    
            product.appendChild(icon)
            product.appendChild(prodName)
            product.appendChild(priceSec)
            priceSec.appendChild(prodPrice)
            priceSec.appendChild(prodBtn)
            product.appendChild(prodRev)
    
            productGrid.appendChild(product)
    
        });

        if (scrolling) {
            document.getElementById("footer").scrollIntoView()
        }
    
    });
}

loadEverything()

function openMore() {
    show += 5
    loadEverything(true)
}