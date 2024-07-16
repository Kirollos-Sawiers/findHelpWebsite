import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Image from "react-bootstrap/Image";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import restaurant_list_img from "../../assets/restaurant_list_img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { faStar as offStar } from "@fortawesome/free-regular-svg-icons";
function RestaurantsList() {
  const [layout, setLayout] = useState("grid");

  return (
    <>
      <Container fluid className="p-0">
        <Navbar />
        <Container>
          <Row>
            <Col xs={12} md={3} lg={3}>
              <p className="text-xl text-zinc-500 mb-2">Show results for:</p>
              <div className="flex flex-wrap flex-row justify-content-start gap-3 md:block lg:block">
                <div className="flex align-items-center">
                  <Form.Check
                    invalid
                    inline
                    label="Open now"
                    name="group1"
                    type="checkbox"
                  />
                </div>
                <div className="flex align-items-center">
                  <Form.Check
                    inline
                    label="Promo"
                    name="group1"
                    type="checkbox"
                  />
                </div>
              </div>
              <p className="text-xl text-zinc-500 mb-2 mt-3">Sort by:</p>
              <div className="flex flex-wrap flex-row justify-content-start gap-3 md:block lg:block">
                <div className="flex align-items-center">
                  <Form.Check
                    inline
                    label="Popular"
                    name="group2"
                    type="checkbox"
                  />
                </div>
                <div className="flex align-items-center">
                  <Form.Check
                    inline
                    label="Rating"
                    name="group2"
                    type="checkbox"
                  />
                </div>
                <div className="flex align-items-center">
                  <Form.Check
                    inline
                    label="Delivery Time"
                    name="group2"
                    type="checkbox"
                  />
                </div>
              </div>
            </Col>
            <Col xs={12} md={9} lg={9}>
              <div>
                <InputText
                  placeholder="Search"
                  type="text"
                  className="w-1/2 p-2 mb-5"
                />
              </div>
              <div className="flex flex-wrap justify-around">
                <div className="rounded-2xl mb-3">
                  <Image className="rounded-t-lg" src={restaurant_list_img} />
                  <div className="flex justify-between">
                    <div className="ml-2">
                      <p className="font-bold my-1">Sultan Ayup</p>
                      <p className="small mb-0">Turkish</p>
                    </div>
                    <div className="m-2.5">
                      <Rating
                        value={3}
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
                  </div>
                  <div className="flex p-2.5 bg-[#F0A8351A] rounded-full m-1">
                    <FontAwesomeIcon
                    className="mt-1 ml-3"
                      icon={faPercent}
                      style={{ color: "#f0a835" }}
                    />
                    <p className="text-[#f0a835] text-sm ml-1 mb-0">
                      50EGP on orders above 120 EGP
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl mb-3">
                  <Image className="rounded-t-lg" src={restaurant_list_img} />
                  <div className="flex justify-between">
                    <div className="ml-2">
                      <p className="font-bold my-1">Sultan Ayup</p>
                      <p className="small mb-0">Turkish</p>
                    </div>
                    <div className="m-2.5">
                      <Rating
                        value={3}
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
                  </div>
                  <div className="flex p-2.5 bg-[#F0A8351A] rounded-full m-1">
                    <FontAwesomeIcon
                    className="mt-1 ml-3"
                      icon={faPercent}
                      style={{ color: "#f0a835" }}
                    />
                    <p className="text-[#f0a835] text-sm ml-1 mb-0">
                      50EGP on orders above 120 EGP
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl mb-3">
                  <Image className="rounded-t-lg" src={restaurant_list_img} />
                  <div className="flex justify-between">
                    <div className="ml-2">
                      <p className="font-bold my-1">Sultan Ayup</p>
                      <p className="small mb-0">Turkish</p>
                    </div>
                    <div className="m-2.5">
                      <Rating
                        value={3}
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
                  </div>
                  <div className="flex p-2.5 bg-[#F0A8351A] rounded-full m-1">
                    <FontAwesomeIcon
                    className="mt-1 ml-3"
                      icon={faPercent}
                      style={{ color: "#f0a835" }}
                    />
                    <p className="text-[#f0a835] text-sm ml-1 mb-0">
                      50EGP on orders above 120 EGP
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl mb-3">
                  <Image className="rounded-t-lg" src={restaurant_list_img} />
                  <div className="flex justify-between">
                    <div className="ml-2">
                      <p className="font-bold my-1">Sultan Ayup</p>
                      <p className="small mb-0">Turkish</p>
                    </div>
                    <div className="m-2.5">
                      <Rating
                        value={3}
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
                  </div>
                  <div className="flex p-2.5 bg-[#F0A8351A] rounded-full m-1">
                    <FontAwesomeIcon
                    className="mt-1 ml-3"
                      icon={faPercent}
                      style={{ color: "#f0a835" }}
                    />
                    <p className="text-[#f0a835] text-sm ml-1 mb-0">
                      50EGP on orders above 120 EGP
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl mb-3">
                  <Image className="rounded-t-lg" src={restaurant_list_img} />
                  <div className="flex justify-between">
                    <div className="ml-2">
                      <p className="font-bold my-1">Sultan Ayup</p>
                      <p className="small mb-0">Turkish</p>
                    </div>
                    <div className="m-2.5">
                      <Rating
                        value={3}
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
                  </div>
                  <div className="flex p-2.5 bg-[#F0A8351A] rounded-full m-1">
                    <FontAwesomeIcon
                    className="mt-1 ml-3"
                      icon={faPercent}
                      style={{ color: "#f0a835" }}
                    />
                    <p className="text-[#f0a835] text-sm ml-1 mb-0">
                      50EGP on orders above 120 EGP
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl mb-3">
                  <Image className="rounded-t-lg" src={restaurant_list_img} />
                  <div className="flex justify-between">
                    <div className="ml-2">
                      <p className="font-bold my-1">Sultan Ayup</p>
                      <p className="small mb-0">Turkish</p>
                    </div>
                    <div className="m-2.5">
                      <Rating
                        value={3}
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
                  </div>
                  <div className="flex p-2.5 bg-[#F0A8351A] rounded-full m-1">
                    <FontAwesomeIcon
                    className="mt-1 ml-3"
                      icon={faPercent}
                      style={{ color: "#f0a835" }}
                    />
                    <p className="text-[#f0a835] text-sm ml-1 mb-0">
                      50EGP on orders above 120 EGP
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default RestaurantsList;
