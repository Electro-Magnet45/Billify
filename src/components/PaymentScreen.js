import React, { useEffect, useState } from "react";
import "./PaymentScreen.css";
import { useLocation } from "react-router-dom";

import { LinearProgress, CircularProgress } from "@material-ui/core";

const PaymentScreen = () => {
  const location = useLocation();

  const amount = location.state.detail;

  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  //
  useEffect(() => {
    fetch(
      `http://api.qrserver.com/v1/create-qr-code/?data=${amount}&size=200x200`,
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
