import React, { useState, useEffect } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import Navbar from "../Navbar";
import Footer from "../footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  calculateOrderPrice,
  placeOrder,
} from "../../features/orders/orderSlice";
import { useDispatch } from "react-redux";
import GoogleMapComponent from "../../features/googelMap/map";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [orderPriceData, setOrderPriceData] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [location, setLocation] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [notes, setNotes] = useState("");
  const [showMapModal, setShowMapModal] = useState(false); // To control modal visibility
  const [errorMessage, setErrorMessage] = useState(""); // To show error messages
  const [errorLocationMessage, setErrorLocationMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false); // To track order placement status
  const [placedOrderData, setPlacedOrderData] = useState();
  const lng = cookies.get("i18next") || "en";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get initial location from localStorage
  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }
  }, []);

  // Effect to close the modal after location is updated
  useEffect(() => {
    if (location) {
      setShowMapModal(false); // Close modal when location is updated
    }
  }, [location]);

  const handleMapModalClose = () => {
    setShowMapModal(false);
    window.location.reload(); // Reload the page when the modal is closed
  };
  const handleMapModalShow = () => setShowMapModal(true);

  const handleLocationUpdate = (newLocation) => {
    localStorage.setItem("location", JSON.stringify(newLocation));
    setLocation(newLocation); // Update state after picking location
    calculateCartPrice(); // Recalculate cart price with new location
  };

  const calculateCartPrice = () => {
    if (cartItems) {
      const newProducts = cartItems.map((item) => ({
        id: item.id,
        quantity: item.userQuantity,
        notes: "",
        cartoon: "ttt",
        split: "ttt",
        options: item.userOptionId,
      }));

      if (newProducts.length > 0 && location) {
        const orderData = {
          type: "order",
          address: {
            lat: location?.lat,
            lng: location?.lng, // Use current location or default
            details: location?.address, // Use current location or default
          },
          payment_method_id: paymentMethod || "", // Use current payment method or default
          notes: notes || "", // Use current notes or default
          coupon_code:
            discountCode ||
            "yitmgfjcndntndzuuabobnojuoqigyuwbrufpdrsyosaqedohezowikvkesbdnzqxotcyxtrdqgqn", // Use current discount code or default
          products: newProducts,
        };

        dispatch(calculateOrderPrice(orderData)).then((res) => {
          setOrderPriceData(res.payload);
          setErrorLocationMessage(res.payload.message);
          console.log(res.payload);
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      setErrorMessage("Please select a payment method.");
      return;
    }

    if (!location) {
      setErrorMessage("Please set your location.");
      return;
    }

    if (cartItems && location) {
      const newProducts = cartItems.map((item) => ({
        id: item.id,
        quantity: item.userQuantity,
        notes: "",
        options: item.userOptionId,
      }));
      const orderData = {
        type: "order",
        address_id: null,
        address: {
          lat: location.lat,
          lng: location.lng,
          details: location.address,
        },
        payment_method_id: paymentMethod,
        coupon_code: discountCode,
        notes: notes,
        products: newProducts,
      };

      dispatch(placeOrder(orderData))
        .then((res) => {
          console.log("Order placed:");
          console.log("Order placed:", res.payload);
          console.log("Order placed:", res.payload.payment.invoice_url);
          setPlacedOrderData(res.payload);
          setErrorMessage("");
          setOrderPlaced(true);
          setCartItems([]);
          setPaymentMethod(null);
          setLocation(null);
          setDiscountCode("");
          setNotes("");
          localStorage.removeItem("cart");
        })
        .catch((err) => {
          // console.error("Error placing order:", err);
          setErrorMessage("Error placing order. Please try again.");
        });
    } else {
      // console.log("Location or cart items missing.");
      setErrorMessage("Location or cart items missing.");
    }
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateCartPrice();
  }, []);

  useEffect(() => {
    calculateCartPrice();
  }, [cartItems]);

  const removeItem = (id) => {
    const storedArray = localStorage.getItem("cart");
    const myArray = JSON.parse(storedArray);
    if (myArray.length > 1) {
      const idToRemove = id;
      const updatedArray = myArray.filter((obj) => obj.id !== idToRemove);
      localStorage.setItem("cart", JSON.stringify(updatedArray));
      setCartItems(updatedArray);
    } else {
      localStorage.removeItem("cart");
      setCartItems([]);
    }
  };

  // Helper function to get the correct language property
  const getLangProperty = (obj, property) => {
    return obj?.[property]?.[lng] || obj?.[property]?.en || "";
  };

  return (
    <Container className="p-0" fluid>
      <Navbar />
      <Container>
        <Row className="mt-5">
          <Col xs={12} md={12} lg={6}>
            <div className="flex flex-col">
              {cartItems.length > 0
                ? cartItems.map((cartItem, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg flex items-center w-full mb-5 px-2 py-3"
                    >
                      <img
                        src={cartItem.image.url}
                        alt={getLangProperty(cartItem, "name")}
                        className="rounded-full w-32 h-32 mr-4 "
                      />
                      <div className="">
                        <h3 className="sm:text-base md:text-lg font-semibold">
                          {getLangProperty(cartItem, "name")}
                        </h3>
                        <p className="text-zinc-500 text-sm">
                          {getLangProperty(cartItem, "description")}
                        </p>
                        <div className="flex items-center mt-4 pr-2">
                          <span className="sm:text-base md:text-lg font-semibold text-[#f0a835]">
                            {(
                              cartItem.userQuantity *
                              (cartItem?.selling_price === 0
                                ? cartItem.userOptionPrice
                                : cartItem?.selling_price)
                            ).toFixed(2)}
                            {t("egp")}
                          </span>
                          <span className="mx-3 sm:text-base md:text-lg font-semibold text-[#f0a835]">
                            {t("quantity")} : {cartItem.userQuantity}
                          </span>
                          <div className="flex items-center ml-auto">
                            <button
                              className="ml-4 text-gray-700 hover:text-gray-900"
                              onClick={() => {
                                removeItem(cartItem.id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                style={{ width: "30px", height: "30px" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </Col>
          {orderPlaced ? (
            <>
              {placedOrderData?.payment?.invoice_url ? (
                <>
                  {window.location.replace(
                    placedOrderData?.payment?.invoice_url
                  )}
                </>
              ) : (
                <Col xs={12} md={12} lg={12}>
                  <div className="flex justify-center mt-5 w-full h-screen">
                    <p className="font-bold text-2xl text-[#f0a835]">
                      {t("delivered_soon")}
                    </p>
                  </div>
                </Col>
              )}
            </>
          ) : (
            <>
              <Col xs={12} md={12} lg={6}>
                {cartItems.length > 0 && orderPriceData && (
                  <div className="">
                    <div className="mb-3">
                      <h3>{t("location")}</h3>
                      <button
                        className="w-[30%] h-10 bg-[#f0a835] text-white font-semibold rounded-lg  my-3"
                        onClick={handleMapModalShow}
                      >
                        {t("select_location")}
                      </button>
                    </div>
                    {errorLocationMessage ? (
                      <small className="text-rose-800">
                        {errorLocationMessage}
                      </small>
                    ) : null}
                    <div>
                      <hr />
                      <Modal show={showMapModal} onHide={handleMapModalClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>{t("select_location_map")}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <GoogleMapComponent
                            onLocationUpdate={handleLocationUpdate}
                          />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={handleMapModalClose}
                          >
                            {t("close")}
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>

                    <form onSubmit={handleSubmit} className="my-3">
                      <div>
                        <h3>{t("payment_methods")}</h3>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value="4"
                          checked={paymentMethod === "4"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label className="mx-2 font-medium">{t("cash")}</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value="10"
                          checked={paymentMethod === "10"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label className="mx-2 font-medium">
                          Visa / Mastercard
                        </label>
                      </div>
                      <hr />
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                        <Form.Control
                          placeholder={t("promo_code")}
                          aria-label="discount"
                          aria-describedby="basic-addon1"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                      </InputGroup>
                      <Form.Group className="mb-3">
                        <Form.Label>{t("notes")}</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder={t("write_something")}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </Form.Group>
                      <hr />
                      <div className="flex justify-between">
                        <p className="font-bold text-2xl">{t("subtotal")}</p>
                        <p className="font-bold text-xl">
                          {orderPriceData[0]?.sub_total} {t("egp")}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-bold text-2xl">{t("service_fee")}</p>
                        <p className="font-bold text-xl">
                          {orderPriceData[0]?.taxes} {t("egp")}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-bold text-2xl">
                          {t("delivery_fee")}
                        </p>
                        <p className="font-bold text-xl">
                          {orderPriceData[0]?.shipping} {t("egp")}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-bold text-2xl text-[#f0a835]">
                          {t("earned_points")}
                        </p>
                        <p className="font-bold text-xl text-[#f0a835]">
                          {orderPriceData[0]?.earn_points} {t("points")}
                        </p>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <p className="font-bold text-2xl">{t("total")}</p>
                        <p className="font-bold text-xl">
                          {orderPriceData[0]?.total} {t("egp")}
                        </p>
                      </div>
                      {errorMessage && (
                        <div className="text-red-500 mb-3">{errorMessage}</div>
                      )}
                      <button
                        className="w-full h-12 bg-[#f0a835] rounded-lg font-bold text-xl my-3"
                        type="submit"
                      >
                        {t("place_order")}
                      </button>
                    </form>
                  </div>
                )}
              </Col>
            </>
          )}
        </Row>
        {cartItems.length === 0 && !orderPlaced && (
          <Row>
            <Col xs={12}>
              <div className="flex justify-center mt-5 w-full h-screen">
                <p className="font-bold text-2xl text-[#f0a835]">
                  {t("card_is_empty")}
                </p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </Container>
  );
};

export default Checkout;
