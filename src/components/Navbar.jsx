import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import navbar_logo from "../assets/navbar_logo.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutWeb,
  resetPassword,
  forgetPassword,
} from "../features/auth/authSlice";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function MainNavbar() {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { allCountriesData, allCitiesData } = useSelector(
    (state) => state.locationData
  );


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);


  const toggleLoginButton = () => {
    if (token) {
      return (
        <>
          <Nav.Link className="mr-3 leading-none" href="/profile">
            Profile
          </Nav.Link>
          <Button
            variant="warning"
            href="/login"
            style={{
              margin: 0,
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              width: "7rem",
              height: "2rem",
            }}
            onClick={() => dispatch(logoutWeb())}
          >
            <span className="leading-none">Logout</span>{" "}
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            className="leading-none"
            variant="warning"
            href="/login"
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              width: "7rem",
            }}
          >
            Login <FontAwesomeIcon icon={faUser} />
          </Button>
        </>
      );
    }
  };

  const handleCartClick = () => {
    navigate("/checkout");
    if (cartItems.length > 0) {
      toast.success(`You have ${cartItems.length} items in your cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.info("Your cart is empty!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <Image
              className="mr-36"
              src={navbar_logo}
              style={{ width: " 60px", height: "60px" }}
              roundedCircle
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="w-full flex justify-around"
              style={{ color: "black", fontWeight: "bolder", fontSize: "14px" }}
            >
              <Nav.Link className="mr-3 leading-none" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="mr-3 leading-none" href="/restaurants">
                Restaurants
              </Nav.Link>
              <Nav.Link className="mr-3 leading-none" href="/shops">
                Shops
              </Nav.Link>
              <Nav.Link className="mr-3 leading-none" href="/services">
                Services
              </Nav.Link>
              <Nav.Link
                className="text-nowrap mr-3 leading-none"
                href="partnerwithus"
              >
                Partner with us
              </Nav.Link>
              <Nav.Link
                className="text-nowrap mr-3 leading-none"
                href="ridewithus"
              >
                Ride With us
              </Nav.Link>
              {/* <Nav.Link className="mr-3 leading-none" href="#link">
                Sell
              {countryCityDropdown()}
              </Nav.Link> */}
              {toggleLoginButton()}
              <Nav.Link className="ml-2 leading-none" onClick={handleCartClick}>
                <div className="flex justify-center">
                <FaShoppingCart />
                <div>
                 ({cartItems.length})
                </div>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </>
  );
}

export default MainNavbar;
