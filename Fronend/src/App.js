import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Footer from "./Components/Footer.js";
import Header from "./Components/Header.js";
import Home from "./pages/Home.js";
import Form from "./Form.js";

import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<Form />} />
      </Routes>
      {/* <Form /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
