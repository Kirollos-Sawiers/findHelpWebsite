import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Image from "react-bootstrap/Image";
import products_banner from "../../assets/products_banner.png";
import rest_logo from "../../assets/rest_logo.png";
import info_banner from "../../assets/info_banner.png";
import apple_pay from "../../assets/apple_pay.png";
import master_card from "../../assets/master_card.png";
import visa from "../../assets/visa.png";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot, faMoneyCheckDollar, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { faStar as offStar, faClock } from "@fortawesome/free-regular-svg-icons";
import { FaBars, FaTh } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Rating } from "primereact/rating";
import Footer from './../footer/footer';
import { Link } from 'react-router-dom';
function MainProducts() {
  const [activeTab, setActiveTab] = useState("Trending");
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const tabs = [
    "Trending",
    "Burgers",
    "Pizza",
    "Main dishes",
    "Salads",
    "Hot drinks",
    "Cold Drinks",
  ];

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };
  const menuCard = () => {
    return (
      <>
        <div
          className="bg-white rounded-lg shadow-xl p-4 flex items-center m-3 w-2/5"
          onClick={handleShow}
        >
          <img
            src={rest_logo}
            alt="Curry Salmon"
            className="rounded-full w-20 h-20 object-cover"
          />
          <div className="ml-4 flex-grow">
            <h3 className="text-lg font-semibold">Curry Salmon</h3>
            <p className="text-zinc-500 text-sm font-medium">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.
            </p>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="mr-1"
                icon={faStar}
                style={{ color: "#f0a835" }}
              />
              <span className="font-semibold">4.9</span>
              <span className="text-zinc-500 text-sm ml-2 font-medium">
                (120 reviews)
              </span>
            </div>
            <span className="text-[#f0a835] font-semibold mt-3 text-lg ">
              EGP{" "}
            </span>
            <span className="text-[#f0a835] font-bold mt-3 text-xl">320</span>
          </div>
          <button className="bg-yellow-500 text-white rounded-full p-2 ml-auto flex-shrink-0">
            +
          </button>
        </div>
      </>
    );
  };
  const sideBar = () => {
    return (
      <>
        <div className="bg-white rounded-lg shadow-lg p-4 w-40 flex flex-col items-end mt-5">
          {/* <div className="flex space-x-4 mb-4">
        <button className="bg-gray-200 p-2 rounded-full">
          <FaBars className="text-black" />
        </button>
        <button className="bg-gray-200 p-2 rounded-full">
          <FaTh className="text-black" />
        </button>
      </div> */}
          <div className="flex flex-col space-y-4 text-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`text-lg font-medium px-4 py-2 rounded-lg ${
                  activeTab === tab ? "bg-[#f0a835] text-white" : "text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  };
  const productDetails = () => {
    return (
      <div className="bg-white rounded-lg p-4 w-80">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <img
            src={rest_logo}
            alt="Curry Salmon"
            className="rounded-full w-14 h-14 object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">Curry Salmon</h3>
            <div className="text-[#f0a835] font-bold">EGP 320</div>
          </div>
          <FontAwesomeIcon
            className="mr-1"
            icon={faStar}
            style={{ color: "#f0a835" }}
          />
        </div>

        {/* Nutritional Info */}
        <div className="grid grid-cols-5 gap-2 text-center mb-4">
          <div>400 kcal</div>
          <div>510 grams</div>
          <div>30 proteins</div>
          <div>56 carbs</div>
          <div>24 fats</div>
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <h4 className="font-semibold">Ingredients</h4>
          <div className="flex space-x-4 mt-2">
            <div className="flex flex-col items-center">
              <img src="https://via.placeholder.com/40" alt="Egg" />
              <span>Egg</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://via.placeholder.com/40" alt="Avocado" />
              <span>Avocado</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://via.placeholder.com/40" alt="Spinach" />
              <span>Spinach</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://via.placeholder.com/40" alt="Bread" />
              <span>Bread</span>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mb-4">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Extra eggs</span>
                </div>
                <div className="text-[#f0a835] font-bold">EGP 4.20</div>
              </div>
            ))}
        </div>

        {/* Additional Item */}
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Mac and Cheese"
            className="rounded-full w-12 h-12 object-cover"
          />
          <div className="ml-4 flex-grow">
            <h4 className="text-sm font-semibold">Mac and Cheese</h4>
            <div className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.
            </div>
            <div className="text-[#f0a835] font-bold">EGP 320</div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-1 rounded-full bg-[#f0a835]"
            >
              <FaMinus className="text-white " />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-1 rounded-full bg-[#f0a835]"
            >
              <FaPlus className="text-white" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="flex flex-wrap justify-center items-center">
          <div className="text-lg font-semibold">
            Total: EGP {( quantity * 320).toFixed(2)}
          </div>
          <Link to="/checkout"  style={{ textDecoration: 'none', color: 'blue' }}>
          <button className="bg-[#f0a835] text-white rounded-lg px-4 py-2 ml-2 mt-3">
            Add to Cart
          </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <Container fluid className="p-0">
        <Navbar />
        <Container fluid className="flex justify-center pb-10">
          <div>
            <Image className="" src={products_banner} />
          </div>
        </Container>
        <div className="flex">
          <div>
            <Image className="mx-3" src={rest_logo} />
          </div>
          <div>
            <p className="text-2xl font-semibold p-0 m-0">Pastaya</p>
            <p className="small text-zinc-500 ">Italian, Pasta, Desserts</p>
          </div>
        </div>
        <div className="my-5">
          <Tabs
            defaultActiveKey="menu"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab className="" eventKey="menu" title="Menu">
              <Row>
                <Col md={3} className="flex justify-center">
                  {sideBar()}
                </Col>
                <Col md={9}>
                  <div className="flex flex-wrap">
                    {menuCard()}
                    {menuCard()}
                    {menuCard()}
                    {menuCard()}
                    {menuCard()}
                    {menuCard()}
                    {menuCard()}
                  </div>
                  <Offcanvas
                    show={show}
                    onHide={handleClose}
                    placement="end"
                    name="end"
                  >
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <Offcanvas.Body>
                      <div>{productDetails()}</div>
                    </Offcanvas.Body>
                  </Offcanvas>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="reviews" title="Reviews">
              <Container>
                <Row className="mt-20">
                  <Col md={2}></Col>
                  <Col>
                    <div className="m-5">
                      <p className="text-sm text-zinc-500">Jan 20, 2024</p>
                      <div>
                        <Rating
                          value={4}
                          readOnly
                          cancel={false}
                          onIcon={
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#f0a835" }}
                            />
                          }
                          offIcon={
                            <FontAwesomeIcon
                              icon={offStar}
                              style={{ color: "#f0a835" }}
                            />
                          }
                        />
                      </div>
                      <div className="flex items-center mt-3">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="AK"
                          className="rounded-full mr-2"
                        />
                        <span className="font-bold">Alex K.</span>
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipiscing elit
                          Ut et massa mi. Aliquam in hendrerit urna.
                          Pellentesque sit amet sapien fringilla, mattis ligula
                          consectetur, ultrices.
                        </p>
                      </div>
                    </div>
                    <div className="m-5">
                      <p className="text-sm text-zinc-500">Nov 13, 2023</p>
                      <div>
                        <Rating
                          value={5}
                          readOnly
                          cancel={false}
                          onIcon={
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#f0a835" }}
                            />
                          }
                          offIcon={
                            <FontAwesomeIcon
                              icon={offStar}
                              style={{ color: "#f0a835" }}
                            />
                          }
                        />
                      </div>
                      <div className="flex items-center mt-3">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="AK"
                          className="rounded-full mr-2"
                        />
                        <span className="font-bold">Emily R.</span>
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipiscing elit
                          Ut et massa mi. Aliquam in hendrerit urna.
                          Pellentesque sit amet sapien fringilla, mattis ligula
                          consectetur, ultrices.
                        </p>
                      </div>
                    </div>
                    <div className="m-5">
                      <p className="text-sm text-zinc-500">Nov 7, 2023</p>
                      <div>
                        <Rating
                          value={2}
                          readOnly
                          cancel={false}
                          onIcon={
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#f0a835" }}
                            />
                          }
                          offIcon={
                            <FontAwesomeIcon
                              icon={offStar}
                              style={{ color: "#f0a835" }}
                            />
                          }
                        />
                      </div>
                      <div className="flex items-center mt-3">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="AK"
                          className="rounded-full mr-2"
                        />
                        <span className="font-bold">Michael T.</span>
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipiscing elit
                          Ut et massa mi. Aliquam in hendrerit urna.
                          Pellentesque sit amet sapien fringilla, mattis ligula
                          consectetur, ultrices.
                        </p>
                      </div>
                    </div>
                    <div className="m-5">
                      <p className="text-sm text-zinc-500">Oct 18, 2023</p>
                      <div>
                        <Rating
                          value={3}
                          readOnly
                          cancel={false}
                          onIcon={
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#f0a835" }}
                            />
                          }
                          offIcon={
                            <FontAwesomeIcon
                              icon={offStar}
                              style={{ color: "#f0a835" }}
                            />
                          }
                        />
                      </div>
                      <div className="flex items-center mt-3">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="AK"
                          className="rounded-full mr-2"
                        />
                        <span className="font-bold">Sarah L.</span>
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipiscing elit
                          Ut et massa mi. Aliquam in hendrerit urna.
                          Pellentesque sit amet sapien fringilla, mattis ligula
                          consectetur, ultrices.
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={2}></Col>
                </Row>
              </Container>
            </Tab>
            <Tab eventKey="info" title="Info">
              <Container>
                <Row className="mt-5">
                  <Col md={2}></Col>
                  <Col>
                    <div>
                      <Image src={info_banner} />
                    </div>
                    <div className="flex flex-col mt-3">
                      <div className="mt-2">
                      <p className="font-bold text-xl">Location & hours</p>
                      <div className="flex flex-row items-center">
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faLocationDot}
                          style={{
                            color: "grey",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <p className="m-0 p-0">1234 Market St</p>
                      </div>
                      <div className="flex flex-row items-center mt-3">
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faClock}
                          style={{
                            color: "grey",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <p className="m-0 p-0">From 10:00 AM - 10:30 AM</p>
                      </div>
                    </div>
                      <div className="mt-5">
                      <p className="font-bold text-xl">Delivery fees & time</p>
                      <div className="flex flex-row items-center">
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faMoneyCheckDollar}
                          style={{
                            color: "grey",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <p className="m-0 p-0">EGP 25.00</p>
                      </div>
                      <div className="flex flex-row items-center mt-3">
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faMotorcycle}
                          style={{
                            color: "grey",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <p className="m-0 p-0">Under 30 mins</p>
                      </div>
                    </div>
                      <div className="mt-5">
                      <p className="font-bold text-xl">Taxes & fees</p>
                      <div className="flex flex-row items-center">
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faMoneyCheckDollar}
                          style={{
                            color: "grey",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <p className="m-0 p-0">VAT 14%</p>
                      </div>
                    </div>
                      <div className="mt-5">
                      <p className="font-bold text-xl">Payment options</p>
                      <div className="flex flex-row justify-between w-1/3">
                      <Image src={visa} />
                      <Image src={master_card} />
                      <Image src={apple_pay} />
                      </div>
                    </div>
                    </div>
                  </Col>
                  <Col md={2}></Col>
                </Row>
              </Container>
            </Tab>
          </Tabs>
        </div>
        <Footer />
      </Container>
    </>
  );
}

export default MainProducts;
