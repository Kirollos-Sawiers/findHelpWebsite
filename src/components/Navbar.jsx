import React, { useContext, useState, useEffect } from "react";
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
import { logoutWeb, resetPassword, forgetPassword } from "../features/auth/authSlice";
import { getAllCountries } from "../features/location/locationSlice";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainNavbar() {
  const [cartItems, setCartItems] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const { token } = useSelector((state) => state.auth);
  const { allCountries } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
    dispatch(getAllCountries)
    console.log(allCountries)
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const countryCityDropdown = () => {
    return (
      <div className="pt-1">
        <div className="mb-4">
          {/* <label className="block text-sm font-bold mb-2" htmlFor="country">
            Country
          </label> */}
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
  
        {selectedCountry && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="city">
              City
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }

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
              height:"2rem"
            }}
            onClick={() => dispatch(logoutWeb())}
          >
            <span className="leading-none">Logout</span> <FontAwesomeIcon icon={faRightFromBracket} />
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
              className="me-auto"
              style={{ color: "black", fontWeight: "bolder", fontSize: "14px" }}
            >
              <Nav.Link className="mr-5 leading-none" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="mr-5 leading-none" href="/restaurants">
                Restaurants
              </Nav.Link>
              <Nav.Link className="mr-5 leading-none" href="/shops">
                Shops
              </Nav.Link>
              <Nav.Link className="text-nowrap mr-5 leading-none" href="partnerwithus">
                Partner with us
              </Nav.Link>
              <Nav.Link className="text-nowrap mr-5 leading-none" href="ridewithus">
                Ride With us
              </Nav.Link>
              {/* <Nav.Link className="mr-5 leading-none" href="#link">
                Sell
              </Nav.Link> */}
              {/* {countryCityDropdown()} */}
              {toggleLoginButton()}
              {/* <Nav.Link className="ml-2 leading-none w-10" onClick={handleCartClick}>
                <FaShoppingCart /> ({cartItems.length})
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </>
  );
}

export default MainNavbar;