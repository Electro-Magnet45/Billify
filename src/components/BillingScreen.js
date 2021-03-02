import React, { useEffect, useState } from "react";
import "./BillingScreen.css";
import ListItems from "./ListItems";
import { Link, useHistory } from "react-router-dom";
import BillTable from "./BillTable";

import { Button, TextField } from "@material-ui/core";
import List from "@material-ui/core/List";

const BillingScreen = () => {
  const [products, setProducts] = useState([]);
  const [filterString, setFilterString] = useState("");
  const [billingProducts, setBillingProducts] = useState([]);
  const [componentClicked, setComponentClicked] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [secondBilling, setSecondBilling] = useState(false);
  const [totalAmount, setTotalAmount] = useState(Number(0));

  const history = useHistory();
  const fullProducts = JSON.parse(localStorage.getItem("products"));

  const getProducts = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    setProducts(products);
  };

  const goToPayment = () => {
    history.push({
      pathname: "/payment",
      state: { detail: totalAmount },
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (filterString) {
      const word = filterString.toLocaleLowerCase();
      const result = products.filter((product) =>
        product.name.toLocaleLowerCase().includes(word)
      );
      setProducts(result);
    }

    if (!filterString) {
      setProducts(fullProducts);
    }
  }, [filterString]);

  useEffect(() => {
    if (componentClicked) {
      const clickedText = componentClicked;
      setFilterString("");

      var filteredProducts = [];

      for (let i = 0; i < products.length; i++) {
        if (products[i].name !== clickedText) {
          filteredProducts.push(products[i]);
        }
      }

      products.forEach((product) => {
        if (product.name === clickedText) {
          if (secondBilling === true) {
            setProducts(filteredProducts);
            setBillingProducts([...billingProducts, product]);
          } else {
            setSecondBilling(true);
            setProducts(filteredProducts);
            setBillingProducts([product]);
          }
          setShowTable(true);
        }
      });
    }
  }, [componentClicked]);

  useEffect(() => {
    if (showTable) {
      var newArray = [];

      billingProducts.forEach((billingProduct) => {
        newArray.push(Number(billingProduct.price));
      });

      var totalPrice = Number(0);

      for (var p = 0; p < newArray.length; p++) {
        totalPrice = newArray.reduce((a, b) => a + b, 0);
      }
      setTotalAmount(totalPrice);
    }
  }, [billingProducts]);

  return (
    <div className="billingScreen">
      <nav className="billingScreen__nav">
        <ul>
          <li>
            <Link to="/new">New Product</Link>
          </li>
        </ul>
      </nav>
      <div className="billingScreen__inputDiv">
        <TextField
          label="Name"
          className="billingScreen__input"
          variant="outlined"
          value={filterString}
          onChange={(e) => setFilterString(e.target.value)}
        />
      </div>
      {products && (
        <div className="billingScreen__listDiv">
          <List
            className="billingScreen__list"
            component="nav"
            aria-label="secondary mailbox folders"
          >
            {products.map((product) => {
              return (
                <ListItems
                  key={product.name}
                  text={product.name}
                  setComponentClicked={setComponentClicked}
                />
              );
            })}
          </List>
        </div>
      )}
      {showTable && (
        <div className="billingScreen__tableDiv">
          <BillTable products={billingProducts} />
        </div>
      )}

      {totalAmount != 0 ? (
        <div className="contiuneButtonDiv">
          <Button variant="contained" color="primary" onClick={goToPayment}>
            Contiune to Payment
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default BillingScreen;
