import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../Navbar";
import Footer from "../footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { calculateOrderPrice, placeOrder } from "../../features/orders/orderSlice";
import { useDispatch } from "react-redux";
import GoogleMapComponent from "../../features/googelMap/map";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPriceData, setOrderPriceData] = useState();
  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState();
  const [placedOrderData, setPlacedOrderData] = useState();
  const [location, setLocation] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [notes, setNotes] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }

    const handleStorageChange = () => {
      const updatedLocation = localStorage.getItem('location');
      if (updatedLocation) {
        setLocation(JSON.parse(updatedLocation));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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

      setProducts(newProducts);

      if (newProducts.length > 0) {
        dispatch(calculateOrderPrice({ products: newProducts })).then((res) => {
          console.log(res.payload);
          setOrderPriceData(res.payload);
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems) {
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
        products: newProducts
      };
      console.log(orderData);
      console.log(location);
    }
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateCartPrice(); // Call calculateCartPrice when the component mounts
  }, []);

  useEffect(() => {
    calculateCartPrice(); // Call calculateCartPrice whenever cartItems changes
  }, [cartItems]);

  let totalPrice;
  if (cartItems) {
    totalPrice = cartItems.reduce((sum, product) => {
      const price = product.selling_price || product.userOptionPrice;
      return sum + price * product.userQuantity;
    }, 0);
  }

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

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
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
                      className="bg-white p-4 rounded-xl shadow-lg flex items-center max-w-md mx-auto mb-5"
                    >
                      <img
                        src={cartItem.image.url}
                        alt="Mac and Cheese"
                        className="rounded-full w-32 h-3w-32 mr-4"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold">
                          {cartItem.name.en}
                        </h3>
                        <p className="text-zinc-500 text-sm">
                          {cartItem.description.en}
                        </p>
                        <div className="flex items-center mt-4">
                          <span className="text-lg font-semibold text-[#f0a835]">
                            EGP{" "}
                            {(
                              cartItem.userQuantity *
                              (cartItem?.selling_price === 0
                                ? cartItem.userOptionPrice
                                : cartItem?.selling_price)
                            ).toFixed(2)}
                          </span>
                          <span className="ml-3 text-lg font-semibold text-[#f0a835]">
                            {" "}
                            Quntity : {cartItem.userQuantity}
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
          <Col xs={12} md={12} lg={6}>
            {cartItems.length > 0 && orderPriceData && (
              <div className="">
                <div className="mb-3">
                  <h3>Location</h3>
                  <GoogleMapComponent />
                </div>
                <form onSubmit={handleSubmit} className="my-3">
                  <div>
                    <h3>Payment Method</h3>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="4"
                      checked={paymentMethod === "4"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="ml-2 font-medium">Cash</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="10"
                      checked={paymentMethod === "10"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="ml-2 font-medium">
                      Visa / Mastercard
                    </label>
                  </div>

                  <hr />
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                    <Form.Control
                      placeholder="Apply discount code"
                      aria-label="discount"
                      aria-describedby="basic-addon1"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                  </InputGroup>
                  <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Add any notes here"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </Form.Group>
                  <hr />
                  <div className="flex justify-between">
                    <p className="font-bold text-2xl">Subtotal</p>
                    <p className="font-bold text-xl">
                      {orderPriceData[0]?.sub_total}{" "}
                      {orderPriceData[0]?.currency}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold text-2xl">Service Fee</p>
                    <p className="font-bold text-xl">
                      {orderPriceData[0]?.taxes} {orderPriceData[0]?.currency}
                    </p>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <p className="font-bold text-2xl">Total price</p>
                    <p className="font-bold text-xl">
                      {orderPriceData[0]?.total} {orderPriceData[0]?.currency}
                    </p>
                  </div>
                  <button
                    className="w-full h-12 bg-[#f0a835] rounded-lg font-bold text-xl my-3"
                    type="submit"
                  >
                    Place order
                  </button>
                </form>
              </div>
            )}
          </Col>
        </Row>
        {cartItems.length === 0 && (
          <Row>
            <Col xs={12}>
              <div className="flex justify-center mt-5 w-full h-screen">
                <p className="font-bold text-2xl text-[#f0a835]">
                  Card is empty..!
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