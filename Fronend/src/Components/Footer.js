import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} My Website. All Rights Reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#282c34",
    padding: "10px",
    color: "white",
    textAlign: "center",
    position: "relative",
    width: "100%",
    bottom: "0",
  },
};

export default Footer;
