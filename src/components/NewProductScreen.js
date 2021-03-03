import React, { useState } from "react";
import "./NewProductScreen.css";
import { Link } from "react-router-dom";

import { TextField, Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const NewProductScreen = () => {
  //
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(Number);
  const [showModal, setShowModal] = useState(false);

  /* localStorage.setItem(
    "products",
    JSON.stringify([
      { name: "b", price: 1 },
      { name: "c", price: 1 },
      { name: "d", price: 1 },
    ])
  ); */

  const addProduct = () => {
    const products = JSON.parse(localStorage.getItem("products"));

    if (products) {
      products.filter((cls) => {
        if (productName.toLocaleLowerCase() === cls.name.toLocaleLowerCase()) {
          setShowModal(true);
        } else {
          const newProduct = { name: productName, price: productPrice };
          localStorage.setItem(
            "products",
            JSON.stringify([...products, newProduct])
          );
          setProductName("");
          setProductPrice(Number(0));
        }
      });
    } else {
      localStorage.setItem(
        "products",
        JSON.stringify([{ name: productName, price: productPrice }])
      );
      setProductName("");
      setProductPrice(Number(0));
    }
  };

  return (
    <div className="newProductScreen">
      <nav className="newProductScreen__nav">
        <ul>
          <li>
            <Link to="/">Back Home</Link>
          </li>
        </ul>
      </nav>
      {showModal && (
        <Snackbar
          open={showModal}
          autoHideDuration={6000}
          onClose={() => setShowModal(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setShowModal(false)}
            severity="error"
          >
            This Product Already Exits
          </MuiAlert>
        </Snackbar>
      )}
      <div className="newProductScreen__inputDiv">
        <TextField
          label="Enter New Product"
          className="newProductScreen__nameInput"
          variant="outlined"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextField
          label="Enter Price"
          type="number"
          className="newProductScreen__priceInput"
          variant="outlined"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className="newProductScreen__submitButton"
          onClick={addProduct}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default NewProductScreen;
