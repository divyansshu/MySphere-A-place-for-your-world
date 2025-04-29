import React from "react";
import {FaTimes} from 'react-icons/fa'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          <FaTimes style={styles.icon}/>
        </button>
        {children}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    position: "relative",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#333", // Ensure the button is visible
  },
  icon: {
    fontSize: "24px", // Adjust the size of the icon
    color: "#333", // Ensure the icon is visible
  },
};

export default Modal;
