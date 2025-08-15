import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditBook from "./pages/EditBook";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // import toast CSS

function App() {
  const handleAdd = () => {
    console.log("Add Book clicked");

  };

  return (
    <Router>
      {/* Navbar */}
      <header style={styles.navbar}>
        <div style={styles.logo}>📚 Book Inventory</div>
      </header>

      {/* Main content */}
      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </main>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#2c3e50",
    color: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default App;
