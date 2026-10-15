import { useEffect, useState } from "react"
import { isSupabaseConfigured, supabase } from "./lib/supabase"
import "./admin.css"
import hardGainersImage from "./images/hard-gainers.jpeg"
import extremeHardGainersImage from "./images/extreme-hard-gainers.jpeg"
import threeInOneSyrupImage from "./images/three-in-one-syrup.jpeg"
import slimThickSyrupImage from "./images/slim-thick-syrup.jpeg"
import curvySyrupImage from "./images/curvy-syrup.png"
import curveBoosterBigImage from "./images/curve-booster-big.jpeg"
import curveBoosterSmallImage from "./images/curve-booster-small.jpeg"
import extraCurvesPillsImage from "./images/extra-curves-pills.jpeg"
import bootyBloomPowderImage from "./images/booty-bloom-powder.jpeg"
import boobsOilImage from "./images/boobs-oil.jpeg"
import hipDipOilImage from "./images/hip-dip-oil.jpeg"
import flatTummyTeaImage from "./images/flat-tummy-tea.jpeg"
import flatTummyPillsImage from "./images/flat-tummy-pills.jpeg"
import slimmingTeaImage from "./images/slimming-tea.jpeg"
import slimmingPillsImage from "./images/slimming-pills.jpeg"
import hotGelCreamImage from "./images/hot-gel-cream.jpeg"
import bblCreamBigImage from "./images/bbl-cream-big.jpeg"
import bblCreamSmallImage from "./images/bbl-cream-small.jpeg"
import bblGummiesImage from "./images/bbl-gummies.png"
const emptyProduct = {
  name: "",
  category: "Weight Gain",
  price: "",
  image: "",
  in_stock: true,
  stock_quantity: 0,
  description: "",
  featured: false,
}
const orderStatuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Out for delivery",
  "Delivered",
  "Cancelled",
]
const orderTabs = [
  {
    id: "pending",
    label: "Pending Orders",
    status: "Pending",
  },
  {
    id: "confirmed",
    label: "Confirmed Orders",
    status: "Confirmed",
  },
  {
    id: "processing",
    label: "Processing",
    status: "Processing",
  },
  {
    id: "delivery",
    label: "Out for Delivery",
    status: "Out for delivery",
  },
  {
    id: "history",
    label: "Order History",
    status: null,
  },
]
function normalizeProductName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
}
function getAdminProductImage(product) {
  const name = normalizeProductName(product.name)
  if (name.includes("extreme hard gainers combo")) {
    return extremeHardGainersImage
  }
  if (name.includes("hard gainers combo")) {
    return hardGainersImage
  }
  if (name.includes("3 in one syrup")) {
    return threeInOneSyrupImage
  }
  if (name.includes("slim thick syrup")) {
    return slimThickSyrupImage
  }
  if (name.includes("curvy syrup")) {
    return curvySyrupImage
  }
  if (
    name.includes("curve booster syrup") &&
    (name.includes("500 ml") || name.includes("big"))
  ) {
    return curveBoosterBigImage
  }
  if (
    name.includes("curve booster syrup") &&
    (name.includes("250 ml") || name.includes("small"))
  ) {
    return curveBoosterSmallImage
  }
  if (name.includes("extra curves pills")) {
    return extraCurvesPillsImage
  }
  if (name.includes("booty bloom powder")) {
    return bootyBloomPowderImage
  }
  if (name.includes("boobs oil")) {
    return boobsOilImage
  }
  if (name.includes("hip dip oil")) {
    return hipDipOilImage
  }
  if (name.includes("flat tummy tea")) {
    return flatTummyTeaImage
  }
  if (name.includes("flat tummy pills")) {
    return flatTummyPillsImage
  }
  if (name.includes("slimming tea")) {
    return slimmingTeaImage
  }
  if (name.includes("slimming pills")) {
    return slimmingPillsImage
  }
  if (name.includes("hot gel cream")) {
    return hotGelCreamImage
  }
  if (
    name.includes("bbl abidjan cream") &&
    name.includes("big")
  ) {
    return bblCreamBigImage
  }
  if (
    name.includes("bbl abidjan cream") &&
    name.includes("small")
  ) {
    return bblCreamSmallImage
  }
  if (name.includes("bbl gummies")) {
    return bblGummiesImage
  }
  return product.image || "/favicon.svg"
}
function normalizeOrderStatus(status) {
  return String(status || "Pending")
    .trim()
    .toLowerCase()
    .replace(/_/g, " ")
}
function getOrderStatus(order) {
  const status = normalizeOrderStatus(order.status)
  if (status === "pending") return "Pending"
  if (status === "confirmed") return "Confirmed"
  if (status === "processing") return "Processing"
  if (status === "out for delivery") {
    return "Out for delivery"
  }
  if (status === "delivered") return "Delivered"
  if (status === "cancelled" || status === "canceled") {
    return "Cancelled"
  }
  // Orders with missing or unrecognized statuses are
  // placed in Pending so they do not disappear from the dashboard.
  return "Pending"
}
function isHistoryOrder(order) {
  const status = getOrderStatus(order)
  return status === "Delivered" || status === "Cancelled"
}
function isProductAvailable(product) {
  return (
    product.in_stock === true &&
    Number(product.stock_quantity) > 0
  )
}
export default function AdminApp() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState("products")
  const [editing, setEditing] = useState(null)
  const [productForm, setProductForm] = useState(emptyProduct)
  const orderCounts = {
    pending: orders.filter(
      (order) => getOrderStatus(order) === "Pending"
    ).length,
    confirmed: orders.filter(
      (order) => getOrderStatus(order) === "Confirmed"
    ).length,
    processing: orders.filter(
      (order) => getOrderStatus(order) === "Processing"
    ).length,
    delivery: orders.filter(
      (order) =>
        getOrderStatus(order) === "Out for delivery"
    ).length,
    history: orders.filter(isHistoryOrder).length,
  }
  const selectedOrderTab = orderTabs.find(
    (item) => item.id === tab
  )
  const visibleOrders =
    tab === "history"
      ? orders.filter(isHistoryOrder)
      : selectedOrderTab?.status
        ? orders.filter(
            (order) =>
              getOrderStatus(order) === selectedOrderTab.status
          )
        : []
  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    let isMounted = true
    async function checkSession() {
      const { data, error } =
        await supabase.auth.getSession()
      if (!isMounted) return
      if (error) {
        setMessage(error.message)
      }
      setSession(data?.session ?? null)
      setLoading(false)
    }
    checkSession()
    const { data: listener } =
      supabase.auth.onAuthStateChange(
        (_event, nextSession) => {
          setSession(nextSession)
          setLoading(false)
        }
      )
    return () => {
      isMounted = false
      listener.subscription.unsubscribe()
    }
  }, [])
  useEffect(() => {
    if (session) {
      loadData()
    }
  }, [session])
  async function loadData() {
    if (!supabase) return
    setRefreshing(true)
    setMessage("")
    try {
      const [
        { data: productData, error: productError },
        { data: orderData, error: orderError },
      ] = await Promise.all([
        supabase
          .from("products")
          .select("*")
          .order("id"),
        supabase
          .from("orders")
          .select("*")
          .order("created_at", {
            ascending: false,
          }),
      ])
      const errors = [
        productError?.message,
        orderError?.message,
      ].filter(Boolean)
      if (errors.length > 0) {
        setMessage(errors.join(" | "))
        return
      }
      setProducts(productData || [])
      setOrders(orderData || [])
      setMessage(
        `Data refreshed successfully. ${
          (productData || []).length
        } products and ${(orderData || []).length} orders loaded.`
      )
    } catch (error) {
      setMessage(
        error.message || "Could not refresh data."
      )
    } finally {
      setRefreshing(false)
    }
  }
  async function login(event) {
    event.preventDefault()
    setMessage("Signing in...")
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })
    setMessage(error ? error.message : "")
  }
  async function logout() {
    await supabase.auth.signOut()
  }
  function startAdd() {
    setEditing("new")
    setProductForm({ ...emptyProduct })
  }
  function startEdit(product) {
    setEditing(product.id)
    setProductForm({
      name: product.name || "",
      category: product.category || "Weight Gain",
      price: product.price ?? "",
      image: product.image || "",
      in_stock: Boolean(product.in_stock),
      stock_quantity: product.stock_quantity ?? 0,
      description: product.description || "",
      featured: Boolean(product.featured),
    })
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  async function saveProduct(event) {
    event.preventDefault()
    if (!supabase) {
      setMessage("Supabase is not connected.")
      return
    }
    const quantity = Math.max(
      0,
      Number(productForm.stock_quantity) || 0
    )
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      stock_quantity: quantity,
      in_stock: Boolean(productForm.in_stock) && quantity > 0,
      featured: Boolean(productForm.featured),
      updated_at: new Date().toISOString(),
    }
    const query =
      editing === "new"
        ? supabase
            .from("products")
            .insert(payload)
            .select()
            .single()
        : supabase
            .from("products")
            .update(payload)
            .eq("id", editing)
            .select()
            .single()
    const { data, error } = await query
    if (error) {
      setMessage(
        `Could not save product: ${error.message}`
      )
      return
    }
    setProducts((current) =>
      editing === "new"
        ? [...current, data]
        : current.map((product) =>
            product.id === data.id ? data : product
          )
    )
    setEditing(null)
    setProductForm({ ...emptyProduct })
    setMessage("Product saved successfully.")
  }
  async function toggleStock(product) {
    if (!supabase) {
      setMessage("Supabase is not connected.")
      return
    }
    const currentlyAvailable = isProductAvailable(product)
    // Marking an available product out of stock preserves
    // its quantity so the owner can restock it later.
    // If a product has zero quantity, Mark In sets its
    // quantity to 1 as a minimal starting quantity.
    const nextInStock = !currentlyAvailable
    const currentQuantity = Math.max(
      0,
      Number(product.stock_quantity) || 0
    )
    const nextQuantity =
      nextInStock && currentQuantity === 0
        ? 1
        : currentQuantity
    const { data, error } = await supabase
      .from("products")
      .update({
        in_stock: nextInStock,
        stock_quantity: nextQuantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", product.id)
      .select()
      .single()
    if (error) {
      setMessage(
        `Could not update stock: ${error.message}`
      )
      return
    }
    setProducts((current) =>
      current.map((item) =>
        item.id === data.id ? data : item
      )
    )
    setMessage(
      `${product.name} is now ${
        nextInStock ? "IN STOCK" : "OUT OF STOCK"
      }${
        nextInStock && currentQuantity === 0
          ? ". Quantity was set to 1. Edit the product to enter the actual quantity."
          : "."
      }`
    )
  }
  async function deleteProduct(id) {
    if (!supabase) {
      setMessage("Supabase is not connected.")
      return
    }
    if (!window.confirm("Delete this product?")) return
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
    if (error) {
      setMessage(
        `Could not delete product: ${error.message}`
      )
      return
    }
    setProducts((current) =>
      current.filter((product) => product.id !== id)
    )
    setMessage("Product deleted successfully.")
  }
  async function updateOrderStatus(orderId, status) {
    if (!supabase) {
      setMessage("Supabase is not connected.")
      return
    }
    const previousOrders = orders
    const existingOrder = orders.find(
      (order) => String(order.id) === String(orderId)
    )
    if (!existingOrder) {
      setMessage(
        "Could not find this order. Refresh and try again."
      )
      return
    }
    const previousStatus = getOrderStatus(existingOrder)
    if (previousStatus === status) {
      setMessage(
        `Order #${orderId} is already ${status}.`
      )
      return
    }
    setMessage("Updating order status...")
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
        .select()
        .single()
      if (error) {
        setMessage(
          `Could not update order status: ${error.message}`
        )
        return
      }
      setOrders((current) =>
        current.map((order) =>
          String(order.id) === String(data.id)
            ? data
            : order
        )
      )
      const savedStatus = getOrderStatus(data)
      // Send confirmation SMS only when an order changes
      // to Confirmed and no successful send is recorded.
      if (
        savedStatus === "Confirmed" &&
        previousStatus !== "Confirmed" &&
        !data.confirmation_sms_sent_at
      ) {
        setMessage(
          `Order #${data.id} confirmed. Sending confirmation SMS...`
        )
        const {
          data: smsData,
          error: smsError,
        } = await supabase.functions.invoke("smooth-api", {
          body: {
            orderId: data.id,
          },
        })
        if (smsError) {
          console.error(
            "Confirmation SMS request failed:",
            smsError
          )
          setMessage(
            `Order #${data.id} is confirmed, but the SMS request failed. Check the smooth-api function logs before trying again.`
          )
          return
        }
        if (smsData?.warning) {
          setMessage(
            `Order #${data.id} is confirmed. SailUp accepted the SMS, but the sent record could not be saved. Check the database before retrying.`
          )
          return
        }
        if (!smsData?.success) {
          setMessage(
            `Order #${data.id} is confirmed, but SMS failed: ${
              smsData?.error || "Unknown error"
            }`
          )
          return
        }
        // Refresh the confirmation timestamp from Supabase.
        const {
          data: refreshedOrder,
          error: refreshError,
        } = await supabase
          .from("orders")
          .select("*")
          .eq("id", data.id)
          .single()
        if (!refreshError && refreshedOrder) {
          setOrders((current) =>
            current.map((order) =>
              String(order.id) ===
              String(refreshedOrder.id)
                ? refreshedOrder
                : order
            )
          )
        }
        if (smsData.alreadySent) {
          setMessage(
            `Order #${data.id} is confirmed. Its confirmation SMS was already recorded as sent.`
          )
          return
        }
        setMessage(
          `Order #${data.id} confirmed! SailUp accepted the confirmation SMS.`
        )
        return
      }
      if (
        savedStatus === "Delivered" ||
        savedStatus === "Cancelled"
      ) {
        setMessage(
          `Order #${data.id} moved to Order History.`
        )
      } else {
        setMessage(
          `Order #${data.id} moved to ${savedStatus} Orders.`
        )
      }
    } catch (error) {
      setOrders(previousOrders)
      setMessage(
        error.message ||
          "Could not update order status."
      )
    }
  }
  if (!isSupabaseConfigured) {
    return (
      <main className="admin-page">
        <section className="admin-card">
          <h1>Curvy Gains Admin</h1>
          <h2>Supabase is not connected yet</h2>
          <p>
            Add VITE_SUPABASE_URL and
            VITE_SUPABASE_ANON_KEY to your local{" "}
            <code>.env</code> file, then restart Vite.
          </p>
          <p>
            See <strong>supabase_schema.sql</strong> in
            the project for the database setup.
          </p>
        </section>
      </main>
    )
  }
  if (loading) {
    return (
      <main className="admin-page">
        <p>Loading...</p>
      </main>
    )
  }
  if (!session) {
    return (
      <main className="admin-page">
        <form
          className="admin-card admin-login"
          onSubmit={login}
        >
          <h1>Curvy Gains Admin</h1>
          <p>Store owner login</p>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
          {message && (
            <p className="admin-message">{message}</p>
          )}
        </form>
      </main>
    )
  }
  return (
    <main className="admin-page">
      <section className="admin-header">
        <div>
          <h1>Curvy Gains Admin</h1>
          <p>Manage the live store.</p>
        </div>
        <button
          className="secondary-button"
          onClick={logout}
        >
          Log Out
        </button>
      </section>
      <div className="admin-tabs">
        <button
          className={tab === "products" ? "active" : ""}
          onClick={() => setTab("products")}
        >
          Products ({products.length})
        </button>
        {orderTabs.map((orderTab) => (
          <button
            key={orderTab.id}
            className={
              tab === orderTab.id ? "active" : ""
            }
            onClick={() => setTab(orderTab.id)}
          >
            {orderTab.label} ({orderCounts[orderTab.id]})
          </button>
        ))}
        <button
          onClick={loadData}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      {message && (
        <p className="admin-message" role="status">
          {message}
        </p>
      )}
      {tab === "products" && (
        <>
          <div className="admin-toolbar">
            <h2>Products</h2>
            <button onClick={startAdd}>
              + Add Product
            </button>
          </div>
          {editing && (
            <form
              className="admin-card product-form"
              onSubmit={saveProduct}
            >
              <h2>
                {editing === "new"
                  ? "Add Product"
                  : "Edit Product"}
              </h2>
              <label>
                Name
                <input
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <label>
                Category
                <input
                  value={productForm.category}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      category: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <label>
                Price (GH₵)
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      price: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <label>
                Image URL
                <input
                  value={productForm.image}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      image: e.target.value,
                    })
                  }
                  placeholder="/src/images/example.jpeg or https://..."
                />
              </label>
              <label>
                Description
                <textarea
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Stock quantity
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={productForm.stock_quantity}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      stock_quantity: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <div className="check-row">
                <label>
                  <input
                    type="checkbox"
                    checked={productForm.in_stock}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        in_stock: e.target.checked,
                      })
                    }
                  />{" "}
                  In stock
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        featured: e.target.checked,
                      })
                    }
                  />{" "}
                  Featured
                </label>
              </div>
              <div>
                <button type="submit">
                  Save Product
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setEditing(null)
                    setProductForm({ ...emptyProduct })
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          <div className="admin-product-list">
            {products.map((product) => {
              const available = isProductAvailable(product)
              return (
                <article
                  className="admin-product"
                  key={product.id}
                >
                  <img
                    src={getAdminProductImage(product)}
                    alt={product.name}
                  />
                  <div className="admin-product-info">
                    <h3>{product.name}</h3>
                    <p>
                      {product.category} · GH₵{" "}
                      {product.price}
                    </p>
                    <p>
                      <span
                        className={
                          available
                            ? "stock good"
                            : "stock bad"
                        }
                      >
                        {available
                          ? "IN STOCK"
                          : "OUT OF STOCK"}
                      </span>
                      {" · "}Qty:{" "}
                      {Number(product.stock_quantity) || 0}
                      {product.featured
                        ? " · ⭐ Featured"
                        : ""}
                    </p>
                  </div>
                  <div className="admin-actions">
                    <button
                      onClick={() => toggleStock(product)}
                    >
                      {available ? "Mark Out" : "Mark In"}
                    </button>
                    <button
                      onClick={() => startEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="danger-button"
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </>
      )}
      {tab !== "products" && (
        <section>
          <h2>
            {selectedOrderTab?.label || "Orders"}
          </h2>
          <p>
            {tab === "history"
              ? "Delivered and cancelled orders are stored here for your records."
              : `Orders currently marked "${selectedOrderTab?.status}" appear here.`}
          </p>
          {visibleOrders.length === 0 ? (
            <div className="admin-card">
              <p>
                {tab === "history"
                  ? "No delivered or cancelled orders yet."
                  : "No orders in this panel yet."}
              </p>
            </div>
          ) : (
            <div className="orders-list">
              {visibleOrders.map((order) => (
                <article
                  className="admin-card order-card"
                  key={order.id}
                >
                  <div className="order-top">
                    <div>
                      <h3>Order #{order.id}</h3>
                      <p>
                        {order.created_at
                          ? new Date(
                              order.created_at
                            ).toLocaleString()
                          : "Date unavailable"}
                      </p>
                    </div>
                    <select
                      aria-label={`Status for order ${order.id}`}
                      value={getOrderStatus(order)}
                      onChange={(e) =>
                        updateOrderStatus(
                          order.id,
                          e.target.value
                        )
                      }
                    >
                      {orderStatuses.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p>
                    <strong>
                      {order.customer_name || "Customer"}
                    </strong>
                    {" · "}
                    {order.phone_number || "No phone number"}
                  </p>
                  <p>
                    {order.customer_email ||
                      "No email provided"}
                  </p>
                  <p>
                    {order.delivery_location ||
                      "No delivery location"}
                  </p>
                  <p>
                    Payment:{" "}
                    {order.payment_method || "Not specified"}
                    {order.payment_reference
                      ? ` · ${order.payment_reference}`
                      : ""}
                  </p>
                  <h3>
                    Total: GH₵ {order.total ?? 0}
                  </h3>
                  <details>
                    <summary>Items</summary>
                    <pre>
                      {JSON.stringify(
                        order.items,
                        null,
                        2
                      )}
                    </pre>
                  </details>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  )
}