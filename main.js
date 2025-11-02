class Product {
    constructor(title, price, description, urlImg) {
        this.title = title;
        this.price = price;
        this.urlImg = urlImg;
        this.description = description;
    }
}

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) {
            this.render();
        }
    }

    render() {}

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }

        if (attributes && attributes.length > 0) {
            for (const attribute of attributes) {
                rootElement.setAttribute(attribute.name, attribute.value);
            }
        }

        document.getElementById(this.hookId).append(rootElement);

        return rootElement;
    }
}

class ProductItem extends Component {
    constructor(product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render();
    }

    addToCart() {
        App.addProductToCart(this.product);
    }

    render() {
        const prodEl = this.createRootElement("li", "col-xl-3");
        prodEl.classList.add("col-md-6");
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
    }
}

class ShoppingCart extends Component {
    constructor(renderHookId) {
        super(renderHookId, false);
        this.orderProducts = () => {
            console.log("order now");
            console.log(this.items);
        };

        this.render();
    }

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

    // orderProducts() {
    //     console.log("order now");
    //     console.log(this.items);
    // }

    render() {
        const cartEl = this.createRootElement("div", "cart");
        cartEl.className = "cart";
        cartEl.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Tổng số tiền</h5>
                <p class="card-text">$${0}</p>
                <button href="#" class="btn btn-primary">Mua ngay</button>
            </div>
        `;
        const orderButton = cartEl.querySelector("button");
        // orderButton.addEventListener("click", this.orderProducts.bind(this));
        orderButton.addEventListener("click", this.orderProducts);
        // Cách 2:
        // orderButton.addEventListener("click", () => this.orderProducts());
        this.totalOutput = cartEl.querySelector("p");
    }
}

class ProductList extends Component {
    #products = [];
    constructor(renderHookId) {
        super(renderHookId, false);
        this.render();
        this.#fetchProducts();
    }

    #fetchProducts() {
        this.#products = [
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
        this.renderProducts();
    }

    renderProducts() {
        for (const product of this.#products) {
            new ProductItem(product, "prod-list");
        }
    }

    render() {
        const prodList = this.createRootElement("ul");
        prodList.id = "prod-list";
        prodList.classList.add("row", "g-3");
        if (this.#products && this.#products.length > 0) {
            this.renderProducts;
        }
    }
}

class Shop extends Component {
    constructor() {
        super();
    }

    render() {
        this.cart = new ShoppingCart("app");
        new ProductList("app");
    }
}

class App {
    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();
