import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import Footer from "./Components/Footer.js";
import Header from "./Components/Header.js";

// Pages
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/Dashboard.js";
import BrowseOwners from "./pages/BrowseOwners.js";
import BrowseTenants from "./pages/BrowseTenants.js";
import PostAccommodation from "./pages/PostAccommodation.js";
import PostRoommate from "./pages/PostRoommate.js";
import MessageGenerator from "./Form.js";

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/browse-owners" element={<BrowseOwners />} />
            <Route path="/browse-tenants" element={<BrowseTenants />} />
            <Route path="/post-accommodation" element={<PostAccommodation />} />
            <Route path="/post-roommate" element={<PostRoommate />} />
            <Route path="/message-generator" element={<MessageGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
