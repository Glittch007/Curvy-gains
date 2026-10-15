import { useEffect, useState } from "react";
import AdminApp from "./AdminApp.jsx";
import { isSupabaseConfigured, supabase } from "./lib/supabase.js";
import Paystack from "@paystack/inline-js";
// Product images
import hardGainersImage from "./images/hard-gainers.jpeg";
import extremeHardGainersImage from "./images/extreme-hard-gainers.jpeg";
import threeInOneSyrupImage from "./images/three-in-one-syrup.jpeg";
import slimThickSyrupImage from "./images/slim-thick-syrup.jpeg";
import curvySyrupImage from "./images/curvy-syrup.png";
import curveBoosterBigImage from "./images/curve-booster-big.jpeg";
import curveBoosterSmallImage from "./images/curve-booster-small.jpeg";
import extraCurvesPillsImage from "./images/extra-curves-pills.jpeg";
import bootyBloomPowderImage from "./images/booty-bloom-powder.jpeg";
import boobsOilImage from "./images/boobs-oil.jpeg";
import hipDipOilImage from "./images/hip-dip-oil.jpeg";
import flatTummyTeaImage from "./images/flat-tummy-tea.jpeg";
import flatTummyPillsImage from "./images/flat-tummy-pills.jpeg";
import slimmingTeaImage from "./images/slimming-tea.jpeg";
import slimmingPillsImage from "./images/slimming-pills.jpeg";
import hotGelCreamImage from "./images/hot-gel-cream.jpeg";
import bblCreamBigImage from "./images/bbl-cream-big.jpeg";
import bblCreamSmallImage from "./images/bbl-cream-small.jpeg";
import bblGummiesImage from "./images/bbl-gummies.png";
const defaultProducts = [
  {
    id: "hard-gainers-combo",
    name: "Hard Gainers Combo",
    category: "Weight Gain",
    price: 220,
    image: hardGainersImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "extreme-hard-gainers-combo",
    name: "Extreme Hard Gainers Combo",
    category: "Weight Gain",
    price: 300,
    image: extremeHardGainersImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "3-in-one-syrup",
    name: "3 in One Syrup",
    category: "Syrups",
    price: 210,
    image: threeInOneSyrupImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "slim-thick-syrup",
    name: "Slim Thick Syrup",
    category: "Syrups",
    price: 200,
    image: slimThickSyrupImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "curvy-syrup",
    name: "Curvy Syrup",
    category: "Syrups",
    price: 200,
    image: curvySyrupImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "curve-booster-big",
    name: "Curve Booster Syrup 500 ml Big",
    category: "Syrups",
    price: 260,
    image: curveBoosterBigImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "curve-booster-small",
    name: "Curve Booster Syrup 250 ml Small",
    category: "Syrups",
    price: 165,
    image: curveBoosterSmallImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "extra-curves-pills",
    name: "Extra Curves Pills",
    category: "Pills",
    price: 170,
    image: extraCurvesPillsImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "booty-bloom-powder",
    name: "Booty Bloom Powder",
    category: "Powders",
    price: 0,
    image: bootyBloomPowderImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "boobs-oil",
    name: "Boobs Oil",
    category: "Oils",
    price: 140,
    image: boobsOilImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "hip-dip-oil",
    name: "Hip Dip Oil",
    category: "Oils",
    price: 100,
    image: hipDipOilImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "flat-tummy-tea",
    name: "Flat Tummy Tea",
    category: "Teas",
    price: 155,
    image: flatTummyTeaImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "flat-tummy-pills",
    name: "Flat Tummy Pills",
    category: "Pills",
    price: 150,
    image: flatTummyPillsImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "slimming-tea",
    name: "Slimming Tea",
    category: "Teas",
    price: 200,
    image: slimmingTeaImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "slimming-pills",
    name: "Slimming Pills",
    category: "Pills",
    price: 170,
    image: slimmingPillsImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "hot-gel-cream",
    name: "Hot Gel Cream",
    category: "Creams",
    price: 120,
    image: hotGelCreamImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "bbl-abidjan-cream-big",
    name: "BBL Abidjan Cream Big",
    category: "Creams",
    price: 300,
    image: bblCreamBigImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "bbl-abidjan-cream-small",
    name: "BBL Abidjan Cream Small",
    category: "Creams",
    price: 160,
    image: bblCreamSmallImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
  {
    id: "bbl-gummies",
    name: "BBL Gummies",
    category: "Gummies",
    price: 200,
    image: bblGummiesImage,
    in_stock: true,
    stock_quantity: 0,
    description: "",
    featured: false,
  },
];
const productImageMap = {
  "hard gainers combo": hardGainersImage,
  "extreme hard gainers combo": extremeHardGainersImage,
  "3 in one syrup": threeInOneSyrupImage,
  "slim thick syrup": slimThickSyrupImage,
  "curvy syrup": curvySyrupImage,
  "curve booster syrup 500 ml big": curveBoosterBigImage,
  "curve booster syrup 250 ml small": curveBoosterSmallImage,
  "extra curves pills": extraCurvesPillsImage,
  "booty bloom powder": bootyBloomPowderImage,
  "boobs oil": boobsOilImage,
  "hip dip oil": hipDipOilImage,
  "flat tummy tea": flatTummyTeaImage,
  "flat tummy pills": flatTummyPillsImage,
  "slimming tea": slimmingTeaImage,
  "slimming pills": slimmingPillsImage,
  "hot gel cream": hotGelCreamImage,
  "bbl abidjan cream big": bblCreamBigImage,
  "bbl abidjan cream small": bblCreamSmallImage,
  "bbl gummies": bblGummiesImage,
};
function normalizeProductName(name = "") {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
function getProductImage(product) {
  const normalizedName = normalizeProductName(product.name);
  if (productImageMap[normalizedName]) {
    return productImageMap[normalizedName];
  }
  const matchingKey = Object.keys(productImageMap).find(
    (key) =>
      normalizeProductName(key) === normalizedName ||
      normalizedName.includes(normalizeProductName(key)) ||
      normalizeProductName(key).includes(normalizedName)
  );
  return matchingKey ? productImageMap[matchingKey] : product.image || "";
}
function formatMoney(amount) {
  return `GH₵ ${Number(amount || 0).toFixed(2)}`;
}
function StoreApp() {
  const [products, setProducts] = useState(defaultProducts);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCartPage, setShowCartPage] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [storeError, setStoreError] = useState("");
  useEffect(() => {
    async function loadProducts() {
      if (!isSupabaseConfigured) {
        return;
      }
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("name", { ascending: true });
        if (error) {
          console.error("Unable to load products:", error.message);
          return;
        }
        if (data && data.length > 0) {
          setProducts(
            data.map((product) => ({
              ...product,
              image: getProductImage(product),
            }))
          );
        }
      } catch (error) {
        console.error("Product loading error:", error);
      }
    }
    loadProducts();
  }, []);
  function navigateTo(page) {
    setShowHomePage(page === "home");
    setShowCartPage(page === "cart");
    setShowCheckout(page === "checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function addToCart(product) {
    setStoreError("");
    if (product.in_stock === false) {
      setStoreError(`${product.name} is currently out of stock.`);
      return;
    }
    const availableStock = Number(product.stock_quantity);
    if (!Number.isFinite(availableStock) || availableStock <= 0) {
      setStoreError(`${product.name} is currently unavailable.`);
      return;
    }
    const existingItem = cart.find(
      (item) => String(item.id) === String(product.id)
    );
    if (existingItem) {
      if (existingItem.quantity >= availableStock) {
        setStoreError(
          `You cannot add more ${product.name}. Only ${availableStock} available.`
        );
        return;
      }
      setCart((previousCart) =>
        previousCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((previousCart) => [
        ...previousCart,
        { ...product, quantity: 1 },
      ]);
    }
    setStoreError("");
  }
  function increaseQuantity(productId) {
    const product = products.find(
      (item) => String(item.id) === String(productId)
    );
    const cartItem = cart.find(
      (item) => String(item.id) === String(productId)
    );
    if (!product || !cartItem) {
      return;
    }
    const availableStock = Number(product.stock_quantity);
    if (
      !Number.isFinite(availableStock) ||
      cartItem.quantity >= availableStock
    ) {
      setStoreError(
        `Only ${Math.max(0, availableStock || 0)} unit(s) of ${
          product.name
        } are available.`
      );
      return;
    }
    setCart((previousCart) =>
      previousCart.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    setStoreError("");
  }
  function decreaseQuantity(productId) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          String(item.id) === String(productId)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    setStoreError("");
  }
  function removeFromCart(productId) {
    setCart((previousCart) =>
      previousCart.filter((item) => String(item.id) !== String(productId))
    );
    setStoreError("");
  }
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price || 0) * item.quantity,
    0
  );
  const categories = [
    "All",
    "Weight Gain",
    "Syrups",
    "Pills",
    "Oils",
    "Teas",
    "Creams",
    "Powders",
    "Gummies",
  ];
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  function openCheckout() {
    if (cart.length === 0) {
      setStoreError("Your cart is empty.");
      return;
    }
    setStoreError("");
    navigateTo("checkout");
  }
  async function saveOrder(paymentReference) {
    const orderItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: Number(item.price),
      quantity: item.quantity,
      subtotal: Number(item.price) * item.quantity,
    }));
    const orderData = {
      customer_name: customerName.trim(),
      phone_number: phoneNumber.trim(),
      delivery_location: deliveryLocation.trim(),
      customer_email: customerEmail.trim(),
      payment_method: paymentMethod,
      payment_reference: paymentReference,
      total: cartTotal,
      items: orderItems,
      status: "Pending",
    };
    const { data: savedOrder, error: orderError } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();
    if (orderError) {
      console.error("Order saving error:", orderError);
      throw new Error(
        "Payment was successful, but we could not save your order automatically. Please contact the store with your payment reference: " +
          paymentReference
      );
    }
    for (const item of cart) {
      const product = products.find(
        (currentProduct) =>
          String(currentProduct.id) === String(item.id)
      );
      if (!product) {
        continue;
      }
      const currentStock = Number(product.stock_quantity);
      if (!Number.isFinite(currentStock)) {
        continue;
      }
      const newStock = Math.max(0, currentStock - item.quantity);
      const { error: stockError } = await supabase
        .from("products")
        .update({
          stock_quantity: newStock,
          in_stock: newStock > 0,
        })
        .eq("id", product.id);
      if (stockError) {
        console.error(
          `Stock update failed for ${product.name}:`,
          stockError
        );
      }
    }
    return savedOrder;
  }
  async function placeOrder(event) {
    event.preventDefault();
    setStoreError("");
    if (!isSupabaseConfigured) {
      setStoreError(
        "The store is not connected to the order system yet. Please try again later."
      );
      return;
    }
    if (cart.length === 0) {
      setStoreError("Your cart is empty.");
      return;
    }
    if (
      !customerName.trim() ||
      !phoneNumber.trim() ||
      !deliveryLocation.trim() ||
      !customerEmail.trim()
    ) {
      setStoreError("Please complete all your customer and delivery details.");
      return;
    }
    if (!paymentMethod) {
      setStoreError("Please select a payment method.");
      return;
    }
    if (cartTotal <= 0) {
      setStoreError("The total amount is invalid. Please check your cart.");
      return;
    }
    setOrderLoading(true);
    try {
      const paystack = new Paystack();
      const channels =
        paymentMethod === "Mobile Money"
          ? ["mobile_money"]
          : ["card"];
      paystack.checkout({
        key: "pk_test_341caf127ac848591208f07a246aa16bc5d4edf4",
        email: customerEmail.trim(),
        amount: Math.round(cartTotal * 100),
        currency: "GHS",
        channels,
        onSuccess: async (transaction) => {
          try {
            const reference =
              transaction?.reference ||
              transaction?.trxref ||
              `CG-${Date.now()}`;
            await saveOrder(reference);
            setCart([]);
            setShowCheckout(false);
            setShowCartPage(false);
            setShowHomePage(true);
            setCustomerName("");
            setPhoneNumber("");
            setDeliveryLocation("");
            setCustomerEmail("");
            setPaymentMethod("");
            setStoreError("");
            window.alert(
              `Payment successful! Your order has been saved.\n\nPayment reference: ${reference}\n\nYour order is now being processed. You will receive an SMS when your order is confirmed.`
            );
            window.scrollTo({ top: 0, behavior: "smooth" });
          } catch (error) {
            console.error("Order processing error:", error);
            setStoreError(
              error.message ||
                "There was a problem saving your order. Please contact the store."
            );
          } finally {
            setOrderLoading(false);
          }
        },
        onCancel: () => {
          setOrderLoading(false);
          setStoreError(
            "Payment was cancelled. Your cart has been kept so you can try again."
          );
        },
      });
    } catch (error) {
      console.error("Payment initialization error:", error);
      setOrderLoading(false);
      setStoreError(
        error.message ||
          "We could not start the payment. Please try again."
      );
    }
  }
  return (
    <div className="store-app">
      {/* Product grid layout: five desktop columns, two mobile columns */}
      <style>{`
        .products-page .store-products-grid {
          display: grid !important;
          grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
          gap: 20px !important;
          width: 100% !important;
          align-items: stretch;
        }
        .products-page .store-products-grid .product-card {
          width: 100% !important;
          min-width: 0 !important;
          margin: 0 !important;
          box-sizing: border-box;
        }
        .products-page .store-products-grid .product-card img {
          display: block;
          width: 100%;
          height: 220px;
          object-fit: contain;
        }
        @media (max-width: 1100px) {
          .products-page .store-products-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 600px) {
          .products-page .store-products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 12px !important;
          }
          .products-page .store-products-grid .product-card img {
            height: 150px;
          }
        }
      `}</style>
      <header className="header">
        <div className="brand">
          <h1>Curvy Gains</h1>
          <p>Your beauty, wellness and body goals</p>
        </div>
        <nav className="nav">
          <button
            type="button"
            onClick={() => navigateTo("home")}
            className={showHomePage ? "active" : ""}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => navigateTo("products")}
            className={
              !showHomePage && !showCartPage && !showCheckout
                ? "active"
                : ""
            }
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => navigateTo("cart")}
            className={showCartPage ? "active" : ""}
          >
            Cart ({cartCount})
          </button>
        </nav>
      </header>
      {storeError && (
        <div className="store-message" role="alert">
          <p>{storeError}</p>
          <button
            type="button"
            onClick={() => setStoreError("")}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}
      {/* HOME PAGE */}
      {showHomePage && (
        <main className="home">
          <section className="hero">
            <div className="hero-content">
              <h2>Welcome to Curvy Gains</h2>
              <h3>Your journey to your desired curves starts here.</h3>
              <p>
                Discover products for your beauty, wellness and body
                goals. Shop your favourites with Curvy Gains.
              </p>
              <button
                type="button"
                className="shop-now-button"
                onClick={() => navigateTo("products")}
              >
                Shop Now
              </button>
            </div>
          </section>
        </main>
      )}
      {/* PRODUCTS PAGE */}
      {!showHomePage && !showCartPage && !showCheckout && (
        <main className="products-page">
          <h2>Our Products</h2>
          <input
            className="search-input"
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={
                  selectedCategory === category ? "active" : ""
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="products-grid store-products-grid">
            {filteredProducts.map((product) => {
              const outOfStock =
                product.in_stock === false ||
                Number(product.stock_quantity) <= 0;
              return (
                <article className="product-card" key={product.id}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="product-image-placeholder">
                      Image unavailable
                    </div>
                  )}
                  <h3>{product.name}</h3>
                  {product.description && <p>{product.description}</p>}
                  <p className="product-price">
                    {formatMoney(product.price)}
                  </p>
                  <p className="product-stock">
                    {outOfStock ? "Out of Stock" : "In Stock"}
                  </p>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    disabled={outOfStock}
                  >
                    {outOfStock ? "Out of Stock" : "Add to Cart"}
                  </button>
                </article>
              );
            })}
          </div>
          {filteredProducts.length === 0 && (
            <p>No products match your search.</p>
          )}
        </main>
      )}
      {/* CART PAGE */}
      {showCartPage && (
        <main className="cart-page">
          <h2>Your Shopping Cart</h2>
          {cart.length === 0 ? (
            <>
              <p>Your cart is empty.</p>
              <button
                type="button"
                onClick={() => navigateTo("products")}
              >
                Continue Shopping
              </button>
            </>
          ) : (
            <>
              <div className="cart">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          minWidth: "80px",
                          maxWidth: "80px",
                          minHeight: "80px",
                          maxHeight: "80px",
                          objectFit: "contain",
                          flex: "0 0 80px",
                          display: "block",
                        }}
                      />
                    )}
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>{formatMoney(item.price)} each</p>
                      <div className="quantity-controls">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                      <p>
                        Subtotal:{" "}
                        {formatMoney(Number(item.price) * item.quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <h3>Cart Total: {formatMoney(cartTotal)}</h3>
              <button
                type="button"
                className="checkout-button"
                onClick={openCheckout}
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                onClick={() => navigateTo("products")}
              >
                Continue Shopping
              </button>
            </>
          )}
        </main>
      )}
      {/* CHECKOUT PAGE */}
      {showCheckout && (
        <main className="checkout">
          <h2>Checkout</h2>
          <form onSubmit={placeOrder}>
            <label htmlFor="customer-name">Full Name</label>
            <input
              id="customer-name"
              type="text"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              autoComplete="name"
              required
            />
            <label htmlFor="customer-phone">Phone Number</label>
            <input
              id="customer-phone"
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              autoComplete="tel"
              required
            />
            <label htmlFor="delivery-location">Delivery Location</label>
            <input
              id="delivery-location"
              type="text"
              value={deliveryLocation}
              onChange={(event) => setDeliveryLocation(event.target.value)}
              autoComplete="street-address"
              required
            />
            <label htmlFor="customer-email">Email Address</label>
            <input
              id="customer-email"
              type="email"
              value={customerEmail}
              onChange={(event) => setCustomerEmail(event.target.value)}
              autoComplete="email"
              required
            />
            <h3>Payment Method</h3>
            <label className="payment-option">
              <input
                type="radio"
                name="payment-method"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={() => setPaymentMethod("Card")}
                required
              />
              Debit or Credit Card
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment-method"
                value="Mobile Money"
                checked={paymentMethod === "Mobile Money"}
                onChange={() => setPaymentMethod("Mobile Money")}
              />
              Mobile Money
            </label>
            <div className="checkout-summary">
              <h3>Order Summary</h3>
              {cart.map((item) => (
                <p key={item.id}>
                  {item.name} × {item.quantity}:{" "}
                  {formatMoney(Number(item.price) * item.quantity)}
                </p>
              ))}
              <h3>Total: {formatMoney(cartTotal)}</h3>
            </div>
            <button
              type="submit"
              className="place-order-button"
              disabled={orderLoading || cart.length === 0}
            >
              {orderLoading
                ? "Processing..."
                : `Pay ${formatMoney(cartTotal)}`}
            </button>
            <button
              type="button"
              onClick={() => navigateTo("cart")}
              disabled={orderLoading}
            >
              Back to Cart
            </button>
          </form>
        </main>
      )}
      <footer className="footer">
        <p>
          ©️ {new Date().getFullYear()} Curvy Gains. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
export default function App() {
  if (window.location.pathname.startsWith("/admin")) {
    return <AdminApp />;
  }
  return <StoreApp />;
}