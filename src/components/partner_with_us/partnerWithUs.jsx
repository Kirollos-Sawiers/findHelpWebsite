import React, { useRef } from "react";
import Navbar from "../Navbar";
import Container from "react-bootstrap/Container";
import partner_cover from "../../assets/partner_cover.png";
import partnerWithUs from "../../assets/partnerWithUs.jpeg";
import partner_1 from "../../assets/partner_1.jpeg";
import partner_2 from "../../assets/partner_2.jpeg";
import partner_3 from "../../assets/partner_3.jpeg";
import partner_4 from "../../assets/partner_4.jpeg";
import partner_5 from "../../assets/partner_5.jpeg";
import partner_6 from "../../assets/partner_6.jpeg";
import emailjs from "emailjs-com";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useForm } from "react-hook-form";
import Footer from "./../footer/footer";



function PartnerWithUs() {
  const imgsArray = [
    partner_1,
    partner_6,
    partner_2,
    partner_3,
    partner_4,
    partner_5,
  ];

  // Create a ref for the "Get in touch" section
  const getInTouchRef = useRef(null);

  const scrollToGetInTouch = () => {
    if (getInTouchRef.current) {
      getInTouchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    const messageContent = `
      Name: ${data.name}
      Email: ${data.email}
      Phone Number: ${data.phoneNumber}
      
      Message:
      ${data.message}
    `;

    const emailData = {
      ...data,
      message: messageContent,
    };

    emailjs
      .send("service_e5r4olu", "template_ff4977o", emailData, "acBxIao33gpDuP_3_")
      .then(
        (response) => {
          // console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          // console.log("FAILED...", err);
        }
      );
  };

  const Card = () => {
    return (
      <>
        <div className="flex justify-center flex-wrap">
          {imgsArray.map((imageName, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center m-3 w-[25rem] shadow-xl"
              >
                <Image className="w-[25rem] h-auto rounded-lg" src={imageName} />
                {/* <div className="flex flex-col items-center my-3 p-3">
                  <p className="font-bold">Grow your business</p>
                  <p>
                    Reach new customers and increase your sales with no
                    upfront fees.
                  </p>
                </div> */}
              </div>
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
            className="w-[100%] h-fit shadow-lg"
            src={partnerWithUs}
            alt="partner with us cover"
            onClick={scrollToGetInTouch} // Add onClick to scroll to "Get in touch"
            style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickability
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
        {/* The "Get in touch" section */}
        <div className="flex flex-col justify-center items-center my-5" ref={getInTouchRef}>
          <p className="text-7xl font-semibold">
            Get in <span className="text-[#f0a835]">touch</span>
          </p>
        </div>
        <div>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="block w-1/3 h-10 pl-2 mt-3 border-2 rounded-xl small"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p
                className="w-full mt-1 mb-0 ml-3 small"
                style={{ textAlign: "left", color: "red" }}
              >
                Name is required
              </p>
            )}

            <input
              className="block w-1/3 h-10 pl-2 mt-3 border-2 rounded-xl small"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email && (
              <p
                className="w-full mt-1 mb-0 ml-3 small"
                style={{ textAlign: "left", color: "red" }}
              >
                Valid email is required
              </p>
            )}

            <input
              type="number"
              className="block w-1/3 h-10 pl-2 mt-3 border-2 rounded-xl small"
              placeholder="Phone Number"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <p
                className="w-full mt-1 mb-0 ml-3 small"
                style={{ textAlign: "left", color: "red" }}
              >
                Phone number is required
              </p>
            )}

            <input
              type="text"
              className="block w-1/3 h-10 pl-2 mt-3 border-2 rounded-xl small"
              placeholder="Message"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <p
                className="w-full ml-3 mt-1 mb-0 small"
                style={{ textAlign: "left", color: "red" }}
              >
                Message is required
              </p>
            )}

            <Button
              className="block w-1/3 h-10 pl-2 mt-3 border-2 rounded-xl small text-center"
              variant="warning"
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "15px",
              }}
              type="submit"
            >
              SUBMIT
            </Button>
          </form>
        </div>
        {/* <div className="flex flex-col justify-center items-center my-5">
          <p className="text-7xl font-bold">FAQ</p>
          <div className="w-2/3">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Question #1</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Question #2</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div> */}
      </Container>
      <Footer />
    </Container>
  );
}

export default PartnerWithUs;
