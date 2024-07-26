import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import navbar_logo from "../assets/navbar_logo.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MainNavbar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image
          className="mr-48"
            src={navbar_logo}
            style={{ width: " 60px", height: "60px" }}
            roundedCircle
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            style={{ color: "black", fontWeight: "bolder", fontSize: "14px" }}
          >
            <Nav.Link className="mr-5" href="/">Home</Nav.Link>
            <Nav.Link className="mr-5" href="/restaurants">Restaurants</Nav.Link>
            <Nav.Link className="text-nowrap mr-5" href="#link">Partner with us</Nav.Link>
            <Nav.Link className="mr-5" href="#link">Shops</Nav.Link>
            <Nav.Link className="mr-5" href="#link">Sell</Nav.Link>
            <Nav.Link className="mr-5" href="#link">Profile</Nav.Link>
            <Nav.Link className="mr-5" href="#link">العربية</Nav.Link>
            <Button
              variant="warning"
              href="/get-started"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "14px",
                width: "7rem",
              }}
            >
              Login <FontAwesomeIcon icon={faUser} />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
