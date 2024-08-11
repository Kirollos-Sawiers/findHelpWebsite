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
function MainAccountSitting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
          >
            <Tab className="mt-20" eventKey="accountInfo" title="Account Info">
              <Row className="mx-5">
                <form
                  className="flex flex-col items-center w-full "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p
                    className="w-full mt-1 mb-0 ml-3 font-semibold"
                    style={{ textAlign: "left" }}
                  >
                    Email
                  </p>
                  <input
                    className=" w-full md:w-2/3 lg:w-2/3 h-10 pl-2 mt-3 border-2 rounded-xl small mb-3"
                    placeholder="AlySameh@gmail.com"
                    value="AlySameh@gmail.com"
                    disabled
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                  />

                  {errors.email && (
                    <p
                      className="w-full mt-1 mb-0 ml-3 small"
                      style={{ textAlign: "left", color: "red" }}
                    >
                      Enter a valid email
                    </p>
                  )}

                  {/* Full Name */}
                  <p
                    className="w-full mt-1 mb-0 ml-3 font-semibold"
                    style={{ textAlign: "left" }}
                  >
                    Full Name
                  </p>
                  <input
                    className=" w-full md:w-2/3 lg:w-2/3 h-10 pl-2 mt-3 border-2 rounded-xl small mb-3"
                    placeholder="Full Name"
                    value="Aly Sameh"
                    disabled
                    {...register("name", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                  />

                  {errors.name && (
                    <p
                      className="w-full mt-1 mb-0 ml-3 small"
                      style={{ textAlign: "left", color: "red" }}
                    >
                      Enter a full name
                    </p>
                  )}

                  {/* Date Of Birth */}
                  <p
                    className="w-full mt-1 mb-0 ml-3 font-semibold"
                    style={{ textAlign: "left" }}
                  >
                    Date Of Birth
                  </p>
                  <input
                    className=" w-full md:w-2/3 lg:w-2/3 h-10 pl-2 mt-3 border-2 rounded-xl small mb-3"
                    placeholder="Date of Birth"
                    value="12-12-2000"
                    disabled
                    {...register("name", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                  />

                  {errors.name && (
                    <p
                      className="w-full mt-1 mb-0 ml-3 small"
                      style={{ textAlign: "left", color: "red" }}
                    >
                      Enter Your Date of Birth
                    </p>
                  )}
                </form>
                <div className="w-full h-12 mt-2 shadow-lg rounded-lg flex items-center ">
                  <p className="m-0">Change Email</p>
                </div>
                <div className="w-full h-12 mt-4 shadow-lg rounded-lg flex items-center ">
                  <p className="m-0">Change Password</p>
                </div>
              </Row>
            </Tab>
            <Tab eventKey="savedAddresses" title="Saved Addresses">
              <Container>
                <Row className="">
                  <div className="mt-5">
                    <p className="font-bold">Add New Location</p>
                  </div>
                  <div className="flex flex-row justify-between p-4 shadow-xl rounded-lg mb-3">
                    <div className="flex flex-row justify-center items-center">
                      <div>
                        <img className="mr-4" src={address_pin} alt="address" />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold mb-2">Home</p>
                        <p className="mb-0">836 Anderson Plains</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-[#f0a835] mb-0 mr-5">Edit</p>
                      <p className="text-sm mb-0 ">Delete</p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between p-4 shadow-xl rounded-lg mb-3">
                    <div className="flex flex-row justify-center items-center">
                      <div>
                        <img className="mr-4" src={address_pin} alt="address" />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold mb-2">Office</p>
                        <p className="mb-0">0332 Hoeger Gardens</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-[#f0a835] mb-0 mr-5">Edit</p>
                      <p className="text-sm mb-0 ">Delete</p>
                    </div>
                  </div>
                </Row>
              </Container>
            </Tab>
            <Tab eventKey="savedCards" title="Saved Cards">
              <Container>
                <Row className="mt-5">
                  <div className="flex flex-col px-5">
                    {/* Card Section */}
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
            </Tab>
            <Tab eventKey="orderHistory" title="Order History">
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
            </Tab>
          </Tabs>
        </div>
        <Footer />
      </Container>
    </>
  );
}

export default MainAccountSitting;
