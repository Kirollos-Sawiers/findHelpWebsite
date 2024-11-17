import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import navbar_logo from "../../assets/navbar_logo.png";
import apple_store_icon from "../../assets/apple_store_icon.png";
import google_store_icon from "../../assets/google_store_icon.png";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import snapchat from "../../assets/snapchat.png";
// import tiktok from "../../assets/tiktok.png";
import { Link } from "react-router-dom";

function Footer() {
  const handlePhoneNumberClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };
  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <footer className="bg-black">
      <Container fluid>
        <Row className="pt-3 pb-3">
          <Col md={1}></Col>
          <Col md={1}>
            <div>
              <img src={navbar_logo} alt="Logo_img" />
            </div>
          </Col>
          <Col md={3}>
            <div>
              <p className="text-white font-bold">Contact us</p>
              <p
                className="text-white cursor-pointer text-pretty w-10"
                onClick={() => handleEmailClick("newfindhelpapp@gmail.com")}
              >
                Info@findhelpapp.com
              </p>
              <p
                className="text-white cursor-pointer"
                onClick={() => handlePhoneNumberClick("00201000067629")}
              >
                +2-01000067629
              </p>
            </div>
          </Col>
          <Col md={2}>
            <div>
              <p className="text-white font-bold">Policy</p>
            <Link to="/TermsandConditions" className="no-underline">
              <p className="text-white">Terms & Conditions</p>
            </Link>
            <Link to="/Privacy-policy" className="no-underline">
              <p className="text-white">Privacy Policy</p>
            </Link>
            </div>
          </Col>
          <Col md={2}>
            <p className="text-white font-bold">Services</p>
            <Link to="/restaurants" className="no-underline">
              <p className="text-white">Restaurants</p>
            </Link>
            <Link to="/shops" className="no-underline">
              <p className="text-white">Shops</p>
            </Link>
            <Link to="/services" className="no-underline">
              <p className="text-white">Services</p>
            </Link>
          </Col>
          <Col md={2}>
            <div className="flex flex-col">
              <Link
                to="https://apps.apple.com/eg/app/findhelpapp/id1450736684"
                target="_blank"
              >
                <img
                  className="w-40 mb-4"
                  src={apple_store_icon}
                  alt="apple-store"
                />
              </Link>
              <Link
                to="https://play.google.com/store/apps/details?id=com.extreme.help"
                target="_blank"
              >
                <img
                  className="w-40"
                  src={google_store_icon}
                  alt="google-store"
                />
              </Link>
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>
        <Row className="p-3">
          <div className="flex justify-between items-center">
            <p className="text-white font-bold w-2/3 m-0">
              All rights reserved © Find Help
            </p>
            <div className="flex flex-col justify-evenly w-14 mb-1 md:w-1/3 md:flex md:flex-row md:justify-evenly">
              <Link
                to="https://www.facebook.com/profile.php?id=61559402712536"
                target="_blank"
              >
                <img className="w-10 h-10" src={facebook} alt="facebook" />
              </Link>
              {/* <Link to="https://www.tiktok.com/@findhelp.eg" target="_blank">
                <img className="w-10 h-10" src={tiktok} alt="tiktok" />
              </Link> */}
              <Link
                to="https://www.instagram.com/find.helpapp/"
                target="_blank"
              >
                <img className="w-10 h-10" src={instagram} alt="instagram" />
              </Link>
              <Link to="https://snapchat.com/t/P8JaPyM0" target="_blank">
                <img className="w-10 h-10" src={snapchat} alt="snapchat" />
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
