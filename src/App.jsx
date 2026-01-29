import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Services from "./components/Services";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import BrowseProducts from "./components/pages/BrowseProducts";
import store from "./redux/store/store";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetail from "./components/pages/ProductDetail";
import Cart from "./components/pages/Cart";
import { Toaster } from "react-hot-toast";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";

function App() {
  return (
    <Provider store={store}>
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111113", // Matches your Obsidian theme
            color: "#F9FAFB",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0px", // Sharp professional corners
            fontSize: "10px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          },
        }}
      />
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#0a0a0b] text-slate-300 antialiased">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* --- MAIN APP ROUTES (With Navbar/Footer) --- */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <main>
                          <Hero />
                          <Categories />
                          <Services />
                          <Products />
                          <Testimonials />
                        </main>
                      }
                    />
                    <Route path="/products" element={<BrowseProducts />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
