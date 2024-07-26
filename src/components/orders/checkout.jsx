import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../Navbar";
import Footer from "../footer/footer";
import address_pin from "../../assets/address_pin.png";
import rest_logo from "../../assets/rest_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faTrashCan,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
const Checkout = () => {
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
    <>
      <Container className="p-0" fluid>
        <Navbar />
        <Container>
          <Row className="mt-5">
            <Col xs={12} md={6}>
              <div className="flex flex-col px-5">
                <div className="flex flex-row justify-between ">
                  <p className="text-xl font-bold">Addresses</p>
                  <p className="text-sm text-[#f0a835]">Add</p>
                </div>
                {/* Card Section */}
                <div className="flex flex-row justify-between p-4 shadow-xl rounded-lg mb-3">
                  <div className="flex flex-row justify-center items-center">
                    <div>
                      <img className="mr-4" src={address_pin} alt="address" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold mb-2">Home</p>
                      <p className="mb-0">836 Anderson Plains</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{ color: "#f0a835" }}
                    />
                    <p className="text-sm text-[#f0a835] mb-0">Edit</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between p-4 shadow-xl rounded-lg mb-5">
                  <div className="flex flex-row justify-center items-center">
                    <div>
                      <img className="mr-4" src={address_pin} alt="address" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold mb-2">Office</p>
                      <p className="mb-0">0332 Hoeger Gardens</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{ color: "#f0a835" }}
                    />
                    <p className="text-sm text-[#f0a835] mb-0">Edit</p>
                  </div>
                </div>
                <div className="">
                  <p className="text-xl font-bold">Payment method</p>
                </div>
                {/* Card Section */}
                <div className="flex flex-row justify-between p-4 shadow-xl rounded-lg mb-3">
                  <div className="flex flex-row justify-center items-center">
                    <div>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{ color: "#f0a835" }}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-bold mb-0">Cash</p>
                    </div>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between p-4 shadow-xl rounded-lg mb-3">
                  <div className="flex flex-row justify-center items-center">
                    <div>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{ color: "#f0a835" }}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-bold mb-0">Apple pay</p>
                    </div>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between p-4 shadow-xl rounded-lg mb-3">
                  <div className="flex flex-row justify-center items-center">
                    <div>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{ color: "#f0a835" }}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-bold mb-0">xxx-12345</p>
                    </div>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="flex flex-col">
                <div className="bg-white p-4 rounded-xl shadow-lg flex items-center max-w-md mx-auto mb-5">
                  <img
                    src={rest_logo}
                    alt="Mac and Cheese"
                    className="object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">Mac and Cheese</h3>
                    <p className="text-zinc-500 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit Ut
                      et.
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-gray-700">4.9</span>
                      <span className="text-zinc-500 ml-2">(120 reviews)</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <span className="text-lg font-semibold text-[#f0a835]">
                        EGP 320
                      </span>
                      <div className="flex items-center ml-auto">
                        <button
                          onClick={handleDecrement}
                          className="w-[30px] h-[30px] bg-[#f0a835] text-white rounded-full font-bold"
                        >
                          -
                        </button>
                        <span className="mx-3 text-xl font-bold">
                          {quantity}
                        </span>
                        <button
                          onClick={handleIncrement}
                          className="w-[30px] h-[30px] bg-[#f0a835] text-white rounded-full font-bold"
                        >
                          +
                        </button>
                        <button className="ml-4 text-gray-700 hover:text-gray-900">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{ width: "30px", height: "30px" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-28">
                  <div className="flex justify-between">
                    <p className="font-bold text-2xl">Subtotal</p>
                    <p className="font-bold text-xl">EGP 320</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold text-2xl">Tax</p>
                    <p className="font-bold text-xl">EGP 45</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold text-2xl">Delivery</p>
                    <p className="font-bold text-xl">EGP 20</p>
                  </div>
                  <hr />
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                    <Form.Control
                      placeholder="Apply discount code"
                      aria-label="discount"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <hr />
                  <div className="flex justify-between">
                    <p className="font-bold text-2xl">Total price</p>
                    <p className="font-bold text-xl">EGP 385</p>
                  </div>
                  <button className="w-full h-12 bg-[#f0a835] rounded-lg font-bold text-xl my-3">
                    Place order
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default Checkout;
