class Product {
    constructor(title, price, description, urlImg) {
        this.title = title;
        this.price = price;
        this.urlImg = urlImg;
        this.description = description;
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }

    addToCart() {
        App.addProductToCart(this.product);
    }

    render() {
        const prodEl = document.createElement("li");
        prodEl.classList.add("col-xl-3", "col-md-6");
        prodEl.innerHTML = `
            <div class="card">
                <img src="${this.product.urlImg}" class="card-img-top" alt="${this.product.title}">
                <div class="card-body">
                    <h5 class="card-title">${this.product.title}</h5>
                    <p class="card-text">${this.product.description}</p>
                    <p class="card-text">$${this.product.price}</p>
                    <button href="#" class="btn btn-primary">Thêm giỏ hàng</button>
                </div>
            </div>
        `;
        const addCarButton = prodEl.querySelector("button");
        addCarButton.addEventListener("click", this.addToCart.bind(this));
        return prodEl;
    }
}

class ShoppingCart {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<p class="card-text">$${this.totalAmount}</p>`;
    }

    get totalAmount() {
        const sum = this.items.reduce((prevValue, currentItem) => {
            return prevValue + currentItem.price;
        }, 0);
        return sum;
    }

    addProduct(product) {
        const updateItems = [...this.items];
        updateItems.push(product);
        this.cartItems = updateItems;
    }

    render() {
        const cartEl = document.createElement("div");
        cartEl.className = "cart";
        cartEl.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Tổng số tiền</h5>
                <p class="card-text">$${0}</p>
                <button href="#" class="btn btn-primary">Mua ngay</button>
            </div>
        `;
        this.totalOutput = cartEl.querySelector("p");
        return cartEl;
    }
}

class ProductList {
    products = [
        new Product(
            "Iphone 17 promax",
            30.187,
            "iPhone 17 sở hữu thiết kế sang trọng, màn hình Super Retina XDR sắc nét và chip A19 Bionic mạnh mẽ. Hiệu năng vượt trội, camera chụp đêm ấn tượng và pin bền bỉ mang đến trải nghiệm đẳng cấp.",
            "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_17_pro_512gb.jpg"
        ),
        new Product(
            "Iphone 16 promax",
            20.187,
            "iPhone 16 có thiết kế tinh tế, màn hình sáng rõ và hiệu năng mạnh mẽ nhờ chip A18 Bionic. Camera cải tiến giúp chụp ảnh sắc nét trong mọi điều kiện, pin dung lượng cao cho thời gian sử dụng lâu dài.",
            "https://bachlongstore.vn/vnt_upload/product/09_2024/8447141_Apple_iPhone_16_Pro_finish_lineup_240909.png"
        ),
        new Product(
            "Iphone 15 promax",
            16.187,
            "iPhone 16 sở hữu thiết kế sang trọng, màn hình Super Retina XDR sắc nét và chip A19 Bionic mạnh mẽ. Hiệu năng vượt trội, camera chụp đêm ấn tượng và pin bền bỉ mang đến trải nghiệm đẳng cấp.",
            "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_17_pro_512gb.jpg"
        ),
    ];
    constructor() {}

    render() {
        const prodList = document.createElement("ul");
        prodList.classList.add("row", "g-3");
        for (const product of this.products) {
            const productItem = new ProductItem(product);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }

        return prodList;
    }
}

class Shop {
    render() {
        const renderHook = document.querySelector("#app");
        // Cart 1:
        this.cart = new ShoppingCart();

        const cartEl = this.cart.render();
        const productList = new ProductList();
        const productListEl = productList.render();

        renderHook.append(cartEl);
        renderHook.append(productListEl);
    }
}

class App {
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();
