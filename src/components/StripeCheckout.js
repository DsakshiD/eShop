// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   CardElement,
//   useStripe,
//   Elements,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useCartContext } from "../context/cart_context";
// import { useUserContext } from "../context/user_context";
// import { formatPrice } from "../utils/helpers";
// import { useHistory } from "react-router-dom";

// const promise = loadStripe(
//   "pk_test_51JIK5OSCBP9P0ml9hezb08wlcqOu4MrzfSRQjYGJjPCAtrQW3BpGgsgaM4fVnY1uAy64TEVbOcBeypmNKvr5HfDN005FSepaex"
// );

// const CheckoutForm = () => {
//   const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
//   const { myUser } = useUserContext();
//   const history = useHistory();
//   // STRIPE STUFF
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState("");
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();

//   const cardStyle = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: "Arial, sans-serif",
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#32325d",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//   };

//   const createPaymentIntent = async () => {
//     try {
//       const { data } = await axios.post(
//         "/.netlify/functions/create-payment-intent",
//         JSON.stringify({ cart, shipping_fee, total_amount })
//       );

//       setClientSecret(data.clientSecret);
//     } catch (error) {
//       // console.log(error.response)
//     }
//   };

//   useEffect(() => {
//     createPaymentIntent();
//     // eslint-disable-next-line
//   }, []);

//   const handleChange = async (event) => {
//     setDisabled(event.empty);
//     setError(event.error ? event.error.message : "");
//   };
//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     setProcessing(true);

//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       receipt_email: "aAaaa@vishal.com",
//       mandate_data: {
//         name: "vishal",
//         address: "vilklskadjsa",
//         phone_number: "123456",
//       },
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });
//     if (payload.error) {
//       setError(`Payment failed ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);
//       setTimeout(() => {
//         clearCart();
//         history.push("/");
//       }, 10000);
//     }
//   };

//   return (
//     <div>
//       {succeeded ? (
//         <article>
//           <h4>Thank you</h4>
//           <h4>Your payment was successful!</h4>
//           <h4>Redirecting to home page shortly</h4>
//         </article>
//       ) : (
//         <article>
//           <h4>Hello, {myUser && myUser.name}</h4>
//           <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>
//         </article>
//       )}
//       <form id="payment-form" onSubmit={handleSubmit}>
//         <input name="name" type="text" size="30" placeholder="Name" />
//         <br />
//         <input name="phone" type="number" size="30" placeholder="Phone" />
//         <br />
//         <textarea
//           name="address"
//           size="30"
//           rows={8}
//           cols={35}
//           placeholder="Address"
//         />
//         <br />
//         <input name="pin" type="number" size="30" placeholder="PIN Code" />
//         <br />
//         <CardElement
//           id="card-element"
//           options={cardStyle}
//           onChange={handleChange}
//         />
//         <button disabled={processing || disabled || succeeded} id="submit">
//           <span id="button-text">
//             {processing ? <div className="spinner" id="spinnier"></div> : "Pay"}
//           </span>
//         </button>
//         {/* Show any error that happens when processing the payment */}
//         {error && (
//           <div className="card-error" role="alert">
//             {error}
//           </div>
//         )}
//         {/* Show  a success message upon completion */}
//         <p
//           className={succeeded ? "result-message" : "result-message hidden"}
//           style={{ color: "green" }}
//         >
//           Payment successful
//         </p>
//       </form>
//     </div>
//   );
// };

// const StripeCheckout = () => {
//   return (
//     <Wrapper>
//       <Elements stripe={promise}>
//         <CheckoutForm />
//       </Elements>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`
//   form {
//     width: 30vw;
//     align-self: center;
//     box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
//       0px 2px 5px 0px rgba(50, 50, 93, 0.1),
//       0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
//     border-radius: 7px;
//     padding: 40px;
//   }
//   input {
//     border-radius: 6px;
//     margin-bottom: 6px;
//     padding: 12px;
//     border: 1px solid rgba(50, 50, 93, 0.1);
//     max-height: 44px;
//     font-size: 16px;
//     width: 100%;
//     background: white;
//     box-sizing: border-box;
//   }
//   .result-message {
//     line-height: 22px;
//     font-size: 16px;
//   }
//   .result-message a {
//     color: rgb(89, 111, 214);
//     font-weight: 600;
//     text-decoration: none;
//   }
//   .hidden {
//     display: none;
//   }
//   #card-error {
//     color: rgb(105, 115, 134);
//     font-size: 16px;
//     line-height: 20px;
//     margin-top: 12px;
//     text-align: center;
//   }
//   #card-element {
//     border-radius: 4px 4px 0 0;
//     padding: 12px;
//     border: 1px solid rgba(50, 50, 93, 0.1);
//     max-height: 44px;
//     width: 100%;
//     background: white;
//     box-sizing: border-box;
//   }
//   #payment-request-button {
//     margin-bottom: 32px;
//   }
//   /* Buttons and links */
//   button {
//     background: #5469d4;
//     font-family: Arial, sans-serif;
//     color: #ffffff;
//     border-radius: 0 0 4px 4px;
//     border: 0;
//     padding: 12px 16px;
//     font-size: 16px;
//     font-weight: 600;
//     cursor: pointer;
//     display: block;
//     transition: all 0.2s ease;
//     box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
//     width: 100%;
//   }
//   button:hover {
//     filter: contrast(115%);
//   }
//   button:disabled {
//     opacity: 0.5;
//     cursor: default;
//   }
//   /* spinner/processing state, errors */
//   .spinner,
//   .spinner:before,
//   .spinner:after {
//     border-radius: 50%;
//   }
//   .spinner {
//     color: #ffffff;
//     font-size: 22px;
//     text-indent: -99999px;
//     margin: 0px auto;
//     position: relative;
//     width: 20px;
//     height: 20px;
//     box-shadow: inset 0 0 0 2px;
//     -webkit-transform: translateZ(0);
//     -ms-transform: translateZ(0);
//     transform: translateZ(0);
//   }
//   .spinner:before,
//   .spinner:after {
//     position: absolute;
//     content: "";
//   }
//   .spinner:before {
//     width: 10.4px;
//     height: 20.4px;
//     background: #5469d4;
//     border-radius: 20.4px 0 0 20.4px;
//     top: -0.2px;
//     left: -0.2px;
//     -webkit-transform-origin: 10.4px 10.2px;
//     transform-origin: 10.4px 10.2px;
//     -webkit-animation: loading 2s infinite ease 1.5s;
//     animation: loading 2s infinite ease 1.5s;
//   }
//   .spinner:after {
//     width: 10.4px;
//     height: 10.2px;
//     background: #5469d4;
//     border-radius: 0 10.2px 10.2px 0;
//     top: -0.1px;
//     left: 10.2px;
//     -webkit-transform-origin: 0px 10.2px;
//     transform-origin: 0px 10.2px;
//     -webkit-animation: loading 2s infinite ease;
//     animation: loading 2s infinite ease;
//   }
//   @keyframes loading {
//     0% {
//       -webkit-transform: rotate(0deg);
//       transform: rotate(0deg);
//     }
//     100% {
//       -webkit-transform: rotate(360deg);
//       transform: rotate(360deg);
//     }
//   }
//   @media only screen and (max-width: 600px) {
//     form {
//       width: 80vw;
//     }
//   }
// `;

// export default StripeCheckout;

// // This example shows you how to set up React Stripe.js and use Elements.
// // Learn how to accept a payment using the official Stripe docs.
// // https://www.stripe.com/docs/payments/integration-builder

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: "",
    });
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert" style={{color:"green"}}>
        Payment successful
      </div>
     
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(941) 555-0123"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pay $25
      </SubmitButton>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51JIK5OSCBP9P0ml9hezb08wlcqOu4MrzfSRQjYGJjPCAtrQW3BpGgsgaM4fVnY1uAy64TEVbOcBeypmNKvr5HfDN005FSepaex"
);

const App = () => {
  return (
    <div className="AppWrapper">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default App;
