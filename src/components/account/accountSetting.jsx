import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Image from "react-bootstrap/Image";
import address_pin from "../../assets/address_pin.png";
import rest_logo from "../../assets/rest_logo.png";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import Footer from "./../footer/footer";
import { faCircleCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import profile_pic from "../../assets/profile_pic.png";
import { Link } from "react-router-dom";
import {
  updateUserData,
  getUserSavedAddresses,
  deleteUserAddress,
  addUserAddress,
} from "../../features/auth/authSlice";
import {
  getAllCountries,
  getAllCities,
  getAllAreas,
} from "../../features/location/locationAPI";
import { useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import GoogleMapComponent from "../../features/googelMap/map";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

function MainAccountSitting() {
  const { t } = useTranslation();
  const userData = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [activeTab, setActiveTab] = useState("accountInfo");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [location, setLocation] = useState(null);
  const lng = cookies.get("i18next") || "en";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, GIF)");
        return;
      }
      setProfileImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (activeTab === "savedAddresses") {
      dispatch(getUserSavedAddresses()).then((res) => {
        setSavedAddresses(res.payload);
        setLocation();
      });
    }
  }, [activeTab, dispatch]);

  const handleLocationUpdate = (newLocation) => {
    localStorage.setItem("location", JSON.stringify(newLocation));
    setLocation(newLocation);
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteUserAddress(addressId)).then(() => {
      dispatch(getUserSavedAddresses()).then((res) => {
        setSavedAddresses(res.payload);
      });
    });
  };

  const handleAddAddress = (data) => {
    const newLocation = localStorage.getItem("location");
    setLocation(JSON.parse(newLocation));
    if (location) {
      console.log(location);
      const addressData = {
        name: data.name,
        phone: userData.phone,
        phone_country: userData.phone_country,
        country_id: selectedCountry,
        city_id: selectedCity,
        area_id: data.area,
        details: location.address,
        lat: location.lat,
        lng: location.lng,
        postal_code: data.postalCode,
      };
      console.log(addressData);

      dispatch(addUserAddress(addressData)).then(() => {
        dispatch(getUserSavedAddresses()).then((res) => {
          setSavedAddresses(res.payload);
        });
        setShowModal(false);
      });
    }
  };

  useEffect(() => {
    if (showModal) {
      dispatch(getAllCountries()).then((data) => {
        setCountries(data.payload.data);
      });
    }
  }, [showModal]);

  useEffect(() => {
    if (selectedCountry) {
      dispatch(getAllCities(selectedCountry)).then((data) => {
        setCities(data.payload.data);
        console.log(data.payload);
      });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity) {
      dispatch(getAllAreas(selectedCity)).then((data) => {
        setAreas(data.payload.data);
      });
    }
  }, [selectedCity]);

  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append("name", document.querySelector('input[name="name"]').value);
    formData.append("email", userData.email);
    formData.append("phoneNumber", userData.phone || "");
    formData.append("phone_country", userData.phone_country);
    if (profileImage) {
      const imageFile = document.getElementById("profileImageInput").files[0];
      formData.append("image", imageFile);
    }
    setLoading(true);
    dispatch(updateUserData(formData)).then((res) => {
      setLoading(false);
      if (res.payload) {
        localStorage.setItem("user", JSON.stringify(res.payload.user));
        // window.location.reload();
      } else {
        // Handle error case
      }
    });
  };

  // Helper function to get the correct language property
  const getLangProperty = (obj, property) => {
    return obj?.[property]?.[lng] || obj?.[property]?.en || "";
  };

  return (
    <>
      <Container fluid className="p-0">
        <Navbar />
        <div className="my-5">
          <Tabs
            defaultActiveKey="accountInfo"
            id="justify-tab-example"
            className="mb-3"
            justify
            onSelect={(k) => setActiveTab(k)}
          >
            <Tab className="mt-20" eventKey="accountInfo" title={t("account_info")}>
              <Row className="mx-5">
                <form className="w-full h-fit">
                  <p className="mt-1 mb-0 mx-3 font-semibold">{t("email")}</p>
                  <input
                    className="w-full md:w-2/3 lg:w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small mb-3"
                    placeholder="Enter your email address"
                    value={userData.email}
                    disabled
                    {...register("email", {
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                  />

                  {errors.email && (
                    <p
                      className="w-full mt-1 mb-0 mx-3 small"
                      style={{ textAlign: "left", color: "red" }}
                    >
                      {t("email_validation")}
                    </p>
                  )}
                  <p
                    className="w-full mt-1 mb-0 mx-3 font-semibold"
                  >
                    {t("mobile")}
                  </p>
                  <input
                    className="w-full md:w-2/3 lg:w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small mb-3"
                    placeholder="Enter Phone Number"
                    disabled
                    defaultValue={userData.phone || ""}
                    {...register("phoneNumber", {
                      pattern: /^[0-9]+$/,
                    })}
                  />

                  {errors.phoneNumber && (
                    <p
                      className="w-full mt-1 mb-0 mx-3 small"
                      style={{ textAlign: "left", color: "red" }}
                    >
                      {t("mobile_validation")}
                    </p>
                  )}
                  <p
                    className="w-full mt-1 mb-0 mx-3 font-semibold"
                  >
                  {t("full_name")}
                  </p>
                  <input
                    className="w-full md:w-2/3 lg:w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small mb-3"
                    placeholder="Enter Full Name"
                    defaultValue={userData.name}
                    {...register("name", {
                      required: true,
                      pattern: /^[a-zA-Z\s]+$/,
                    })}
                  />
                  {errors.name && (
                    <p
                      className="w-full mt-1 mb-0 mx-3 small"
                      style={{ textAlign: "left", color: "red" }}
                    >
                      {t("name_validation")}
                    </p>
                  )}
                  <div className="flex items-center">
                    <img
                      className="w-[8%] h-[8%] rounded-full"
                      src={userData?.image?.url || profile_pic}
                      alt="pp"
                    />
                    <p
                      className="w-full mt-1 mb-0 mx-3 font-semibold"
                    >
                      {t("profile_image")}
                    </p>
                  </div>
                  <div className="w-full md:w-2/3 lg:w-2/3 mt-3 ">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="profileImageInput"
                    />
                    <label
                      htmlFor="profileImageInput"
                      className="cursor-pointer bg-[#f0a835] text-white px-4 py-2 rounded-lg"
                    >
                      {t("add_main_image")}
                    </label>
                    {profileImage && (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="m-5 w-[40%] h-[40%] rounded-2xl"
                      />
                    )}
                  </div>

                  <Link to="/reset-password" style={{ textDecoration: "none" }}>
                    <div className="w-full h-12 mt-4 shadow-lg rounded-lg flex items-center mb-5">
                      <p className="m-0 px-3 text-[#f0a835] font-semibold">
                       {t("change_password")}
                      </p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    className="w-full md:w-2/3 lg:w-2/3 h-12 bg-[#f0a835] rounded-lg font-bold text-xl my-3 text-white"
                    onClick={handleSaveChanges}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                     <>
                      {t("save")}
                     </>
                    )}
                  </button>
                </form>
              </Row>
            </Tab>
            <Tab eventKey="savedAddresses" title={t("saved_address")}>
              <Container>
                <Row className="">
                  {savedAddresses ? (
                    <>
                      {savedAddresses.map((address, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row justify-between p-4 shadow-xl rounded-lg my-3"
                          >
                            <div className="flex flex-row justify-center items-center">
                              <div>
                                <img
                                  className="mr-4"
                                  src={address_pin}
                                  alt="address"
                                />
                              </div>
                              <div className="flex flex-col">
                                <p className="font-bold mb-2">
                                  {address?.name}
                                </p>
                                <p className="mb-0">{address.details}</p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <p
                                className="font-medium mb-0 text-[#ff2424] cursor-pointer"
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                Delete
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex justify-center mt-5">
                        <button
                          className="w-1/2 md:w-2/3 lg:w-2/3 h-12 bg-[#f0a835] rounded-lg font-bold text-xl my-3 text-white"
                          onClick={() => setShowModal(true)}
                        >
                          {t("add_new_address")}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-screen flex justify-center items-center">
                        <Spinner animation="border" size="lg" />
                      </div>
                    </>
                  )}
                </Row>
              </Container>
            </Tab>
            {/* <Tab eventKey="savedCards" title="Saved Cards">
              <Container>
                <Row className="mt-5">
                  <div className="flex flex-col px-5">
                    <div className="flex flex-row justify-between p-4 shadow-xl rounded-lg mb-3">
                      <div className="flex flex-row justify-center items-center">
                        <div>
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            style={{ color: "#f0a835" }}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="font-bold mb-0">XXXX-9258</p>
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
                            icon={faCircle}
                            style={{ color: "#f0a835" }}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="font-bold mb-0">XXXX-9015</p>
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
                        <div className="ml-3">
                          <p className="font-bold mb-0">Add New Card</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
              </Container>
            </Tab> */}

            {/* <Tab eventKey="orderHistory" title="Order History">
              <Container>
                <Row className="mt-5">
                  <div className="flex justify-between items-center rounded-lg shadow-lg mb-4">
                    <div className="flex">
                      <Image className="m-3" src={rest_logo} />
                      <div className="flex flex-col justify-center">
                        <p className="font-bold m-0">Pastaya</p>
                        <p className="m-0 small">OCT 15, 2024</p>
                        <p className="font-medium">4 items • EGP 1050</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-28 h-10 bg-[#f0a835] text-center content-center rounded-lg mb-0 font-bold border-2 border-[#f0a835] mr-3">
                        Re-order
                      </div>
                      <div className="w-28 h-10 text-center content-center rounded-lg mb-0 font-bold border-2 border-[#f0a835] text-[#f0a835]">
                        Rate Order
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center rounded-lg shadow-lg mb-4">
                    <div className="flex">
                      <Image className="m-3" src={rest_logo} />
                      <div className="flex flex-col justify-center">
                        <p className="font-bold m-0">Pastaya</p>
                        <p className="m-0 small">Mar 1, 2024</p>
                        <p className="font-medium">2 items • EGP 650</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-28 h-10 bg-[#f0a835] text-center content-center rounded-lg mb-0 font-bold border-2 border-[#f0a835] mr-3">
                        Re-order
                      </div>
                      <div className="w-28 h-10 text-center content-center rounded-lg mb-0 font-bold border-2 border-[#f0a835] text-[#f0a835]">
                        Rate Order
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center rounded-lg shadow-lg">
                    <div className="flex">
                      <Image className="m-3" src={rest_logo} />
                      <div className="flex flex-col justify-center">
                        <p className="font-bold m-0">Pastaya</p>
                        <p className="m-0 small">Jan 23, 2024</p>
                        <p className="font-medium">5 items • EGP 1840</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-28 h-10 bg-[#f0a835] text-center content-center rounded-lg mb-0 font-bold border-2 border-[#f0a835] mr-3">
                        Re-order
                      </div>
                      <div className="w-28 h-10 text-center content-center rounded-lg mb-0 font-bold border-2 border-[#f0a835] text-[#f0a835]">
                        Rate Order
                      </div>
                    </div>
                  </div>
                </Row>
              </Container>
            </Tab> */}
          </Tabs>
        </div>
        <Footer />
      </Container>

      {/* Add Address Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("add_new_address")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleAddAddress)}>
            <Form.Group controlId="name">
              <Form.Label>{t("name")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Form.Text className="text-danger">
                  {t("name_validation")}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>{t("country")}</Form.Label>
              <Form.Control
                as="select"
                {...register("country", { required: true })}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">{t("select_country")}</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {getLangProperty(country, "name")}
                  </option>
                ))}
              </Form.Control>
              {errors.country && (
                <Form.Text className="text-danger">
                  {t("field_required")}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>{t("city")}</Form.Label>
              <Form.Control
                as="select"
                {...register("city", { required: true })}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">{t("select_city")}</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {getLangProperty(city, "name")}
                  </option>
                ))}
              </Form.Control>
              {errors.city && (
                <Form.Text className="text-danger">
                  {t("field_required")}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="area">
              <Form.Label>{t("area")}</Form.Label>
              <Form.Control
                as="select"
                {...register("area", { required: true })}
              >
                <option value="">{t("select_area")}</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {getLangProperty(area, "name")}
                  </option>
                ))}
              </Form.Control>
              {errors.area && (
                <Form.Text className="text-danger">
                  {t("field_required")}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>{t("postal_code")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("enter_postal_code")}
                {...register("postalCode", { required: true })}
              />
              {errors.postalCode && (
                <Form.Text className="text-danger">
                  {t("field_required")}
                </Form.Text>
              )}
            </Form.Group>
            <div className="my-3">
              <GoogleMapComponent onLocationUpdate={handleLocationUpdate} />
            </div>
            <div className="flex justify-center my-2">
              <button
                className="w-1/2 md:w-2/3 lg:w-2/3 h-12 bg-[#f0a835] rounded-lg font-bold text-xl my-3 text-white"
                type="submit"
              >
                {t("add_address")}
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MainAccountSitting;
