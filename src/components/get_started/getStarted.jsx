import Navbar from "../Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import get_started_img from "../../assets/get_started_img.png";
import Footer from './../footer/footer';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
function GetStarted() {
  return (
    <Container className="p-0" fluid>
      <Navbar />
      <Container className="mb-5">
        <Row className="rounded-lg shadow-lg">
          <Col className="flex flex-col items-center">
            <h1 className="pt-3 mb-4 text-center">Let’s Get Started</h1>
            <h6 className="w-2/3 text-center">
              Sign up or login into to have a full digital experience in our
              restaurant
            </h6>
            <Button
              className="w-2/3 h-12 my-5 text-center"
              variant="warning"
              // href="#link"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "15px",
              }}
            >
              Get started with Email
            </Button>
            <div className="flex items-center w-2/3 mb-5">
              <div className="w-1/2 h-1" style={{backgroundColor:"lightgray"}}></div>
              <h6 className="mx-3 small" style={{color:"lightgray"}}>OR</h6>
              <div className="w-1/2 h-1" style={{backgroundColor:"lightgray"}}></div>
            </div>
            <Button
              className="w-2/3 h-12 my-3 text-center border-2 border-black"
              variant="light"
              // href="#link"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "15px",
              }}
            >
              <FontAwesomeIcon
                icon={faGoogle}
                style={{ color: "#000000", marginRight: "0.7rem" }}
              />
              Continue with Google
            </Button>{" "}
            <Button
              className="w-2/3 h-12 my-3 text-center border-2 border-black"
              variant="light"
              // href="#link"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "15px",
              }}
            >
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ color: "#000000", marginRight: "0.7rem" }}
              />
              Continue with Facebook
            </Button>{" "}
            <Button
              className="w-2/3 h-12 my-3 text-center border-2 border-black"
              variant="light"
              // href="#link"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "15px",
              }}
            >
              <FontAwesomeIcon
                icon={faApple}
                style={{ color: "#000000", marginRight: "0.7rem" }}
              />
              Continue with Apple
            </Button>
            <div className="flex justify-center w-full my-4">
              <h6 className="text-center small mr-2">Already have an account?</h6>
              <Link to="/login" style={{textDecoration:"none"}}>
              <h6 className="font-bold small">Login</h6>
              </Link>
            </div>
            <Link to="/login" style={{textDecoration:"none"}}>
            <h6 className="font-bold text-center small">Skip</h6>
            </Link>
          </Col>
          <Col className="hidden p-0 md:block lg:block">
            <Image className="rounded-tr-lg rounded-br-lg" src={get_started_img} />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Container>
  );
}

export default GetStarted;
