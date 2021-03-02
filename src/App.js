import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BillingScreen from "./components/BillingScreen";
import NewProductScreen from "./components/NewProductScreen";
import BillTable from "./components/BillTable";
import PaymentScreen from "./components/PaymentScreen";

function App() {
  return (
    <div className="app">
      <h1 className="app__header">Bill</h1>
      <Router>
        <Switch>
          <Route exact path="/">
            <BillingScreen />
          </Route>
          <Route path="/new">
            <NewProductScreen />
          </Route>
          <Route path="/table">
            <BillTable />
          </Route>
          <Route path="/payment">
            <PaymentScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
