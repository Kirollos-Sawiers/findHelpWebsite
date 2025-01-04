import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar";
import Image from "react-bootstrap/Image";
import navbar_logo from "../../assets/navbar_logo.png";
import master_card from "../../assets/master_card.png";
import visa from "../../assets/visa.png";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as offStar,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Rating } from "primereact/rating";
import Footer from "./../footer/footer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import {
  getShopData,
  getAllRestaurantProductsData,
  getProductDetails,
} from "./../../features/restaurants/restaurantsAPI";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
function MainProducts() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("All");
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [sizePrice, setSizePrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [optionName, setOptionName] = useState();
  const [optionId, setOptionId] = useState([]);
  const [optionPrice, setOptionPrice] = useState();
  const [serverCart, setServerCart] = useState([]);
  const [firstProductOptionId, setFirstProductOptionId] = useState();
  const toast = useRef(null);
  const params = useParams();
  const dispatch = useDispatch();
  const allRestaurantProducts = useSelector(
    (state) => state.restaurantsData.products
  );
  const shopData = useSelector((state) => state.restaurantsData.shopData);
  const productDetailsData = useSelector(
    (state) => state.restaurantsData.productDetails
  );
  const loading = useSelector((state) => state.restaurantsData.loading);
  const error = useSelector((state) => state.restaurantsData.error);
  const lng = cookies.get("i18next") || "en";

  const openShopOnGoogleMap = (mapData) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${mapData?.lat},${mapData?.lng}`;
    window.open(url, "_blank");
  };

  const confirm = () => {
    confirmDialog({
      group: "headless",
      message: t('confirmDialog.message'), // Translation for message
      header: t('confirmDialog.header'), // Translation for header
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptLabel: t('confirmDialog.accept'), // Translation for accept button
      rejectLabel: t('confirmDialog.reject'), // Translation for reject button
    });
  };

  const handleClose = () => {
    setShow(false);
    setQuantity(1);
    setSizePrice(0);
  };
  const handleShow = () => setShow(true);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    dispatch(getAllRestaurantProductsData({ shop_id: params.id }));
    dispatch(getShopData({ shop_id: params.id }));
  }, [params.id, dispatch]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const addToCart = (sealedProduct) => {
    const product = { ...sealedProduct };
    product.userQuantity = quantity;
    product.userOption = optionName;
    product.userOptionId = optionId;
    product.userOptionPrice = sizePrice;
    product.userAddressId = 589;
    // Retrieve the cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    // Check if the cart exists and is not null
    if (savedCart) {
      // Check if the shop_id matches
      console.log(product.shop_id);
      console.log(savedCart[0].shop_id);

      if (product.shop_id === savedCart[0].shop_id) {
        const existingProduct = cart.find((item) => item.id === product.id);
        let updatedCart;
        if (existingProduct) {
          updatedCart = cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                }
              : item
          );
        } else {
          updatedCart = [...cart, { ...product }];
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        confirm();
      }
    } else {
      // Initialize the cart with the first product
      const newCart = [{ ...product }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const menuCard = () => {
    return (
      <>
        {loading ? (
          <div className="flex justify-center align-middle items-center h-screen w-full">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap w-[95%] h-fit">
              {allRestaurantProducts?.data?.map((product, index) => {
                return (
                  <div
                    key={index}
                    id={product.id}
                    className="bg-white rounded-lg shadow-xl p-4 flex items-center m-3 w-96 cursor-pointer"
                    onClick={() => {
                      handleShow();
                      dispatch(
                        getProductDetails({
                          shop_id: product.shop_id,
                          category_id: product.category_id,
                          product_id: product.id,
                        })
                      );
                    }}
                  >
                    <img
                      src={product?.image?.url}
                      alt="product_image"
                      className="rounded-full w-20 h-20 object-cover"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold">
                        {getLangProperty(product, "name")}
                      </h3>
                      <p className="text-zinc-500 text-sm font-medium px-2">
                        {getLangProperty(product.category, "name")}
                      </p>
                      {product?.selling_price === 0 ? (
                        <span className="text-[#f0a835] font-semibold mt-3 text-lg ">
                          {t("price_selection")}
                        </span>
                      ) : (
                        <div>
                          {lng == "en" ? (
                            <>
                              <span className="text-[#f0a835] font-bold mt-3 text-xl">
                                {product?.selling_price}.00
                              </span>
                              <span className="text-[#f0a835] font-semibold mt-3 text-lg px-2">
                                {t("egp")}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-[#f0a835] font-bold mt-3 text-xl">
                                {product?.selling_price}.00
                              </span>
                              <span className="text-[#f0a835] font-semibold mt-3 text-lg px-2">
                                {t("egp")}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </>
    );
  };

  const sideBar = () => {
    return (
      <>
        {loading ? (
          <div className="flex justify-center align-middle items-center h-96 w-full">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg p-4 w-48 flex flex-col items-center mt-5">
              <button
                onClick={() => {
                  handleTabClick("All");
                  dispatch(
                    getAllRestaurantProductsData({
                      shop_id: params.id,
                    })
                  );
                }}
                className={`text-lg font-medium py-2 rounded-lg w-40 m-1 ${
                  activeTab === "All" ? "bg-[#f0a835] text-white" : "text-black"
                }`}
              >
                {t("all")}
              </button>
              {shopData?.categories?.map((cate, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center "
                  >
                    <button
                      key={getLangProperty(cate, "name")}
                      onClick={() => {
                        handleTabClick(getLangProperty(cate, "name"));
                        dispatch(
                          getAllRestaurantProductsData({
                            shop_id: params.id,
                            category_id: cate.id,
                          })
                        );
                      }}
                      className={`text-lg font-medium py-2 rounded-lg w-40 m-1 ${
                        activeTab === getLangProperty(cate, "name")
                          ? "bg-[#f0a835] text-white"
                          : "text-black"
                      }`}
                    >
                      {getLangProperty(cate, "name")}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </>
    );
  };

  const handleCheckboxChange = (event, id, option) => {
    setOptionName(option);
    optionId.push(id);
    setOptionPrice();
    const { value, checked } = event.target;
    setSizePrice(checked ? value : null);
  };

  const productDetails = () => {
    return (
      <>
        {productDetailsData && productDetailsData.data ? (
          <>
            {productDetailsData.data.map((product, index) => {
              return (
                <>
                  <div key={index} className="bg-white rounded-lg pl-3 w-80">
                    {/* Header */}
                    <div className="flex justify-around items-center mb-4">
                      <img
                        src={product.images[0].url}
                        alt="product_image"
                        className="rounded-xl w-20 h-20 object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-bold">
                          {getLangProperty(product, "name")}
                        </h3>
                      </div>
                    </div>

                    {/* Ingredients */}
                    <div className="mb-4">
                      <p className="font-semibold mb-1">{t("Ingredients")}</p>
                      <div className="grid grid-cols-5 gap-3 p-2 mb-4">
                        <div className="text-[#f0a835] ">
                          {getLangProperty(product, "description")}
                        </div>
                      </div>
                    </div>

                    {/* Additional Options */}
                    {product.options.length > 0
                      ? product.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="mb-4">
                            <div className="font-semibold mb-2 font-xl">
                              {getLangProperty(option, "name")}
                            </div>
                            {option.additions.map((addition, additionIndex) => (
                              <div
                                key={additionIndex}
                                className="flex justify-between items-center mb-2"
                              >
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="mr-2"
                                    style={{ accentColor: "#f0a835" }}
                                    value={addition.price}
                                    checked={
                                      addition.price === Number(sizePrice)
                                    }
                                    onChange={(e) => {
                                      handleCheckboxChange(
                                        e,
                                        addition.id,
                                        getLangProperty(addition, "name")
                                      );
                                    }}
                                  />
                                  <span>
                                    {getLangProperty(addition, "name")}
                                  </span>
                                </div>
                                <div className="text-[#f0a835] font-bold">
                                  {addition.price} {t("egp")}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      : null}

                    {/* Additional Item */}
                    <div className="flex items-center mb-4">
                      <div className="ml-4 flex-grow">
                        <div className="text-[#f0a835] font-bold">
                          {product?.selling_price === 0
                            ? sizePrice
                            : product?.selling_price}
                          .00 {product.currency}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="p-1 rounded-full bg-[#f0a835]"
                        >
                          <FaMinus className="text-white " />
                        </button>
                        <span className="px-1">{quantity}</span>
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
                        {t("total")}:{t("egp")}
                        {(
                          quantity *
                          (product?.selling_price === 0
                            ? sizePrice
                            : product?.selling_price)
                        ).toFixed(2)}
                      </div>
                      <button
                        className="bg-[#f0a835] text-white rounded-lg px-4 py-2 ml-2 mt-3"
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        {t("add_to_cart")}
                      </button>
                    </div>
                    {JSON.parse(localStorage.getItem("cart")) ? (
                      <Link
                        to="/checkout"
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        <button className="bg-[#f0a835] text-white rounded-lg w-[100%] px-2 py-2 ml-2 mt-3">
                          {t("checkout")}
                       ({JSON.parse(localStorage.getItem("cart")).length})
                        </button>
                      </Link>
                    ) : null}
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <>
            <div className="flex justify-center align-middle items-center h-96">
              <Spinner animation="border" variant="warning" />
            </div>
          </>
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center align-middle items-center h-96">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Helper function to get the correct language property
  const getLangProperty = (obj, property) => {
    return obj?.[property]?.[lng] || obj?.[property]?.en || "";
  };

  return (
    <>
      <ConfirmDialog
        group="headless"
        content={({ headerRef, contentRef, footerRef, hide, message }) => (
          <div className="flex flex-column align-items-center p-5 shadow-md rounded-lg bg-white">
            <div className="border-circle bg-blue-400 inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
              <img src={navbar_logo} alt="Logo_img" />
            </div>
            <span
              className="font-bold text-2xl block mb-2 mt-4"
              ref={headerRef}
            >
              {message.header}
            </span>
            <p className="mb-0" ref={contentRef}>
              {message.message}
            </p>
            <div
              className="flex justify-center items-center gap-2 mt-4 w-full"
              ref={footerRef}
            >
              <Button
                label={t('confirmDialog.accept')}
                onClick={(event) => {
                  hide(event);
                  localStorage.removeItem("cart");
                  setCart([]);
                }}
                className="w-[20%] bg-[#f0a835] text-white rounded-lg p-2"
              ></Button>
              <Button
                label={t('confirmDialog.reject')}
                onClick={(event) => {
                  hide(event);
                }}
                className="w-[10%]"
              ></Button>
            </div>
          </div>
        )}
      />
      {allRestaurantProducts.data && shopData ? (
        <>
          <Container fluid className="p-0">
            <Navbar />
            <Container fluid className="flex justify-center pb-10">
              {/* <div>
              <Image className="" src={products_banner} />
            </div> */}
            </Container>
            <div className="flex">
              <div>
                <Image
                  className="w-20 h-20 mx-3 rounded-md"
                  src={shopData?.image?.url}
                />
              </div>
              <div>
                <p className="text-2xl font-semibold p-0 m-0">
                  {getLangProperty(
                    allRestaurantProducts?.data[0]?.shop,
                    "name"
                  )}
                </p>
                <p className="small text-zinc-500 ">
                  {getLangProperty(
                    allRestaurantProducts?.data[0]?.shop?.address,
                    "details"
                  )}
                </p>
                <button
                  className="w-[70%] bg-[#f0a835] text-white rounded-lg p-2"
                  onClick={() =>
                    openShopOnGoogleMap(
                      shopData?.nearest_address?.location_google_maps
                    )
                  }
                >
                  {t("open_location")}
                </button>
              </div>
            </div>
            <div className="my-5">
              <Tabs
                defaultActiveKey="menu"
                id="justify-tab-example"
                className="mb-3"
                justify
              >
                <Tab className="" eventKey="menu" title={t("menu")}>
                  <Row>
                    <Col md={3} className="flex justify-center">
                      {sideBar()}
                    </Col>
                    <Col md={9}>
                      <div className="">{menuCard()}</div>
                      <Offcanvas
                        show={show}
                        onHide={handleClose}
                        placement="end"
                        name="end"
                      >
                        <Offcanvas.Header closeButton></Offcanvas.Header>
                        <Offcanvas.Body>
                          {productDetailsData ? (
                            <div>{productDetails()}</div>
                          ) : null}
                        </Offcanvas.Body>
                      </Offcanvas>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="reviews" title={t("review")}>
                  <Container>
                    <Row className="mt-20">
                      <Col md={2}></Col>
                      <Col>
                      {(shopData?.orders_reviews.length>0)? shopData?.orders_reviews?.map((review, index) => {
                          return (
                            <div key={index} className="m-5">
                              <p className="text-sm text-zinc-500">
                                {review.updated_at.slice(0, 10)}
                              </p>
                              <div>
                                <Rating
                                  value={review.rating}
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
                                <span className="font-bold">
                                  Anonymous member
                                </span>
                              </div>
                              <div>
                                <p>{review.review}</p>
                              </div>
                            </div>
                          );
                        }):<><p className="w-full h-screen font-bold text-3xl flex justify-center items-center text-[#f0a853]">No Reviews Available</p></>}
                      
                      </Col>
                      <Col md={2}></Col>
                    </Row>
                  </Container>
                </Tab>
                <Tab eventKey="info" title={t("info")}>
                  <Container>
                    <Row className="mt-5">
                      <Col md={2}></Col>
                      <Col>
                      <div className="flex justify-between ">
                        <div className="flex justify-center w-1/2 h-auto">
                          <Image
                            className="rounded-lg"
                            src={shopData?.image?.url}
                          />
                        </div>
                        <div className="flex flex-col mt-3">
                          <div className="mt-2">
                            <p className="font-bold text-xl">
                              {t("location")} & {t("opening_hours")}
                            </p>
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
                              <p className="m-0 p-0">
                                {shopData?.address?.details}
                              </p>
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
                              <p className="m-0 p-0">
                                From {shopData?.work_times?.saturday}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="mt-5">
                            <p className="font-bold text-xl">
                              {t("service_fee")}
                            </p>
                            <div className="flex flex-row items-center">
                              <FontAwesomeIcon
                                className="mx-2"
                                icon={faMoneyCheckDollar}
                                style={{
                                  color: "grey",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                              <p className="m-0 p-0">5%</p>
                            </div>
                          </div>
                          <div className="mt-5">
                            <p className="font-bold text-xl">
                              {t("payment_methods")}
                            </p>
                            <div className="flex flex-row justify-between w-1/3">
                              <p className="leading-0 mt-3 px-2 py-1  font-bold border border-black rounded-md">
                                {t("cash")}
                              </p>
                              <Image src={visa} />
                              <Image src={master_card} />
                            </div>
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
      ) : (
        <div className="flex justify-center align-middle items-center h-96 w-full">
          <Spinner animation="border" variant="warning" />
        </div>
      )}
    </>
  );
}

export default MainProducts;
