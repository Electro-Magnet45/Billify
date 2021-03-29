import React, { useEffect, useState } from "react";
import "./PaymentScreen.css";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { LinearProgress, CircularProgress } from "@material-ui/core";
import successAnimation from "../videos/billlfy__paymentScreen_sucess.mp4";
import { io } from "socket.io-client";

const PaymentScreen = () => {
  const location = useLocation();
  const history = useHistory();

  const amount = location.state.detail;

  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [didPay, setDidPay] = useState(false);

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
          setDidPay(true);
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, []);

  useEffect(() => {
    if (didPay) {
      document.getElementById("success__animePlayer").play();
      setTimeout(() => {
        history.push("/");
      }, 1700);
    }
  }, [didPay]);

  return (
    <div className="paymentScreen">
      {isLoading && (
        <div className="loadingScreen">
          <LinearProgress className="loadingScreen__progressBar" />
        </div>
      )}
      {!isLoading && (
        <div className="paymentScreenDiv">
          {qrCodeUrl && !didPay && (
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
            {!didPay && <h2>Waiting for Payment</h2>}
            {!didPay && <CircularProgress />}

            {didPay && (
              <video
                width="320"
                height="240"
                id="success__animePlayer"
                autoPlay={true}
                muted
              >
                <source src={successAnimation} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
