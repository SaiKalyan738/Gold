function showSideBar() {
    const sidebar = document.querySelector('.side-nav-menu');
    sidebar.style.display = 'flex';
}

function closeSideBar() {
    const sidebar = document.querySelector('.side-nav-menu');
    sidebar.style.display = 'none';
}

const quotes = [
    { text: "Gold is the corpse of value... It still shines and dazzles, but it has no value anymore.", author: "Ludwig von Mises" },
    { text: "Gold is a treasure, and he who possesses it does all he wishes to in this world, and succeeds in helping souls into paradise.", author: "Christopher Columbus" },
    { text: "All that glitters is not gold.", author: "William Shakespeare, The Merchant of Venice" },
    { text: "Gold is money. Everything else is credit.", author: "J.P. Morgan" },
    { text: "Gold and silver are but merchandise, like everything else. Our treasure lies in our own abilities.", author: "John Locke" },
    { text: "Gold is a way of going long on fear.", author: "Warren Buffett" },
    { text: "Gold opens all locks, no lock will hold against the power of gold.", author: "George Herbert" },
    { text: "The desire of gold is not for gold. It is for the means of freedom and benefit.", author: "Ralph Waldo Emerson" },
    { text: "Gold cannot be pure, and people cannot be perfect.", author: "Chinese Proverb" },
    { text: "Gold is forever. It is beautiful, useful, and never wears out. And that, my friends, is why people desire it.", author: "Anonymous" },
    { text: "The lust for gold is a mad thing that knows no limits.", author: "Euripides" },
    { text: "Gold is a precious metal, but it is nothing compared to the value of true love and friendship.", author: "Anonymous" },
    { text: "Don't wait to buy gold. Buy gold and wait.", author: "Anonymous" },
    { text: "In the absence of the gold standard, there is no way to protect savings from confiscation through inflation.", author: "Alan Greenspan" },
    { text: "Gold has two significant elements: It has value and it can create value.", author: "Anonymous" }
  ];
  
  function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quote').textContent = quote.text;
    document.getElementById('author').textContent = `— ${quote.author}`;
  }
  
  window.onload = function() {
    generateQuote();
  };
  document.getElementById('logo-img').addEventListener('click', function() {
    window.location.href = this.src;
  });
  
/*============================  Image slideshow functionality  =============================*/

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'assets/gold-jewelery-1.jpg',
        'assets/gold-jewelery-3.jpg',
        'assets/gold-jewelery-4.jpg',
    ];

    let currentImageIndex = 0;
    const slideshow = document.getElementById('slideshow');

    const updateImage = () => {
        slideshow.src = images[currentImageIndex];
    };

    updateImage();

    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    }, 2000);
});  

/*============================================== Cart ================================================*/
document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.getElementById("cart-icon");
    const cartCount = document.getElementById("cart-count");
    const cartContent = document.querySelector(".cart-content");
    const productItems = document.querySelectorAll(".product");
    const cartElement = document.getElementById("cart");
    const closeShoppingButton = document.querySelector(".closeShopping");
    const totalElement = document.querySelector(".total");
    const overlay = document.getElementById("overlay");
  
    let cart = [];
  
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }
  
    function addToCart(product, quantity = 1) {
        const itemId = product.getAttribute("data-id");
        const existingProduct = cart.find(item => item.id === itemId);
  
        if (existingProduct) {
            existingProduct.quantity += quantity;
            existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
            alert(`Updated ${existingProduct.title} quantity to ${existingProduct.quantity}`);
        } else {
            const itemTitle = product.getAttribute("data-title");
            const itemPrice = parseInt(product.getAttribute("data-price").replace('₹', ''));
            const itemImage = product.querySelector(".product-img").src;
            const totalPrice = itemPrice * quantity;
  
            cart.push({ id: itemId, title: itemTitle, price: itemPrice, image: itemImage, quantity: quantity, totalPrice: totalPrice });
            alert(`Added ${quantity} ${itemTitle} to the cart!`);
        }
        updateCartCount();
        updateCartDisplay();
    }
  
    function updateCartDisplay() {
        cartContent.innerHTML = '';
        let total = 0;
  
        cart.forEach(function(item) {
            const cartBox = document.createElement("div");
            cartBox.classList.add("cart-box");
  
            const cartImg = document.createElement("img");
            cartImg.src = item.image;
            cartImg.classList.add("cart-img");
  
            const detailBox = document.createElement("div");
            detailBox.classList.add("detail-box");
  
            const cartTitle = document.createElement("div");
            cartTitle.classList.add("cart-product-title");
            cartTitle.textContent = item.title;
  
            const cartPrice = document.createElement("div");
            cartPrice.classList.add("cart-price");
            cartPrice.textContent = `₹${item.price}`;
  
            const cartQuantity = document.createElement("div");
            cartQuantity.classList.add("cart-quantity");
            const quantityText = document.createElement("span");
            quantityText.textContent = `Quantity: ${item.quantity}`;
  
            const quantityControls = document.createElement("div");
            quantityControls.classList.add("quantity-controls");
  
            const increaseBtn = document.createElement("button");
            increaseBtn.textContent = '+';
            increaseBtn.addEventListener("click", function() {
                updateQuantity(item.id, item.quantity + 1);
            });
  
            const decreaseBtn = document.createElement("button");
            decreaseBtn.textContent = '-';
            decreaseBtn.addEventListener("click", function() {
                if (item.quantity > 1) {
                    updateQuantity(item.id, item.quantity - 1);
                } else {
                    removeFromCart(item.id);
                }
            });
  
            quantityControls.appendChild(decreaseBtn);
            quantityControls.appendChild(increaseBtn);
  
            cartQuantity.appendChild(quantityText);
            cartQuantity.appendChild(quantityControls);
  
            const cartRemove = document.createElement("div");
            cartRemove.classList.add("cart-remove");
            cartRemove.innerHTML = '<i class="fa fa-trash"></i>';
            cartRemove.addEventListener("click", function() {
                removeFromCart(item.id);
            });
  
            detailBox.appendChild(cartTitle);
            detailBox.appendChild(cartPrice);
            detailBox.appendChild(cartQuantity);
  
            cartBox.appendChild(cartImg);
            cartBox.appendChild(detailBox);
            cartBox.appendChild(cartRemove);
  
            cartContent.appendChild(cartBox);
  
            total += item.totalPrice;
        });
  
        totalElement.textContent = `Total: ₹${total}`;
    }
  
    function updateQuantity(itemId, newQuantity) {
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            item.totalPrice = item.price * newQuantity;
            updateCartDisplay();
        }
    }
  
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartCount();
        updateCartDisplay();
    }
  
    productItems.forEach(function(product) {
        const addToCartButton = product.querySelector(".fa-bag-shopping");
        addToCartButton.addEventListener("click", function() {
            addToCart(product);
        });
    });
  
    cartIcon.addEventListener("click", function() {
        cartElement.classList.toggle("open");
        overlay.classList.toggle("visible");
    });
  
    overlay.addEventListener("click", function() {
        cartElement.classList.remove("open");
        overlay.classList.remove("visible");
    });
  
    closeShoppingButton.addEventListener("click", function() {
        cartElement.classList.remove("open");
        overlay.classList.remove("visible");
    });
  
    cartElement.classList.remove("open");
    overlay.classList.remove("visible");
});


