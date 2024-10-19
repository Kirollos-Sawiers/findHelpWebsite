import React, { useState } from "react";
import Navbar from "../Navbar";
import Container from "react-bootstrap/Container";
import ride_cover from "../../assets/ride_cover.png";
import partner_card_1 from "../../assets/partner_card_1.png";
import partner_card_2 from "../../assets/partner_card_2.png";
import partner_card_3 from "../../assets/partner_card_3.png";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import login_img from "../../assets/login_img.png";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Footer from "./../footer/footer";
import {
  faGoogle,
  faFacebook,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
function RideWithUs() {
  const imgsArray = [
    partner_card_1,
    partner_card_2,
    partner_card_3,
    partner_card_1,
    partner_card_2,
    partner_card_3,
  ];
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const Card = () => {
    return (
      <>
        <div className="flex justify-center flex-wrap">
          {imgsArray.map((imageName) => {
            return (
              <>
                <div className="flex flex-col items-center m-3 w-[25rem] shadow-xl rounded-lg">
                  <Image className="w-[25rem] h-auto" src={imageName} />
                  <div className="flex flex-col items-center my-3 p-3">
                    <p className="font-bold">Forem ipsum</p>
                    <p>
                    Morem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <Container fluid className="p-0">
      <Navbar />
      <Container fluid className="p-0 mb-5">
        <div>
          <Image
            className="w-full h-auto"
            src={ride_cover}
            alt="partner with us cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center my-5">
          <p className="text-3xl font-bold">Why partner with Find Help?</p>
          <p className=" font-semibold">
            We believe in the power of choice. That’s why we offer a range of
            products, services, and delivery options to help you grow your
            business on your terms.
          </p>
        </div>
        <div>
          <Card />
        </div>
        <div className="flex flex-col justify-center items-center my-5">
          <p className="text-7xl font-bold">FAQ</p>
          <div className="w-2/3">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Question #1</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Question #2</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Question #3</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Question #4</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </div>
        </div>
      </Container>
      <Footer />
    </Container>
  );
}

export default RideWithUs;
