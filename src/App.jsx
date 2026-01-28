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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#0a0a0b] text-slate-300 antialiased selection:bg-blue-500/30 selection:text-blue-200">
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
        </div>
      </Router>
    </Provider>
  );
}

export default App;
