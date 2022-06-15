import { useState } from "react";
import { confirmSubscription, createPaymentOrder } from "../../utils/api";
import "../../css/subscription.css";
import StarIcon from "@mui/icons-material/Star";
import { Grid, Typography, Paper } from "@mui/material";
const Unsubscribed = ({ user }) => {

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay(months) {
    const scr = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!scr) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const response = await createPaymentOrder({
      months: months,
    });
    const data = response.data;
    // console.log(data);

    const options = {
      key: "rzp_test_AXI56OsEQIewwJ",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      name: "VOD",
      description: "Make the payment to access the premium content.",
      //   image: "http://localhost:1337/logo.svg",
      handler: async function (response) {
        let confirmationBody = {
          id: user.attributes.sub,
          months: parseInt(months),
        };
        await confirmSubscription(confirmationBody);
      },
      prefill: {
        name: "",
        email: user.attributes.email,
        phone_number: "",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const subscribe = (months) => {
    // console.log("Selected Plan", selectedPlan);
    displayRazorpay(months);
    console.log("Subscribed");
  };
  return (
    <div class="container">
      <div class="header">
        <h2>Become a member</h2>
        <p>
          Discover the most exciting content, In this age of uncertainties, Get
          a view of real news around the globe.
        </p>
      </div>

      <div class="signup">
        <div class="google">
          <StarIcon />
          <a
            href="#"
            onClick={() => {
              subscribe("1");
            }}
          >
            For 1 month @ Rs.99
          </a>
        </div>
        <div class="fb">
          <StarIcon />
          <a
            href="#"
            onClick={() => {
              subscribe("6");
            }}
          >
            For 6 month @ Rs.569
          </a>
        </div>
        <div class="twitter">
          <StarIcon />
          <a
            href="#"
            onClick={() => {
              subscribe("12");
            }}
          >
            For 12 month @ Rs.899
          </a>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribed;
