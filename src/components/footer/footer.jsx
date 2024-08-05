import Container from "react-bootstrap/Container";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import navbar_logo from "../../assets/navbar_logo.png";
import apple_store_icon from "../../assets/apple_store_icon.png";
import google_store_icon from "../../assets/google_store_icon.png";
import bwfb from "../../assets/bwfb.png";
import bwyt from "../../assets/bwyt.png";
import bwinsta from "../../assets/bwinsta.png";

function Footer() {
  return (
    <>
      <Container fluid className="bg-black">
        <Row className="p-5">
          <Col md={1}></Col>
          <Col md={2}>
            <div>
              <img src={navbar_logo} />
            </div>
          </Col>
          <Col md={2}>
            <div>
              <p className="text-white font-bold">Contact us</p>
              <p className="text-white">info@findhelp.com</p>
              <p className="text-white">1-800-200-300</p>
            </div>
          </Col>
          <Col md={2}>
          <div>
              <p className="text-white font-bold">Policy</p>
              <p className="text-white">Terms & Conditions</p>
              <p className="text-white">Privacy Policy</p>
            </div>
          </Col>
          <Col md={2}>
          <p className="text-white font-bold">Services</p>
              <p className="text-white">Resturants</p>
              <p className="text-white">Groceries</p>
              <p className="text-white">Shops</p>
              <p className="text-white">Sell</p>
          </Col>
          <Col md={2}>
          <div className="flex flex-col">
              <img className="w-40 mb-2" src={apple_store_icon} alt="apple-store" />
              <img className="w-40" src={google_store_icon} alt="google-store" />
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>
        <Row className="p-3">
          <div className="flex justify-between items-center">
            <p className="text-white font-bold w-2/3 m-0">All rights reserved © Find Help</p>
            <div className="flex flex-col justify-evenly w-14 mb-3 md:w-1/3 md:flex md:flex-row md:justify-evenly">
            <img src={bwfb} alt="facebook" />
            <img src={bwyt} alt="youtube" />
            <img src={bwinsta} alt="instagram" />
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
