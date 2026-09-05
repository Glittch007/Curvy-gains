import { useState } from "react"
const products = [
  {
    id: 1,
    name: "Hard Gainers Combo",
    category: "Weight Gain",
    price: 220,
    image: "/src/images/Hard gainers.jpeg"
  },
  {
    id: 2,
    name: "Extreme Hard Gainers Combo",
    category: "Weight Gain",
    price: 300,
    image: "/src/images/Extreme hard gainers combo.jpeg"
  },
  {
    id: 3,
    name: "3 in One Syrup",
    category: "Syrups",
    price: 210,
    image: "/src/images/curvy gain syrup 3 in 1.jpeg"
  },
  {
    id: 4,
    name: "Slim Thick Syrup",
    category: "Syrups",
    price: 200,
    image: "/src/images/Slim thick syrup.jpeg"
  },
  {
    id: 5,
    name: "Curvy Syrup",
    category: "Syrups",
    price: 200,
    image: "/src/images/curvy gain syrup.jpeg"
  },
  {
    id: 6,
    name: "Curve Booster Syrup 500 ml - Big",
    category: "Syrups",
    price: 260,
    image: "/src/images/curvy booster syrup.jpeg"
  },
  {
    id: 7,
    name: "Curve Booster Syrup 250 ml - Small",
    category: "Syrups",
    price: 165,
    image: "/src/images/Curvy booster syrupjpeg"
  },
  {
    id: 8,
    name: "Extra Curves Pills",
    category: "Pills",
    price: 170,
    image: "/src/images/exrtra curves pills.jpeg"
  },
  {
    id: 9,
    name: "Booty Bloom Powder",
    category: "Powders",
    price: 0,
    image: "/src/images/curvy bloom powder.jpeg"
  },
  {
    id: 10,
    name: "Boobs Oil",
    category: "Oils",
    price: 140,
    image: "https://placehold.co/600x600?text=Boobs+Oil"
  },
  {
    id: 11,
    name: "Hip Dip Oil",
    category: "Oils",
    price: 100,
    image: "https://placehold.co/600x600?text=Hip+Dip+Oil"
  },
  {
    id: 12,
    name: "Flat Tummy Tea",
    category: "Teas",
    price: 155,
    image: "https://placehold.co/600x600?text=Flat+Tummy+Tea"
  },
  {
    id: 13,
    name: "Flat Tummy Pills",
    category: "Pills",
    price: 150,
    image: "https://placehold.co/600x600?text=Flat+Tummy+Pills"
  },
  {
    id: 14,
    name: "Slimming Tea",
    category: "Teas",
    price: 200,
    image: "https://placehold.co/600x600?text=Slimming+Tea"
  },
  {
    id: 15,
    name: "Slimming Pills",
    category: "Pills",
    price: 170,
    image: "https://placehold.co/600x600?text=Slimming+Pills"
  },
  {
    id: 16,
    name: "Hot Gel Cream",
    category: "Creams",
    price: 120,
    image: "https://placehold.co/600x600?text=Hot+Gel+Cream"
  },
  {
    id: 17,
    name: "BBL Abidjan Cream (Big)",
    category: "Creams",
    price: 300,
    image: "https://placehold.co/600x600?text=BBL+Abidjan+Cream+Big"
  },
  {
    id: 18,
    name: "BBL Abidjan Cream (Small)",
    category: "Creams",
    price: 160,
    image: "https://placehold.co/600x600?text=BBL+Abidjan+Cream+Small"
  },
  {
    id: 19,
    name: "BBL Gummies",
    category: "Gummies",
    price: 200,
    image: "https://placehold.co/600x600?text=BBL+Gummies"
  }
]
function App() {
  const [cart, setCart] = useState([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showCartPage, setShowCartPage] = useState(false)
  const [showHomePage, setShowHomePage] = useState(true)
  const [customerName, setCustomerName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [deliveryLocation, setDeliveryLocation] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id)
    if (existingProduct) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }
  function increaseQuantity(id) {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }
  function decreaseQuantity(id) {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  function openCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty.")
      return
    }
    setShowCheckout(true)
    setShowCartPage(false)
    setShowHomePage(false)
  }
  function placeOrder() {
    if (
      !customerName ||
      !phoneNumber ||
      !deliveryLocation ||
      !paymentMethod
    ) {
      alert("Please complete all checkout fields.")
      return
    }
    alert(
      `Order placed successfully!\n\nCustomer: ${customerName}\nPhone: ${phoneNumber}\nDelivery: ${deliveryLocation}\nPayment: ${paymentMethod}\nTotal: GH₵ ${cartTotal}`
    )
  }
  return (
    <div>
      <header>
        <h1>Curvy Gains</h1>
        <nav>
          <button
            onClick={() => {
              setShowHomePage(true)
              setShowCartPage(false)
              setShowCheckout(false)
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              setShowHomePage(false)
              setShowCartPage(false)
              setShowCheckout(false)
            }}
          >
            Products
          </button>
          <button
            onClick={() => {
              setShowHomePage(false)
              setShowCartPage(true)
              setShowCheckout(false)
            }}
          >
            Cart 🛒 ({cartCount})
          </button>
        </nav>
      </header>
      {/* HOME PAGE */}
      {showHomePage && !showCartPage && !showCheckout && (
  <main className="hero">
    <div className="hero-content">
      <h2>Welcome to Curvy Gains</h2>

      <p>
        Your journey to your desired curves starts here.
      </p>

      <p className="hero-subtitle">
        Discover our range of products designed to support your beauty,
        wellness and body goals.
      </p>

      <button
        className="shop-now-button"
        onClick={() => {
          setShowHomePage(false)
          setShowCartPage(false)
          setShowCheckout(false)
        }}
      >
        Shop Now
      </button>
    </div>
  </main>
)}
      {/* CART PAGE */}
      {showCartPage && !showCheckout && (
        <main className="cart-page">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "contain"
                    }}
                  />
                  <h3>{item.name}</h3>
                  <p>
                    GH₵ {item.price} × {item.quantity}
                  </p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Subtotal: GH₵ {item.price * item.quantity}
                  </p>
                </div>
              ))}
              <h3>Total: GH₵ {cartTotal}</h3>
              <button
                className="checkout-button"
                onClick={openCheckout}
              >
                Checkout
              </button>
            </>
          )}
          <button
            onClick={() => {
              setShowCartPage(false)
              setShowHomePage(false)
            }}
          >
            Continue Shopping
          </button>
        </main>
      )}
      {/* PRODUCTS PAGE */}
      {!showHomePage && !showCartPage && !showCheckout && (
        <main id="home">
          <h2>Our Products</h2>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="category-buttons">
            <button onClick={() => setSelectedCategory("All")}>
              All
            </button>
            <button
              onClick={() => setSelectedCategory("Weight Gain")}
            >
              Weight Gain
            </button>
            <button onClick={() => setSelectedCategory("Syrups")}>
              Syrups
            </button>
            <button onClick={() => setSelectedCategory("Pills")}>
              Pills
            </button>
            <button onClick={() => setSelectedCategory("Oils")}>
              Oils
            </button>
            <button onClick={() => setSelectedCategory("Teas")}>
              Teas
            </button>
            <button onClick={() => setSelectedCategory("Creams")}>
              Creams
            </button>
            <button
              onClick={() => setSelectedCategory("Powders")}
            >
              Powders
            </button>
            <button
              onClick={() => setSelectedCategory("Gummies")}
            >
              Gummies
            </button>
          </div>
          <div className="products" id="products">
            {products
              .filter(
                product =>
                  (selectedCategory === "All" ||
                    product.category === selectedCategory) &&
                  product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map(product => (
                <div
                  className="product-card"
                  key={product.id}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <p>GH₵ {product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
          {/* CART SUMMARY ON PRODUCTS PAGE */}
          <div className="cart" id="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map(item => (
                  <div
                    className="cart-item"
                    key={item.id}
                  >
                    <h3>{item.name}</h3>
                    <p>
                      GH₵ {item.price} × {item.quantity}
                    </p>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p>
                      Subtotal: GH₵{" "}
                      {item.price * item.quantity}
                    </p>
                  </div>
                ))}
                <h3>Total: GH₵ {cartTotal}</h3>
                <button
                  className="checkout-button"
                  onClick={openCheckout}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </main>
      )}
      {/* CHECKOUT PAGE */}
      {showCheckout && (
        <main className="checkout">
          <h2>Checkout</h2>
          <h3>Order Total: GH₵ {cartTotal}</h3>
          <input
  type="text"
  placeholder="Full Name"
  name="fullName"
  autoComplete="name"
  value={customerName}
  onChange={(e) => setCustomerName(e.target.value)}
/>
          <input
  type="tel"
  placeholder="Phone Number"
  name="phone"
  autoComplete="tel"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
/>
          <input
  type="text"
  placeholder="Delivery Location"
  name="deliveryLocation"
  autoComplete="street-address"
  value={deliveryLocation}
  onChange={(e) => setDeliveryLocation(e.target.value)}
/>
          <h3>Payment Method</h3>
          <label>
  <input
    type="radio"
    name="paymentMethod"
    value="MoMo"
    checked={paymentMethod === "MoMo"}
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  Mobile Money (MoMo)
</label>

<label>
  <input
    type="radio"
    name="paymentMethod"
    value="Card"
    checked={paymentMethod === "Card"}
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  Card
</label>
          <button
            className="place-order-button"
            onClick={placeOrder}
          >
            Place Order
          </button>
          <button
            onClick={() => {
              setShowCheckout(false)
              setShowCartPage(true)
            }}
          >
            Back to Cart
          </button>
        </main>
      )}
    </div>
  )
}
export default App