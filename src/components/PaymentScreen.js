import React, { useEffect, useState } from "react";
import "./PaymentScreen.css";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { LinearProgress, CircularProgress } from "@material-ui/core";
import { io } from "socket.io-client";

const PaymentScreen = () => {
  const location = useLocation();
  const history = useHistory();

  const amount = location.state.detail;

  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  //
  useEffect(() => {
    fetch(
      `https://api.qrserver.com/v1/create-qr-code/?data=${amount}&size=200x200`,
      {
        method: "GET",
      }
    ).then((response) => {
      if (response.ok) {
        setIsLoading(false);
        setQrCodeUrl(response.url);
      } else {
        console.log("error occured");
      }
    });

    const socket = io("wss://thawing-bayou-91298.herokuapp.com");

    socket.on("connect", () => {
      console.log("connected");

      socket.on("payment status", (msg) => {
        console.log(msg);
        if (msg === "success") {
          history.push("/");
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("disconnected"); // undefined
    });

    /*  socket.on("finishPayment", (msg) => {
      console.log(msg);
        if (msg === true) {
        history.push("/");
      }
    }); */
  }, []);

  return (
    <div className="paymentScreen">
      {isLoading && (
        <div className="loadingScreen">
          <LinearProgress className="loadingScreen__progressBar" />
        </div>
      )}
      {!isLoading && (
        <div className="paymentScreenDiv">
          {qrCodeUrl && (
            <div className="paymentScreenDiv__imageDiv">
              <img src={qrCodeUrl} alt="Logo" />
            </div>
          )}
          <h1>{"₹ " + amount}</h1>
        </div>
      )}
      {!isLoading && (
        <div className="waitingForPaymentDiv">
          <div className="waitingForPaymentDiv__content">
            <h2>Waiting for Payment</h2>
            <CircularProgress />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
