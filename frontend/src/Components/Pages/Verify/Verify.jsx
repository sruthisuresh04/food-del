import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../../Context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

const verifyPayment = async () => {
  try {
    console.log("Verify Page Loaded");
    console.log("Token:", token);
    console.log("OrderId:", orderId);
    console.log("Success:", success);

    const response = await axios.post(
      url + "/api/order/verify",
      { success, orderId },
      { headers: { token } }
    );

    console.log("VERIFY RESPONSE:", response.data);

    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.log("VERIFY ERROR:", error.response?.data || error.message);
  }
};

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;

// import React, { useEffect } from "react";
// import axios from "axios";

// const Verify = () => {
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);

//     const success = params.get("success");
//     const orderId = params.get("orderId");

//     console.log("VERIFY PAGE LOADED");
//     console.log(success, orderId);

//     axios.post("http://localhost:4000/api/order/verify", {
//       success,
//       orderId,
//     })
//     .then(res => {
//       console.log("VERIFY RESPONSE:", res.data);
//     })
//     .catch(err => {
//       console.log("VERIFY ERROR:", err.message);
//     });

//   }, []);

//   return <h2>Verifying Payment...</h2>;
// };

// export default Verify;