import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import navbar_logo from "../assets/navbar_logo.png";
import profile_pic from "../assets/profile_pic.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { logoutWeb, getNotifications, markNotificationsAsRead } from "../features/auth/authSlice";
import { FaShoppingCart, FaBell } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import i18n from "i18next";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

function MainNavbar() {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [language, setLanguage] = useState("en");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
    dispatch(getNotifications()).then((res) => {
      setNotifications(res.payload.data);
    });
    setLanguage(lng);
  }, [lng]);

  const toggleLoginButton = () => {
    if (token) {
      return (
        <>
          <Nav.Link
            className="ml-3 leading-none text-black text-lg"
            href="/profile"
          >
            {t("profile")}
            {/* <img className="w-10 h-10 p-0 rounded-full" src={userData?.image?.url || profile_pic}  alt="pp"/> */}
          </Nav.Link>
          <Button
            className="leading-none"
            variant="warning"
            href="/login"
            style={{
              margin: 0,
              padding: 0,
              color: "black",
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "28px",
              width: "7rem",
              height: "2rem",
            }}
            onClick={() => {
              dispatch(logoutWeb());
              localStorage.removeItem("cart");
              localStorage.removeItem("user");
            }}
          >
            <span className="leading-none">{t("logout")}</span>{" "}
            {/* <FontAwesomeIcon icon={faRightFromBracket} /> */}
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
              fontSize: "18px",
              width: "7rem",
            }}
          >
            {t("sign_in")}
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

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    dispatch(markNotificationsAsRead()).then((res)=>{
    console.log(res);
    })
  };

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <Image
              className="mr-5"
              src={navbar_logo}
              style={{ width: " 65px", height: "65px" }}
              roundedCircle
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="w-full flex justify-around"
              style={{ color: "black", fontWeight: "bolder", fontSize: "14px" }}
            >
              <Nav.Link
                className="mr-3 leading-none text-black text-lg"
                href="/"
              >
                {t("home")}
              </Nav.Link>
              <Nav.Link
                className="mr-3 leading-none text-black text-lg"
                href="/restaurants"
              >
                {t("restaurants")}
              </Nav.Link>
              <Nav.Link
                className="mr-3 leading-none text-black text-lg"
                href="/shops"
              >
                {t("shops")}
              </Nav.Link>
              <Nav.Link
                className="mr-3 leading-none text-black text-lg"
                href="/services"
              >
                {t("services")}
              </Nav.Link>
              <NavDropdown
                className="leading-none text-black text-lg"
                title={t("join_us")}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  className="font-medium leading-none"
                  href="partnerwithus"
                >
                  {t("partner_with_us")}
                </NavDropdown.Item>
                <hr />
                <NavDropdown.Item
                  className="font-medium leading-none"
                  href="ridewithus"
                >
                  {t("ride_with_us")}
                </NavDropdown.Item>
              </NavDropdown>
              <Button
                className="leading-none font-bold text-lg"
                variant=""
                onClick={() => {
                  if (language === "en") {
                    i18n.changeLanguage("ar");
                    cookies.set("i18next", "ar");
                  } else {
                    i18n.changeLanguage("en");
                    cookies.set("i18next", "en");
                  }
                }}
              >
                {language === "en" ? "العربية" : "English"}
              </Button>
              {toggleLoginButton()}
              <Nav.Link
                className="ml-2 leading-none pl-0"
                onClick={handleCartClick}
              >
                <div className="flex justify-center">
                  <FaShoppingCart />
                  <div>({cartItems.length})</div>
                </div>
              </Nav.Link>
              {token ? (
                <>
                  <Nav.Link
                    className="px-0"
                    onClick={handleNotificationsClick}
                  >
                    <div className="relative">
                      <FaBell />
                      {notifications?.length > 0 && (
                        <div className="absolute top-0 right-0 bg-[#f00] text-white rounded-full w-4 h-4">
                          
                        </div>
                      )}
                    </div>
                  </Nav.Link>
                  {showNotifications && (
                    <div
                      className={`absolute mt-10 w-64 bg-white border border-gray-200 rounded-lg shadow-lg ${
                        lng === "en" ? "right-0" : "left-0"
                      }`}
                    >
                      <div className="p-4">
                        {notifications.map((notification, index) => {
                          return (
                            <div key={index} className="mb-2">
                              <div className="font-bold">
                                {notification?.data?.title}
                              </div>
                              <div>{notification?.data?.body}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </>
  );
}

export default MainNavbar;
