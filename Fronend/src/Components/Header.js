import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={styles.header}>
      <h1>My Website</h1>
        <nav>
            <ul style={styles.navList}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/about" style={styles.link}>About</Link></li>
            <li><Link to="/contact" style={styles.link}>Contact</Link></li>
            </ul>
        </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#282c34",
    padding: "20px",
    color: "white",
    textAlign: "center",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Header;
